//引入Vue
import Vue from "vue";
//引入App
import App from "./App.vue";
// 引入请求api
import apis from "./request/http";
// 引入vant组件
import { Popup } from "vant";
// 引入重置样式
import "./styles/reset.scss";
import "./styles/common.scss";
// 数数埋点
import thinking from "./utils/thinkingData.js";
// 移动端调试工具
if (process.env.VUE_APP_ENV === "testPro") {
  import("vconsole").then((res) => {
    const VConsole = res.default;
    Vue.use(new VConsole({ defaultPlugins: ["system", "network"] }));
  });
}
// 全局混入
import { PublicMixin } from "./mixins/index.js";
Vue.mixin(PublicMixin);
Vue.prototype.$thinking = thinking;
Vue.use(Popup);
// 挂载api
Vue.prototype.apis = apis;
//关闭Vue的生产提示
Vue.config.productionTip = false;
//创建vm
new Vue({
  el: "#app",
  render: (h) => h(App),
});
