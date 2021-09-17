import {Action} from "redux";

export default interface AppAction<TType, TPayload> extends Action<TType> {
    payload: TPayload
}
