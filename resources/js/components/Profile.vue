<template>
    <div>
        <div class="profile-img-block" v-if="getUser.data">
            <a :href="$router.resolve(`/${getUser.data.name.toLowerCase()}${getUser.data.id}`).href">
                <img :src="`http://127.0.0.1:8000/storage/uploads/${getUser.data.photo}`"
                     class="img-thumbnail rounded-circle"
                     alt="Avatar" width="47">
                <span class="online-status"></span>
            </a>
        </div>
        <div class="dropdown float-right profile-dropdown">
            <button class="btn btn-link dropdown-toggle btn-lg" type="button" id="dropdownMenu2" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item disabled" type="button">{{getUser.data.name}}</button>
                <hr>
                <a :href="$router.resolve(`/${getUser.data.name.toLowerCase()}${getUser.data.id}`).href">
                    <button class="dropdown-item" type="button">My Profile</button>
                </a>
                <router-link :to="`${getUser.data.name.toLowerCase()}${getUser.data.id}/settings`">
                    <button class="dropdown-item" type="button">Settings</button>
                </router-link>
                <hr>
                <router-link to="/">
                    <Logout class="dropdown-item"></Logout>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Logout from "./Logout";
    import {mapGetters} from 'vuex';


    export default {
        name: "Profile",
        components: {Logout},
        computed: {
            ...mapGetters({
                getUser: 'User/getUser',
            })
        }
    }
</script>

<style scoped>

</style>
