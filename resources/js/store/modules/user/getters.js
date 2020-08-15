export default {
    invalidForm(state) {
        return state.error
    },

    invalidEmail(state) {
        return state.errorEmail
    },

    getUser(state){
        return state.user;
    },

    getPosts(state){
        return state.posts;
    },

    getLoading(state){
        return state.loading;
    },

    getSpecificUser(state){
        return state.specificUser;
    }

}
