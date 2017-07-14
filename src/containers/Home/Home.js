import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import actions from "../../redux/actions"

import { Div, Btn } from "../../components/JoyPage/JoyPage-ui"

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Div>
                    {this.props._info}
                </Div>

                <Btn txt="action1" clickCallback={this.handleBtn1.bind(this)} />
                <Btn txt="action2" clickCallback={this.handleBtn2.bind(this)} />
                <Btn txt="action3" clickCallback={this.handleBtn3.bind(this)} />
            </div>
        )
    }
    componentDidMount() {
        console.log(this.props)
    }
    handleBtn1() {
        this.props.ACTIONS.test1();
    }
    handleBtn2() {
        this.props.ACTIONS.test2();
    }
    handleBtn3() {
        this.props.ACTIONS.test3();
    }
}



function mapStateToProps(state) {
    console.log(111,state)
    /**
     * 在全局state中取出home组件的state 又名 reducer
     * 作为props属性传入组件中
     */
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)