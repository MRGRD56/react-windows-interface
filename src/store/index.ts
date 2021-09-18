import {combineReducers, createStore} from "redux";
import taskbarReducer from "./taskbar/taskbarReducer";
import * as TaskbarActionCreators from "./taskbar/actionCreators";

const store = createStore(combineReducers({
    taskbarReducer
}));

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const actionCreators = {
    ...TaskbarActionCreators
};
