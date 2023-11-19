import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
// 配置全局域名
// axios.defaults.baseURL = "http://WebXml.com.cn";
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
