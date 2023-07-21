import identityReducer from "./authentication";
import infoReducer from "./information";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    identity: identityReducer,
    information: infoReducer
})

export default rootReducers;