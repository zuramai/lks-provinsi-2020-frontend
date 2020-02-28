import Vue from 'vue'
import VueRouter from 'vue-router';
import BookIndex from './components/Book/BookIndex';
import BookAdd from './components/Book/BookAdd';
import BookDetail from './components/Book/BookDetail';
import AuthLogin from './components/Auth/Login';

Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/login",
            component: AuthLogin
        },
        {
            path: "/book",
            component: BookIndex,
        },
        {
            path: "/book/add",
            component: BookAdd
        },
        {
            path: "/book/:id",
            component: BookDetail
        },
    ]
})