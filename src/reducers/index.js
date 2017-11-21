import * as types from "../constants/actionTypes";

const initialState = {
  topics: {
    error: null,
    loading: false,
    data: {}
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}

export default reducer;
