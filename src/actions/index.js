import {
  FETCH_TOPICS_REQUEST,
  VOTE_TOPICS_REQUEST
} from "../constants/actionTypes";

export const fetchTopics = () => ({ type: FETCH_TOPICS_REQUEST });

export const upvoteTopic = id => ({
  type: VOTE_TOPICS_REQUEST,
  id,
  direction: 1
});

export const downvoteTopic = id => ({
  type: VOTE_TOPICS_REQUEST,
  id,
  direction: -1
});
