<template>
    <div>
        <nav class="navbar navbar_style">
            <router-link class="navbar-brand" to="/">
                <img src="/images/logo-icon.png" class="logo-icon" alt="Logo">
            </router-link>
            <div v-if="this.$route.path === '/' && !getUser.loggedIn" class="float-right mr-5">
                <router-link to="/auth/login">
                    <button class="btn btn-outline-info text-white my-2 my-sm-0 mr-2" type="submit">Login</button>
                </router-link>
                <router-link to="/auth/register">
                    <button class="btn btn-outline-success text-white my-2 my-sm-0" type="submit">Register</button>
                </router-link>
            </div>
            <div v-if="getUser.loggedIn" class="float-right mr-5">
                <Profile></Profile>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Profile from "./Profile";

    export default {
        name: "Header",
        components: {Profile},
        computed:{
            ...mapGetters({
                getUser:'User/getUser'
            })
        }
    }
</script>
