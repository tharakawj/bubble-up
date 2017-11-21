import { TOPICS_IN_HOMEPAGE } from "../constants/appConstants";

function getHomeTopics(state) {
  return Object.values(state.topics.data)
    .sort((t1, t2) => t2.upvotes - t1.upvotes)
    .filter((val, index) => index < TOPICS_IN_HOMEPAGE);
}

export { getHomeTopics };
