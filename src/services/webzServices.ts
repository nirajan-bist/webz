// src/services/WebhoseService.ts

import axios from "axios";
import { WebhoseQueryBuilder } from "./WebhoseQueryBuilder";

import createLogger from "Utils/logger";
import { Post, savePosts } from "Models/webz";

const logger = createLogger("webz service");

interface WebhoseApiResponse {
  totalResults: number; // total posts matching the query
  moreResultsAvailable: number; // or boolean or numeric (depending on the API doc)
  posts: any[]; // the actual posts
}

/**
 * Fetches up to totalResults posts in batches of 200.
 * Saves to DB, and calls callback with the count and total remaining.
 *
 * @param callback a function receiving (savedCount, totalCountRemaining)
 */
export async function fetchAndSaveAll(
  query: string,
  callback: (savedCount: number, totalCountRemaining: number) => void
): Promise<void> {
  // Set up initial state
  let totalResults = 0;
  let savedCount = 0;
  let from = 0;
  const batchSize = 200;

  // Get token from environment
  const token = process.env.WEBHOSE_TOKEN || "";
  if (!token) {
    logger.error("No WEBHOSE_TOKEN found in environment variables.");
    return;
  }

  // Start iterative fetching
  while (true) {
    // Build the request URL using the builder
    const builder = new WebhoseQueryBuilder().setToken(token).setSize(batchSize).setFrom(from).setQuery(query); // for now, any query string

    const url = builder.buildUrl();
    logger.info(`Fetching from URL: ${url}`);

    let response: WebhoseApiResponse;
    try {
      const res = await axios.get<WebhoseApiResponse>(url);
      response = res.data;
    } catch (err) {
      logger.error(`Error fetching data: ${(err as Error).message}`);
      // Optionally decide if we want to retry or break
      break;
    }

    // On first response, capture totalResults
    if (totalResults === 0) {
      totalResults = response.totalResults;
    }

    // Transform raw posts to our Post model if needed
    const postsForDb: Post[] = response.posts.map((raw) => {
      return {
        threadId: raw.thread?.uuid || "",
        title: raw.title || "",
        url: raw.url || "",
        text: raw.text || "",
        published: raw.published || "",
      };
    });

    const inserted = await savePosts(postsForDb);
    savedCount += inserted;

    logger.info(`Saved ${inserted} posts. Total saved so far: ${savedCount}`);

    // Check if more results are available or if we've saved all
    // moreResultsAvailable often indicates how many more results can be fetched
    if (!response.moreResultsAvailable || response.moreResultsAvailable === 0) {
      logger.info("No more results are available from the API.");
      break;
    }

    if (savedCount >= totalResults) {
      logger.info("We have saved all available posts as indicated by totalResults.");
      break;
    }

    // Move the 'from' pointer by the batch size to get the next chunk
    from += batchSize;
  }

  // Callback
  const totalCountRemaining = Math.max(totalResults - savedCount, 0);
  callback(savedCount, totalCountRemaining);
}
