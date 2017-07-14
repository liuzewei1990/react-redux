import React from "react"

import Tabs from "./Tabs/Tabs"

export default class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Tabs />
                {/*<p>页面公共部分</p>*/}
                {this.props.children}
            </div>
        )
    }

}