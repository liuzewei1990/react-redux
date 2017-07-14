import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import actions from "../../redux/actions"
import { Div, Btn } from "../../components/JoyPage/JoyPage-ui"

class List extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>

                <p>这是首页的state</p>
                <Div>
                    {this.props._info}
                </Div>
                <Btn txt="触发home页的action改变state" clickCallback={this.handleBtn.bind(this)} />
            </div>
        )
    }

    handleBtn() {
        this.props.ACTIONS.test1();
    }
}

function mapStateToProps(state) {
    let { homeReducer } = state
    return {
        _info: homeReducer.info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ACTIONS: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)