// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import data from '@/libs/data';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    created: function () {
        let uri = window.location.href.split('?');
        if (uri.length === 2) {
            let vars = uri[1].split('&');
            let params = {};
            vars.forEach(function (param) {
                let tmp = param.split('=');
                params[tmp[0]] = tmp[1];
            });
            data.setParams(params);
        }
    },
    template: '<App/>',
});
router.replace('/');
