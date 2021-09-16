import { applyMiddleware, createStore, compose } from "redux";
// redux
import { rootReducers } from "./reducer/root.reducer";
// thunk
import thunk from "redux-thunk";

// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

