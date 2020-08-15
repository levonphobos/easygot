import UserService from '../../../services/user.service';
import router from "../../../router/router";

export default {
    register(ctx, data) {
        UserService.register(data).then(response => {
            localStorage.setItem('token', response.password);
            ctx.commit('register',response);
            router.push('/')
        }).catch(err => {
            if (err.response.status === 422) {
                ctx.commit('invalidForm', err.response.data.errors);
            }
            if (err.response.status === 401) {
                ctx.commit('invalidEmail', err.response.data);
            }
        })
    },

    login(ctx, data) {
        UserService.login(data).then(response => {
            localStorage.setItem('token', response.password);
            ctx.commit('login', response);
            if (router.currentRoute.query.nextUrl) {
                router.push(`${router.currentRoute.query.nextUrl}`);
            } else {
                router.push('/');
            }
        }).catch(err => {
            ctx.commit('invalidForm', err.response.data);
        })
    },

    getSpecificUser(ctx, id){
        UserService.getSpecificUser(id).then(response => {
            ctx.commit('getSpecificUser', response)
        })
    },

    updateImage(ctx, data){
        UserService.updateImage(data).then(response => {
            ctx.commit('updateImage', response)
        })
    },

    logout(ctx) {
        ctx.commit('logout');
        router.push("/").catch(() => {
        });
    },
}
