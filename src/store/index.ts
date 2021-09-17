import {combineReducers, createStore} from "redux";
import taskbarReducer from "./taskbar/taskbarReducer";

const store = createStore(combineReducers({
    taskbarReducer
}));

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
