import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import ConfigEdit from '@/components/ConfigEdit';
import LogView from '@/components/LogView';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/conf',
            name: 'ConfigEdit',
            component: ConfigEdit,
        },
        {
            path: '/log/:repoUser/:repoRef',
            name: 'LogView',
            component: LogView,
            props: true,
        },
    ],
    mode: 'abstract',
});
