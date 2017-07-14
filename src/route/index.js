/**
 * 1.创建路由表
 * 2.链接redux的store
 */
import React from "react"
import { Provider } from "react-redux"
import { hashHistory, Router, Route, IndexRoute } from "react-router"
/** 导入Store **/
import configureStore from "../redux/store"
/** 导入路由表 **/
import routes from "./Routes"


const Store = configureStore();

/** 导出路由 这里history使用hashHistory => /#home的方式 **/
const myRouter = () => {
    return (
        <Provider store={Store}>
            <Router routes={routes} history={hashHistory} />
        </Provider>
    )
}

export default myRouter
