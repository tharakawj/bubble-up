import { getHomeTopics } from "./index";

const state = {
  topics: {
    data: {
      id1: { id: "id1", text: "topic text", upvotes: 1 },
      id2: { id: "id2", text: "topic text", upvotes: 5 },
      id3: { id: "id3", text: "topic text", upvotes: 9 },
      id4: { id: "id4", text: "topic text", upvotes: 8 }
    }
  }
};

describe("getHomeTopics", () => {
  test("Sort topics by upvotes", () => {
    expect(getHomeTopics(state, 5)).toEqual(
      Object.values(state.topics.data).sort((t1, t2) => t2.upvotes - t1.upvotes)
    );
  });

  test("Select first n topics given n", () => {
    const topicCount = 3;
    expect(getHomeTopics(state, topicCount).length).toBe(topicCount);
  });
});
