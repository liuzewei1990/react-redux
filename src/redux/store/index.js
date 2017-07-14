
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../reducers"

function configureStore() {
          /** 使用这个中间件 **/
          let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
          let store = createStoreWithMiddleware(rootReducer);
          return store;

}

export default configureStore;