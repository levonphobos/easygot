<template>
    <div>
        <h1 class="text-center">Load More</h1>
        <div class="shadow-lg m-3" v-if="getAllPosts" v-for="post in getAllPosts.data" :key="post.id">
            <h4 class="text-success">{{post.title}} - {{post.type}}</h4>
            <p class="card-text">{{post.content}}</p>
        </div>
        <hr>
        <div class="text-center mt-4 mb-4" v-show="moreExists">
            <button class="btn btn-primary mtn-sm" @click="loadMore">Load More <i class="fas fa-long-arrow-alt-down"></i></button>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "LoadMore",
        data(){
            return {
                moreExists:false,
                nextPage:0
            }
        },
        mounted() {
            this.$store.dispatch('Post/getAllPosts');
            if(this.getAllPosts.current_page < this.getAllPosts.last_page){
                this.moreExists = true;
                this.nextPage = this.getAllPosts.current_page + 1;
            } else {
                this.moreExists = false;
            }
        },
        computed: {
            ...mapGetters({
                getAllPosts: 'Post/getAllPosts'
            })
        },

        methods:{
            loadMore(){
                this.$store.dispatch('Post/loadMore', this.nextPage);
                if(this.getAllPosts.current_page < this.getAllPosts.last_page){
                    this.moreExists = true;
                    this.nextPage++;
                } else {
                    this.moreExists = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
