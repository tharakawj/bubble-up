import * as types from "../constants/actionTypes";

export const initialState = {
  topics: {
    error: null,
    loading: false,
    data: {}
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // Fetch topics
    case types.FETCH_TOPICS_PROGRESSING:
      return {
        ...state,
        topics: {
          ...state.topics,
          loading: true
        }
      };

    case types.FETCH_TOPICS_SUCCEEDED:
      const topicsById = action.topics.reduce((obj, topic) => {
        obj[topic.id] = topic;
        return obj;
      }, {});
      return {
        ...state,
        topics: {
          ...state.topics,
          loading: false,
          data: { ...state.topics.data, ...topicsById }
        }
      };

    case types.FETCH_TOPICS_FAILED:
      return {
        ...state,
        topics: {
          ...state.topics,
          loading: false,
          error: action.message
        }
      };

    // Vote topic
    case types.VOTE_TOPICS_REQUEST:
      // Be optimistic about the API call and update the state
      return state.topics.data[action.id]
        ? {
            ...state,
            topics: {
              ...state.topics,
              data: {
                ...state.topics.data,
                [action.id]: {
                  ...state.topics.data[action.id],
                  upvotes:
                    state.topics.data[action.id].upvotes +
                    (action.direction > 0 ? 1 : -1)
                }
              }
            }
          }
        : state;

    case types.VOTE_TOPICS_SUCCEEDED:
      // Nothing to do since we already updates the state.
      // Keep this placehoder for any future requirement to
      // handle success of vote topic action.
      return state;

    case types.VOTE_TOPICS_FAILED:
      // Revert the change in case of API call failure
      return state.topics.data[action.id]
        ? {
            ...state,
            topics: {
              ...state.topics,
              data: {
                ...state.topics.data,
                [action.id]: {
                  ...state.topics.data[action.id],
                  upvotes:
                    state.topics.data[action.id].upvotes -
                    (action.direction > 0 ? 1 : -1)
                }
              }
            }
          }
        : state;

    // Topic Created
    case types.TOPICS_CREATED:
      return {
        ...state,
        topics: {
          ...state.topics,
          data: { ...state.topics.data, [action.topic.id]: action.topic }
        }
      };

    default:
      return state;
  }
}

export default reducer;
