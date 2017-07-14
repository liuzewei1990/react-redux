
import { setWeChatTitle } from "../tools/myTool"
const routes = {
          path: '/',
          getComponent(nextState, callback) {
                    require.ensure([], require => {
                              callback(null, require('../containers/App').default);
                    }, 'app');
          },
          indexRoute: {
                    onEnter: (nextState, replace) => { replace("/home") } /** 默认重定向->首页 **/
          },
          childRoutes: [
                    {
                              path: 'home',
                              getComponent(nextState, callback) {
                                        require.ensure([], require => {
                                                  /** 
                                                   * 1.依赖
                                                   * 2.导入路由对应的组件
                                                   *  如果组件是使用es5的module.exports导出的话，那么只需要require(‘components/Index')即可。
                                                   *  而如果组件是使用es6的export default导出的话，那么需要加上default
                                                   * 3.为匹配到的路由导出对应的js文件名,与webpack.config中的chunkHash对应
                                                   **/
                                                  callback(null, require('../containers/Home/Home').default);
                                        }, 'home');
                              },
                              onEnter: () => {
                                        console.log("进入home路由")
                                        setWeChatTitle("首页");
                              },
                              childRoutes: []
                    },
                    {
                              path: 'list',
                              getComponent(nextState, callback) {
                                        require.ensure([], require => {
                                                  callback(null, require('../containers/List/List').default);
                                        }, 'list');
                              },
                              onEnter: () => {
                                        console.log("进入列表页路由");
                                        setWeChatTitle("列表页");
                              },
                              childRoutes: []
                    },
                    {
                              path: 'detail',
                              getComponent(nextState, callback) {
                                        require.ensure([], require => {
                                                  callback(null, require('../containers/Detail/Detail').default);
                                        }, 'detail');
                              },
                              onEnter: () => {
                                        console.log("进入详情页路由");
                                        setWeChatTitle("详情页");
                              },
                              childRoutes: []
                    },
                    {
                              path: '*',
                              getComponent(nextState, callback) {
                                        require.ensure([], require => {
                                                  callback(null, require('./404/404').default);
                                        }, '404')
                              },
                              onEnter: () => {
                                        console.log("进入404页路由");
                                        setWeChatTitle("出错啦！");
                              }
                    }
          ]
};


export default routes