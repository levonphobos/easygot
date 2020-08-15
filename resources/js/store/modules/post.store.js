import actions from './post/actions';
import mutations from './post/mutations';
import getters from './post/getters';

const state = {
    allUsersPosts: {},
    specificUserPosts:{}
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
