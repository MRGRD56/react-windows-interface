import {combineReducers, createStore} from "redux";
import taskbarReducer from "./taskbar/taskbarReducer";
import * as TaskbarActionCreators from "./taskbar/actionCreators";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(combineReducers({
    taskbar: taskbarReducer
}), composeWithDevTools());

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const actionCreators = {
    ...TaskbarActionCreators
};
