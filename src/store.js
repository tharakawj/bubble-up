import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk));

sagaMiddleware.run(saga);

export default store;
