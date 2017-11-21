function getHomeTopics(state, topicCount) {
  return Object.values(state.topics.data)
    .sort((t1, t2) => t2.upvotes - t1.upvotes)
    .filter((val, index) => index < topicCount);
}

export { getHomeTopics };
