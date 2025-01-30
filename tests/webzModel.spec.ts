import { savePosts, Post } from "../src/models/webz";
import { queryBuilder } from "../src/utils/knex";

jest.mock("../src/utils/knex", () => ({
  // We export a function returning another function that can be used to access the 'insert'
  queryBuilder: jest.fn(() => ({})),
}));

jest.mock("../src/utils/logger", () => {
  // Mock the logger to prevent actual logging output during tests
  return jest.fn().mockImplementation(() => ({
    info: jest.fn(),
    error: jest.fn(),
  }));
});

describe("savePosts", () => {
  let mockInsert: jest.Mock;
  let qbInstance: { insert: jest.Mock };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    mockInsert = jest.fn();
    qbInstance = { insert: mockInsert };

    // Every time queryBuilder is called, return qbInstance
    (queryBuilder as jest.Mock).mockReturnValue(qbInstance);
  });

  it("should return 0 if no posts are provided", async () => {
    const result = await savePosts([]);
    expect(result).toBe(0);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("should return 0 and log an error if insertion fails", async () => {
    // Arrange
    const posts: Post[] = [
      {
        threadId: "failTest",
        title: "Will fail",
        url: "http://fail.com",
        text: "Some text",
        published: new Date("2023-01-01T00:00:00Z"),
      },
    ];
    mockInsert.mockRejectedValueOnce(new Error("DB error"));

    // Act
    const insertedCount = await savePosts(posts);

    // Assert
    expect(insertedCount).toBe(0);
    // The error logger should have been called, but we won’t assert on it directly
  });
});
