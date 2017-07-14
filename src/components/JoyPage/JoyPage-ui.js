import React from "react"

require("./css.less");


class Div extends React.Component {
          render() {
                    return (
                              <div>
                                        <span>我是木偶组件：</span>
                                        {this.props.children}
                              </div>
                    )
          }
}


class Btn extends React.Component {
          render() {
                    return (
                              <button onClick={this.props.clickCallback}>
                                        {this.props.txt}
                              </button>
                    )
          }
}


export { Div, Btn }