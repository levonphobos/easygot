export default {
    createPost(state, data){
        state.specificUserPosts.data.unshift(data);
    },

    getUserPosts(state, data){
        state.specificUserPosts = data;
    },

    getAllPosts(state, data){
        state.allUsersPosts = data
    },

    loadMore(state, data){
        state.allUsersPosts.current_page = data.current_page;
        state.allUsersPosts.data = state.allUsersPosts.data.concat(data.data);
    }
}
