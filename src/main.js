import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
// import antd from "ant-design-vue";
// import Button from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// import "ant-design-vue/lib/button/style";

import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "querystring";
import {
  Button,
  Icon,
  Layout,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";

// Import Vue and vue-highlgihtjs
import VueHighlightJS from "vue-highlightjs";

Vue.config.productionTip = false;

// Vue.use(antd);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);

Vue.component("Authorized", Authorized);
Vue.use(Auth);

Vue.use(VueI18n);

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1301960_5011bg8e03k.js" // 在 iconfont.cn 上生成
});
Vue.component("IconFont", IconFont);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
