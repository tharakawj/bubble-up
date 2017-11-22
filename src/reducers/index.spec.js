import * as types from "../constants/actionTypes";
import reducer, { initialState } from "./index";

const state = {
  topics: {
    error: null,
    loading: false,
    data: {}
  }
};

test("Initial state", () => {
  expect(state).toEqual(initialState);
});

test("Returns initial state given undefined", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

describe("Fetch topics", () => {
  test("Set loading state to true on FETCH_TOPICS_PROGRESSING", () => {
    expect(reducer(state, { type: types.FETCH_TOPICS_PROGRESSING })).toEqual({
      ...state,
      topics: {
        ...state.topics,
        loading: true
      }
    });
  });

  test("Set data and loading state to false on FETCH_TOPICS_SUCCEEDED", () => {
    const topic = { id: "Id1", text: "topic text" };
    expect(
      reducer(state, { type: types.FETCH_TOPICS_SUCCEEDED, topics: [topic] })
    ).toEqual({
      ...state,
      topics: {
        ...state.topics,
        data: {
          [topic.id]: topic
        }
      }
    });
  });

  test("Set error message and loading state to false on FETCH_TOPICS_FAILED", () => {
    const message = "Error occurred!";
    expect(
      reducer(state, { type: types.FETCH_TOPICS_FAILED, message })
    ).toEqual({
      ...state,
      topics: {
        ...state.topics,
        loading: false,
        error: message
      }
    });
  });
});

describe("Vote topic", () => {
  const id = "id1";
  const upvotes = 1;

  const stateWithTopic = {
    topics: {
      data: {
        [id]: {
          id: "id1",
          text: "topic text",
          upvotes
        }
      }
    }
  };

  test("Vote topic on VOTE_TOPICS_REQUEST", () => {
    expect(
      reducer(stateWithTopic, {
        type: types.VOTE_TOPICS_REQUEST,
        direction: 1,
        id
      })
    ).toEqual({
      topics: {
        data: {
          [id]: {
            id: "id1",
            text: "topic text",
            upvotes: upvotes + 1
          }
        }
      }
    });

    expect(
      reducer(stateWithTopic, {
        type: types.VOTE_TOPICS_REQUEST,
        direction: -1,
        id
      })
    ).toEqual({
      topics: {
        data: {
          [id]: {
            id: "id1",
            text: "topic text",
            upvotes: upvotes - 1
          }
        }
      }
    });
  });

  test("Revert vote (optimistically updated) on VOTE_TOPICS_FAILED", () => {
    expect(
      reducer(
        reducer(stateWithTopic, {
          type: types.VOTE_TOPICS_REQUEST,
          direction: 1,
          id
        }),
        {
          type: types.VOTE_TOPICS_FAILED,
          direction: 1,
          id
        }
      )
    ).toEqual(stateWithTopic);

    expect(
      reducer(
        reducer(stateWithTopic, {
          type: types.VOTE_TOPICS_REQUEST,
          direction: -1,
          id
        }),
        {
          type: types.VOTE_TOPICS_FAILED,
          direction: -1,
          id
        }
      )
    ).toEqual(stateWithTopic);
  });
});
