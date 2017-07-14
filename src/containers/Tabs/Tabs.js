import React from "react"
import { Link } from "react-router"

require("./css.less")
export default class CityList extends React.Component {
          constructor() {
                    super();
          }

          render() {
                    return (
                              <div className="app-tabs">
                                        <div>
                                                  <Link
                                                            to={{ pathname: '/home', query: { showAge: true } }}
                                                            activeStyle={{ color: "red" }}
                                                            activeClassName="active">
                                                            <span>首页</span>
                                                  </Link>
                                        </div>
                                        <div>
                                                  <Link
                                                            to={{ pathname: '/list' }}
                                                            activeStyle={{ color: "red" }}
                                                            activeClassName="active">
                                                            <span>列表</span>
                                                  </Link>
                                        </div>
                                        <div>
                                                  <Link
                                                            to="/detail"
                                                            activeStyle={{ color: "red" }}
                                                            activeClassName="active">
                                                            <span>详情</span>
                                                  </Link>
                                        </div>
                                        <div>
                                                  <Link
                                                            onClick={(e) => {
                                                                      e.preventDefault();
                                                                      location.hash = "list";
                                                            }}
                                                            activeStyle={{ color: "red" }}
                                                            activeClassName="active">
                                                            <span>弹窗</span>
                                                  </Link>
                                        </div>
                              </div>
                    )
          }

}