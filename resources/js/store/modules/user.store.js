import actions from './user/actions';
import mutations from './user/mutations';
import getters from './user/getters';

const state = {
    user: {
        data:{},
        loggedIn: localStorage.getItem("token") !== null
    },
    specificUser:{},
    posts:[],
    loading:false,
    error: null,
    errorEmail:null
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
