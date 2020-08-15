<template>
    <div>
        <button class="btn btn-primary m-5" @click="sendMail">Send Mail</button>
    </div>
</template>

<script>
    export default {
        name: "Mail",

        methods:{
            sendMail(){
                axios.get('/api/send/mail').then(response => {
                    console.log(response);
                })
            }
        }
    }
</script>

<style scoped>

</style>
