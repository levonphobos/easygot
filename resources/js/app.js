require('./bootstrap');
window.Vue = require('vue');

import Vue from 'vue'
import Layout from "./Layout";
import Vuelidate from "vuelidate/src";
import router from "./router/router";
import store from "./store/store";
import _ from 'lodash'

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');

    if ( token != null ) {
        config.headers.Authorization = token;
    }

    return config;
});

Vue.use(Vuelidate)

new Vue({
    router,
    store,
    render: h => h(Layout)
}).$mount('#app');
