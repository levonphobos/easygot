export default {
    register(state,data) {
        state.user.loggedIn = true;
        state.user.data = data;
        state.loading = false;
    },

    login(state, data) {
        state.user.loggedIn = true;
        state.user.data = data;
        state.loading = false;
    },

    invalidForm(state, data) {
        state.error = data;
        state.loading = false;
    },
    invalidEmail(state, data) {
        state.errorEmail = data;
        state.loading = false;
    },

    loadingChange(state){
      state.loading = true;
    },

    getSpecificUser(state, data){
        state.specificUser = data;
    },

    updateImage(state, data){
        state.user.data.photo = data;
    },

    logout(state) {
        state.user.data = {};
        state.user.loggedIn = null;
        state.error = null;
        state.errorEmail = null;
    }
}
