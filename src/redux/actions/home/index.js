
import { TEST1, TEST2, TEST3 } from "../../constants/home"

let home = {
          test1: () => {
                    return (dispatch) => {
                              /** 使用数据模型请求数据 **/
                              dispatch({
                                        type: TEST1,
                                        info: "这是test1"
                              })
                    }
          },
          test2: () => {
                    return (dispatch) => {
                              /** 使用数据模型请求数据 **/
                              dispatch({
                                        type: TEST2,
                                        info: "这是test2"
                              })
                    }
          },
          test3: () => {
                    return (dispatch) => {
                              /** 使用数据模型请求数据 **/
                              dispatch({
                                        type: TEST3,
                                        info: "这是test3"
                              })
                    }
          }
}

export default home