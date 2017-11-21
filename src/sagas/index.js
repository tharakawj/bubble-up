import { call, put, all, takeLatest } from "redux-saga/effects";

import * as types from "../constants/actionTypes";
import { get } from "../utils/request";

function* fetchTopics(action) {
  yield put({ type: types.FETCH_TOPICS_PROGRESSING });

  try {
    const topics = yield call(get, "topics");
    yield put({ type: types.FETCH_TOPICS_SUCCEEDED, topics });
  } catch (e) {
    yield put({ type: types.FETCH_TOPICS_FAILED, message: e.message });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.FETCH_TOPICS_REQUEST, fetchTopics)]);
}
