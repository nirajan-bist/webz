import axios from "axios";
import { fetchAndSaveAll } from "../src/services/webzServices";
import { savePosts } from "../src/models/webz";
import createLogger from "../src/utils/logger";

// Mock `axios` and `savePosts`
jest.mock("axios");
jest.mock("../src/models/webz", () => ({
  savePosts: jest.fn(),
}));
jest.mock("../src/utils/logger", () => {
  return jest.fn().mockImplementation(() => ({
    info: jest.fn(),
    error: jest.fn(),
  }));
});

describe("fetchAndSaveAll", () => {
  let callbackMock: jest.Mock;
  let loggerMock: any;

  beforeEach(() => {
    jest.clearAllMocks();
    callbackMock = jest.fn();
    loggerMock = createLogger("test-logger");

    // Set an environment token
    process.env.WEBHOSE_TOKEN = "test-token";
  });

  it("fetches data, saves posts, and calls callback correctly for single batch", async () => {
    // Arrange
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        totalResults: 3,
        moreResultsAvailable: 0,
        posts: [
          {
            thread: { uuid: "thread1" },
            title: "Post 1",
            url: "http://example.com/post1",
            text: "Sample text 1",
            published: "2023-01-01T12:00:00Z",
          },
          {
            thread: { uuid: "thread2" },
            title: "Post 2",
            url: "http://example.com/post2",
            text: "Sample text 2",
            published: "2023-01-02T12:00:00Z",
          },
          {
            thread: { uuid: "thread3" },
            title: "Post 3",
            url: "http://example.com/post3",
            text: "Sample text 3",
            published: "2023-01-03T12:00:00Z",
          },
        ],
      },
    });

    (savePosts as jest.Mock).mockResolvedValueOnce(3);

    // Act
    await fetchAndSaveAll("some-query", callbackMock);

    // Assert
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(savePosts).toHaveBeenCalledTimes(1);
    expect(savePosts).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          threadId: "thread1",
          title: "Post 1",
        }),
        expect.objectContaining({
          threadId: "thread2",
          title: "Post 2",
        }),
        expect.objectContaining({
          threadId: "thread3",
          title: "Post 3",
        }),
      ])
    );
    // Callback called with (savedCount, totalCountRemaining)
    expect(callbackMock).toHaveBeenCalledWith(3, 0);
  });

  it("fetches multiple batches when moreResultsAvailable is non-zero", async () => {
    // Arrange
    (axios.get as jest.Mock)
      // 1st call
      .mockResolvedValueOnce({
        data: {
          totalResults: 5,
          moreResultsAvailable: 1,
          posts: [
            { thread: { uuid: "threadA" }, title: "Post A", url: "", text: "", published: "2023-01-01" },
            { thread: { uuid: "threadB" }, title: "Post B", url: "", text: "", published: "2023-01-02" },
          ],
        },
      })
      // 2nd call
      .mockResolvedValueOnce({
        data: {
          totalResults: 5,
          moreResultsAvailable: 0,
          posts: [
            { thread: { uuid: "threadC" }, title: "Post C", url: "", text: "", published: "2023-01-03" },
            { thread: { uuid: "threadD" }, title: "Post D", url: "", text: "", published: "2023-01-04" },
            { thread: { uuid: "threadE" }, title: "Post E", url: "", text: "", published: "2023-01-05" },
          ],
        },
      });

    (savePosts as jest.Mock)
      .mockResolvedValueOnce(2) // for the first batch
      .mockResolvedValueOnce(3); // for the second batch

    // Act
    await fetchAndSaveAll("multi-query", callbackMock);

    // Assert
    // 2 calls to axios.get for the two batches
    expect(axios.get).toHaveBeenCalledTimes(2);

    // 2 calls to savePosts
    expect(savePosts).toHaveBeenCalledTimes(2);

    // Callback should be invoked once at the ends
    expect(callbackMock).toHaveBeenCalledWith(5, 0);
  });

  it("logs an error and stops if the fetch fails", async () => {
    // Arrange
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    // Act
    await fetchAndSaveAll("error-query", callbackMock);

    // Assert
    expect(savePosts).not.toHaveBeenCalled();
    expect(callbackMock).toHaveBeenCalledWith(0, 0);
  });

  it("logs an error if WEBHOSE_TOKEN is not set", async () => {
    // Arrange
    process.env.WEBHOSE_TOKEN = ""; // Clear the token
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });

    // Act
    await fetchAndSaveAll("no-token-query", callbackMock);

    // Assert
    expect(axios.get).not.toHaveBeenCalled();
    expect(savePosts).not.toHaveBeenCalled();
    expect(callbackMock).not.toHaveBeenCalled();
  });
});
