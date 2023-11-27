import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.min.css"
import 'ant-design-vue/dist/reset.css';

import { DatePicker } from 'ant-design-vue';

// import './assets/reset.css'
import './assets/base.scss'
import './assets/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
// import adminRouter from './router/admin/index'

const app = createApp(App);

app.use(createPinia())
// app.use(adminRouter)
app.use(DatePicker);

app.use(router).mount('#app')
