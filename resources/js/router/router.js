import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import UserPage from "../views/UserPage";
import PageNotFound from "../views/PageNotFound";
import Posts from "../views/Posts";
import Photos from "../views/Photos";
import Videos from "../views/Videos";
import Reviews from "../views/Reviews";
import About from "../views/About";
import Settings from "../views/Settings";
import Pagination from "../views/Pagination";
import LoadMore from "../views/LoadMore";
import Test from "../views/Test";
import Mail from "../views/Mail";

Vue.use(VueRouter);

const routes = [
    {
        path: '*', component: PageNotFound
    },
    {
        path: '/',
        component: Home,
        meta: {requiresAuth: false}
    },

    {
        path: '/:id',
        component: UserPage,
        meta: {requiresAuth: false},
        children: [
            {
                path: 'posts',
                component: Posts,
                meta: {requiresAuth: false},
            },
            {
                path: 'photos',
                component: Photos,
                meta: {requiresAuth: false},
            },
            {
                path: 'videos',
                component: Videos,
                meta: {requiresAuth: false},
            },
            {
                path: 'reviews',
                component: Reviews,
                meta: {requiresAuth: false},
            },
            {
                path: 'about',
                component: About,
                meta: {requiresAuth: false},
            },

            {
                path: 'settings',
                component: Settings,
                meta: {requiresAuth: false}
            }
        ]
    },
    {
        path: '/auth/login',
        component: Login,
        meta: {requiresAuth: false}
    },
    {
        path: '/auth/register',
        component: Register,
        meta: {requiresAuth: false}
    },

    {
        path:'/posts/pagination',
        component: Pagination,
        meta: {requiresAuth: false}
    },

    {
        path:'/posts/loadmore',
        component: LoadMore,
        meta: {requiresAuth: false}
    },

    {
        path: '/send/mail',
        component: Mail,
        meta: {requiresAuth: false}
    },
    // {
    //     path:'/test',
    //     component: Test,
    //     meta: {requiresAuth: false}
    // }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next({
                path: '/auth/login',
                query: {
                    nextUrl: to.fullPath,
                }
            });
        }
        next()
    }
    next()
})
