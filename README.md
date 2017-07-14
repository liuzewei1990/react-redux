



/*依赖模块*/

1、安装开发环境所需模块

npm install webpack webpack-dev-server url-loader file-loader css-loader style-loader mockjs less-loader less html-webpack-plugin babel-preset-react babel-preset-es2015 babel-loader babel-core extract-text-webpack-plugin --save-dev


2、 安装生成环境所需模块

npm install react react-router react-dom --save

3、配置webpack.config.js程序


4、编写入口文件,测试开发环境程序,测试生成环境


5、布置路由表 首页 列表页1 列表页2 详情页 404页


6、配置路由懒加载,拆分js文件为多个,按需加载


7、链接redux
安装: npm install redux react-redux redux-thunk --save
   (1) 创建store 
   (2) 创建reducer
   (3) 创建action
