<template>
    <div>
        <div class="shadow-lg m-3" v-if="getAllPosts" v-for="post in getAllPosts.data" :key="post.id">
            <h4 class="text-success">{{post.title}} - {{post.type}}</h4>
            <p class="card-text">{{post.content}}</p>
        </div>
        <hr>
        <paginate :data="getAllPosts" @pagination-change-page="getPosts"></paginate>
    </div>
</template>

<script>

    import Vue from "vue";

    import {mapGetters} from 'vuex';

    Vue.component('paginate', require('laravel-vue-pagination'));

    export default {
        name: "Pagination",
        mounted() {
            this.getPosts();
        },

        computed:{
            ...mapGetters({
                getAllPosts:'Post/getAllPosts'
            })
        },

        methods: {
            getPosts(page = 1) {
                this.$store.dispatch('Post/getAllPosts', page)
            }
        }
    }
</script>
