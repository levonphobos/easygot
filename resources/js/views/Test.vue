<template>
    <div>
        Test
    </div>
</template>

<script>
    import router from "../router/router";

    export default {
        name: "Test",
        mounted() {
            axios.get('/api/test').then(response => {
                if(response.data === '') {
                router.push('/auth/login');
                } else{
                    console.log(response.data);
                }
            })
        }
    }
</script>

<style scoped>

</style>
