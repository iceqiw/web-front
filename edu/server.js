/** 用于开发环境的服务启动 **/
const path = require("path"); // 获取绝对路径有用
const express = require("express"); // express服务器端框架
const webpack = require("webpack"); // webpack核心
const env = process.env.NODE_ENV; // 模式（dev开发环境，production生产环境）
const webpackDevMiddleware = require("webpack-dev-middleware"); // webpack服务器
const webpackHotMiddleware = require("webpack-hot-middleware"); // HMR热更新中间件
const webpackConfig = require("./webpack.dev.config.js"); // webpack开发环境的配置文件

const proxyMiddleWare = require("http-proxy-middleware");
const proxyPathHome = "http://localhost:8080";//目标后端服务地址(公司同事电脑地址)
const proxyOptionHome ={target:proxyPathHome,changeOrigoin:true};

const proxyPathUser = "http://localhost:8087";//目标后端服务地址(公司同事电脑地址)
const proxyOptionUser ={target:proxyPathUser,changeOrigoin:true};

const mock = require("./mock/mock-data"); // mock模拟数据，模拟后台业务

const app = express(); // 实例化express服务
const DIST_DIR = webpackConfig.output.path; // webpack配置中设置的文件输出路径，所有文件存放在内存中
const PORT = 8888; // 服务启动端口号
const compiler = webpack(webpackConfig); // 实例化webpack


if (env === "production") {
  // 如果是生产环境，则运行build文件夹中的代码
  app.use(express.static("build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  app.use(
    webpackDevMiddleware(compiler, {
      // 挂载webpack小型服务器
      publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
      quiet: true, // 是否不输出启动时的相关信息
      stats: {
        colors: true, // 不同信息不同颜色
        timings: true // 输出各步骤消耗的时间
      }
    })
  );
  // 挂载HMR热更新中间件
  app.use(webpackHotMiddleware(compiler));
}

app.use("/api/user",proxyMiddleWare(proxyOptionUser))//这里要注意"/tech" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)
app.use("/api/tech",proxyMiddleWare(proxyOptionHome))


/** 启动服务 **/
app.listen(PORT, () => {
  console.log("本地服务启动地址: http://localhost:%s", PORT);
});
