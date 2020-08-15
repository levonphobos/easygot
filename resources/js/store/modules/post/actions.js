import PostService from './../../../services/post.service';
import router from "../../../router/router";

export default {
    createPost(ctx,data){
        PostService.createPost(data).then(response => {
            ctx.commit('createPost', response)
        })
    },

    getUserPosts(ctx,data) {
        PostService.getUserPosts(data).then(response => {
            ctx.commit('getUserPosts', response);
        })
    },

    getAllPosts(ctx, page){
        PostService.getAllPosts(page).then(response => {
            ctx.commit('getAllPosts', response)
        })
    },

    loadMore(ctx, page){
        PostService.loadMore(page).then(response => {
            ctx.commit('loadMore', response)
        })
    }
}
