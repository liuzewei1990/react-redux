
/**
 * APP入口文件
 * 这里不做任何事情，直接跟路由表进行关联
 */

import React from "react"
import { render } from "react-dom"
import Router from "./route"
require("./public/styles/reset.less")
require("./public/styles/index.less")

render(<Router />, document.getElementById("app"))