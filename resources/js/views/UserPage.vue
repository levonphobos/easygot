<template>
    <div>
        <Header></Header>
        <div class="container-fluid" v-if="getSpecificUser">
            <div class="row">
                <div class="col-sm-3 p-0">
                    <div>
                        <img v-if="getSpecificUser.photo" :src="`http://127.0.0.1:8000/storage/uploads/${getSpecificUser.photo}`"
                             alt="Profile Picture" class="w-100 profile-img-bg">
                    </div>
                    <div class="list-group" v-if="getSpecificUser.name">
                        <h4 class="text-center pt-2 pb-2 m-0 profile-name">{{getSpecificUser.name}}</h4>
                        <router-link :to="`/${getSpecificUser.name.toLowerCase()}${getSpecificUser.id}/posts`"
                                     class="list-group-item list-group-item-action list-group-item-primary pt-1 pb-1">
                            Posts
                        </router-link>
                        <router-link :to="`/${getSpecificUser.name.toLowerCase()}${getSpecificUser.id}/photos`"
                                     class="list-group-item list-group-item-action list-group-item-primary pt-1 pb-1">
                            Photos
                        </router-link>
                        <router-link :to="`/${getSpecificUser.name.toLowerCase()}${getSpecificUser.id}/videos`"
                                     class="list-group-item list-group-item-action list-group-item-primary pt-1 pb-1">
                            Videos
                        </router-link>
                        <router-link :to="`/${getSpecificUser.name.toLowerCase()}${getSpecificUser.id}/reviews`"
                                     class="list-group-item list-group-item-action list-group-item-primary pt-1 pb-1">
                            Reviews
                        </router-link>
                        <router-link :to="`/${getSpecificUser.name.toLowerCase()}${getSpecificUser.id}/settings`"
                                     class="list-group-item list-group-item-action list-group-item-primary pt-1 pb-1">
                            Settings
                        </router-link>
                    </div>
                </div>
                <div class="col-sm-9 p-0">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Header from "../components/Header";

    export default {
        name: "UserPage",
        components: {Header},

        mounted() {
            let id = this.$route.params.id.replace(/\D/g, "");
            this.$store.dispatch('User/getSpecificUser', id);
        },
        computed: {
            ...mapGetters({
                getUser: 'User/getUser',
                getSpecificUser:'User/getSpecificUser',
            })
        }
    }
</script>
