<template>
    <button @click="logout" type="button"><i class="fas fa-sign-out-alt"></i> Log Out</button>
</template>

<script>
    import * as Cookies from "js-cookie";

    export default {
        name: "Logout",
        methods:{
            logout(){
                localStorage.removeItem('token');
                this.$store.dispatch('User/logout')
            }
        }
    }
</script>

<style scoped>

</style>
