# 引入less样式文件
`import "ant-design-vue/dist/antd.less";`报错<br>
根目录创建`vue.config.js`并填写以下内容
```
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
```

# 按需加载组件
`npm i -D  babel-plugin-import`
```
//第一种
import DatePicker from 'ant-design-vue/lib/date-picker';  // 加载 JS
import 'ant-design-vue/lib/date-picker/style/css';        // 加载 CSS
// import 'ant-design-vue/lib/date-picker/style';         // 加载 LESS

//第二种（推荐）
// .babelrc or babel-loader option
{
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ]
}
然后main.js
import { DatePicker } from 'ant-design-vue';
```

# 路由懒加载
`component: () =>
        import(/* webpackChunkName: "user" */ "./components/RenderRouterView")`

# Render函数
` component: { render: h => h("router-view") },`<br>
等于`<template>
  <router-view></router-view>
</template>`<br>
将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。

# 进度条插件
`npm i nprogress`<br>

```
//router.js
import Nprogess from "nprogress";
import "nprogress/nprogress.css";

const router = {
  ...
}
router.beforeEach((to, from, next) => {
  NProgess.start();
  next();
});
router.afterEach((to, from, next) => {
  NProgess.done();
});
export default router;

```
# $route 和 $router
## $route
### $route 表示(当前路由信息对象) 
  表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）。
路由信息对象：即$router会被注入每个组件中，可以利用它进行一些信息的获取。
```
**1.$route.path**
      字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。
**2.$route.params**
      一个 key/value 对象，包含了 动态片段 和 全匹配片段，
      如果没有路由参数，就是一个空对象。
**3.$route.query**
      一个 key/value 对象，表示 URL 查询参数。
      例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
      如果没有查询参数，则是个空对象。
**4.$route.hash**
      当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。锚点
**5.$route.fullPath**
      完成解析后的 URL，包含查询参数和 hash 的完整路径。
**6.$route.matched**
      数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
**7.$route.name    当前路径名字**
**8.$route.meta  路由元信息
```
### $route出现的地方
1. 在组件内，即 this.$route
2. 在 $route 观察者回调内 router.match(location) 的返回值
3. 导航守卫的参数：
    ```
    router.beforeEach((to, from, next) => {
      // to 和 from 都是 路由信息对象
    })
    watch: {
      $route(to, from) {
        // to 和 from 都是 路由信息对象
      }
    }
    ```
## $router
全局的路由实例，是router构造方法的实例。<br>
在 Vue 实例内部，你可以通过 $router 访问路由实例
```
const router = new Router({
  routes: [
    {
      path: "/",
      name: "首页",
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '*', component: NotFoundComponent }
  ],
  linkActiveClass: "active-router",
  linkExactActiveClass: "exact-router"
})
```
### 全局挂载路由实例
```
// 全局注册的路由
Vue.use(VueRouter)
```
### 路由实例方法push
```
// 字符串
      this.$router.push('home')
// 对象
      this.$router.push({ path: 'home' })
// 命名的路由
      this.$router.push({ name: 'user', params: { userId: 123 }})
// 带查询参数，变成 /register?plan=123
      this.$router.push({ path: 'register', query: { plan: '123' }})
```
push方法其实和<router-link :to="...">是等同的。
注意：push方法的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。
### 路由实例方法go
```
// 页面路由跳转 前进或者后退
this.$router.go(-1) // 后退
```
### 路由实例方法replace
```
//push方法会向 history 栈添加一个新的记录，而replace方法是替换当前的页面，
不会向 history 栈添加一个新的记录
<router-link to="/05" replace>05</router-link>
// 一般使用replace来做404页面
this.$router.replace('/')
```

# router.js 路由(ant-design-pro)
      name 和 icon分别代表生成菜单项的文本和图标。
      hideChildrenInMenu 用于隐藏不需要在菜单中展示的子路由。用法可以查看 分步表单 的配置。
      hideInMenu 可以在菜单中不展示这个路由，包括子路由。
      authority 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示。

# lodash
`npm i lodash -S`

# 权限设计（函数式，注册插件式）
函数式组件 
    缺点：使用麻烦
```
<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true//必须传入authority
    }
  },
  render(h, context) {//h 作为 createElement 的别名,组件需要的一切都是通过 context 参数传递
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;//判断权限身份
  }
};
//全局注册
Vue.component("Authorized", Authorized);
//使用
 <Authorized :authority="['admin']"><SettingDrawer /></Authorized>
</script>
```
插件式 
    缺点：无法动态的更改权限
