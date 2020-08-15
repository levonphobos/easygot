<template>
    <div class="mt-4">
        <div class="clearfix">
            <span class="float-left text-success h3 ml-3">{{getUserPosts.data.length}} Posts</span>
            <AddPost :user="getSpecificUser"></AddPost>
        </div>
        <div class="container-fluid posts-block">
            <div v-if="!(getUserPosts.data.length > 0)" class="row justify-content-center">
                <div class="col-md-4 mt-5">
                    <h2 class="text-muted text-center">Posts Doesn't Exist</h2>
                </div>
            </div>
            <div v-if="getUserPosts.data.length > 0" class="row" v-for="chunk in productChunks">
                <div class="col-md-3 is-one-quarter mb-5" v-for="post in chunk">
                    <div class="card m-auto" style="width: 14rem;">
                        <div class="card-image-block m-auto">
                            <img class="card-img-top"
                                 :src="`http://127.0.0.1:8000/storage/uploads/${getSpecificUser.photo}`"
                                 alt="Card image cap">
                        </div>
                        <hr>
                        <div class="card-body pt-0 pb-0">
                            <div class="clearfix">
                                <div class="pt-1 pb-1 review-star-block float-left">
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star empty-review-star"></i>
                                    <span>4.7</span>
                                </div>
                                <div class="float-right pt-1 pb-1">
                                    <span>745</span>
                                    <i class="fas fa-thumbs-up likeBtn"></i>
                                </div>
                            </div>
                            <hr>
                            <h5 class="card-title mt-3">
                                <router-link :to="`/${getSpecificUser.name.toLowerCase()}${getSpecificUser.id}`">
                                    {{getSpecificUser.name}}
                                </router-link>
                            </h5>
                            <p class="card-text text-muted mb-0 text-capitalize">{{getSpecificUser.category}}</p>
                            <p class="card-text text-muted">All posts - {{getUserPosts.data.length}}</p>
                            <PostTypeBtn class="mb-3" :post="post" :user="getSpecificUser"></PostTypeBtn>
                        </div>
                    </div>
                </div>
            </div>

            <paginate :data="getUserPosts" size="small" @pagination-change-page="getPosts"></paginate>

            <!--            <div class="text-center">-->
<!--                <button class="btn btn-sm btn-primary mb-5" @click="loadMore">Load More</button>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {mapGetters} from 'vuex';
    Vue.component('paginate', require('laravel-vue-pagination'));
    import AddPost from "../components/AddPost";
    import PostTypeBtn from "../components/PostTypeBtn";

    export default {
        name: "Posts",
        components: {PostTypeBtn, AddPost},

        mounted() {
            let id = this.$route.params.id.replace(/\D/g, "");
            this.$store.dispatch('User/getSpecificUser', id);
            this.getPosts();
        },

        computed: {
            productChunks() {
                return _.chunk(Object.values(this.getUserPosts.data), 4);
            },
            ...mapGetters({
                getUser: 'User/getUser',
                getSpecificUser: 'User/getSpecificUser',
                getUserPosts: 'Post/getUserPosts'
            })
        },
        methods:{
            getPosts(page = 1) {
                this.$store.dispatch('Post/getUserPosts', page)
            }
        }
    }
</script>
