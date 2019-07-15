import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
// import antd from "ant-design-vue";
// import Button from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// import "ant-design-vue/lib/button/style";

import { Button } from "ant-design-vue";

Vue.config.productionTip = false;

// Vue.use(antd);
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
