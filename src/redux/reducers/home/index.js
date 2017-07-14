
import { TEST1, TEST2, TEST3 } from "../../constants/home"

let initState = {
          info: "默认状态1"
}

let home = (state = initState, action) => {
          switch (action.type) {
                    case TEST1:
                              return Object.assign({}, state, {
                                        info: action.info
                              })
                    case TEST2:
                              return Object.assign({}, state, {
                                        info: action.info
                              })
                    case TEST3:
                              return Object.assign({}, state, {
                                        info: action.info
                              })
                    default:
                              return state
          }
}

export default home