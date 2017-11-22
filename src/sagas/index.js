import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";

import * as types from "../constants/actionTypes";
import { get, post } from "../utils/request";

function* fetchTopics(action) {
  yield put({ type: types.FETCH_TOPICS_PROGRESSING });

  try {
    const topics = yield call(get, "topics");
    yield put({ type: types.FETCH_TOPICS_SUCCEEDED, topics });
  } catch (e) {
    yield put({ type: types.FETCH_TOPICS_FAILED, message: e.message });
  }
}

function* voteTopic(action) {
  try {
    const url = `topics/${action.id}/vote`;
    const body = { direction: action.direction };
    const topic = yield call(post, url, body);
    yield put({ type: types.VOTE_TOPICS_SUCCEEDED, topic });
  } catch (e) {
    yield put({
      type: types.VOTE_TOPICS_FAILED,
      error: e.message,
      id: action.id,
      direction: action.direction
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.FETCH_TOPICS_REQUEST, fetchTopics),
    // consider every request since we allow to upvote/downvote
    // multiple times
    takeEvery(types.VOTE_TOPICS_REQUEST, voteTopic)
  ]);
}