```
import { check } from "../utils/auth";
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}
export default { install };
//main.js
import Auth from "./directives/auth";
Vue.use(Auth);
//使用
    v-auth="['admin']"
```

# 使用图表库ECharts(还有AntV)
`npm install echarts --save`
```
//chart.vue
<template>
  <div ref="chartDom"></div>
</template>
<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    // option: {//深度更改数据
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>
//使用.vue
 <Chart :option="chartOption" style="height:600px"></Chart>
 import random from "lodash/random";
 import Chart from "../../components/Chart";
 data() {
    return {
     chartOption: {...}
     }
  },
  components: {
    Chart
  },
  mounted() {
    this.interval = setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
```
# Mock数据进行开发
`npm i axios`
```
根目录下创建mock文件夹
//dashboard_chart.js
function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 40, 78, 10, 30, 48];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;//使用CMD规范导出
//vue.config.js
devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];//删除缓存
            return res.send(result);
          }
        }
      }
    }
  }
```

//与服务器端交互(axios)
```
//package.json 添加
"serve:no-mock": "cross-env MOCK=none vue-cli-service serve",//需要安装cross-env包
//vue.config.js
   } else if (process.env.MOCK !== "none") {//不等于none的时候才走MOCK环境
//utils/request.js 封装axios请求
//使用JSX语法
//https://github.com/vuejs/jsx
import axios from "axios";
import { notification } from "ant-design-vue";
function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      notification.error({
        // eslint-disable-next-line no-unused-vars
        message: h => {
          <div>
            请求错误
            <span style="color:red">{status}</span> : {options.url}
          </div>;
        },
        description: statusText
      });
      return Promise.reject(error);
    });
}
export default request;
```
//表单自动校验、动态赋值
```
<a-form :form="form">
    <a-input
          v-decorator="[//自动校验
            'fieldA',
            {
              initialValue: fieldA,
              rules: [{ required: true, min: 6, message: '必须大于5个字符' }]
            }
          ]"
          placeholder="input placeholder"
    />
    <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
</a-form>

methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // this.fieldA = values.fieldA;
          // this.fieldB = values.fieldB;
          Object.assign(this, values);//提交时把values中的值赋给this，相当于上面两句
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({ fieldA: "hello world" });//不应该用 v-model，可以使用 this.form.setFieldsValue 来动态改变表单值。
    }, 3000);
  }
};
```

# 分布表单
1. src下创建store文件夹，再创建modules文件夹，其下再新建form.js文件
```
import router from "../../router";
import request from "../../utils/request";

const state = {
  step: {
    payAccount: "123456"
  }
};

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "/api/form",
      method: "POST",
      data: payload
    });
    commit("saveStepFormData", payload);
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
```
1. store文件夹新建index.js，并把根目录的store.js删除,main.js修改`import store from "./store/index.js";`
```
import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    form
  }
});
```
1. Step1.vue
```
<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账号' }]
            }
          ]"
          placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>
```
1. Step2.vue
```
<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入密码' }]
            }
          ]"
          type="password"
          placeholder="请输入付款密码"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="marginLeft: 8px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $store, step } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...step, ...values }
          });
        }
      });
    },
    onPrev() {
      this.$router.push("/form/step-form/info");
    }
  }
};
</script>

<style></style>

```
1. Step3.vue
```
<template>
  <div>
    操作成功，预计两小时到账
  </div>
</template>

<script>
export default {};
</script>

<style></style>

```
# 支持自动校验的表单
```
//ReceiverAccount.vue
<template>
  <div>
    <a-input-group compact>
      <a-select v-model="type" style="width: 130px" @change="handleTypeChange">
        <a-select-option value="alipay">支付宝</a-select-option>
        <a-select-option value="bank">银行账户</a-select-option>
      </a-select>
      <a-input
        style="width: calc(100%-130px)"
        v-model="number"
        @change="handleNumberChange"
      />
    </a-input-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value(val) {
      Object.assign(this, val);
    }
  },
  data() {
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  methods: {
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      this.$emit("change", { ...this.value, number: e.target.value });
    }
  }
};
</script>
//Step1.vue
 <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <ReceiveAccount
          v-decorator="[
            'receiveAccount',
            {
              initialValue: step.receiveAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
        ></ReceiveAccount>
      </a-form-item>
```