
import { combineReducers } from "redux"
import homeReducer from "./home"
/** 使用combineReducers合并各个reducer为全局state **/

const rootReducer = combineReducers({
          homeReducer
})

export default rootReducer