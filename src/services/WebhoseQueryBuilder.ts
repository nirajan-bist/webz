// src/services/WebhoseQueryBuilder.ts

interface WebhoseQueryParams {
  token: string;
  size?: number;
  from?: number;
  query?: string;
  // add more fields as needed (e.g. language, site_type, etc.)
}

export class WebhoseQueryBuilder {
  private params: WebhoseQueryParams = {
    token: "",
    size: 200,
    from: 0,
    query: "",
  };

  setToken(token: string): WebhoseQueryBuilder {
    this.params.token = token;
    return this;
  }

  setSize(size: number): WebhoseQueryBuilder {
    this.params.size = size;
    return this;
  }

  setFrom(from: number): WebhoseQueryBuilder {
    this.params.from = from;
    return this;
  }

  setQuery(query: string): WebhoseQueryBuilder {
    this.params.query = query;
    return this;
  }

  build(): WebhoseQueryParams {
    return { ...this.params };
  }

  buildUrl(): string {
    const { token, size, from, query } = this.params;
    let url = `https://api.webz.io/newsApiLite?token=${token}&size=${size}&from=${from}`;
    if (query) {
      url += `&q=${encodeURIComponent(query)}`;
    }
    return url;
  }
}
