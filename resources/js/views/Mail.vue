<template>
    <div>
        <button class="btn btn-primary m-5" @click="sendMail">Send Mail</button>
        <button class="btn btn-primary m-5" @click="sendSms">Send SMS</button>
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
            },

            sendSms(){
                axios.get('/api/send/sms').then(response => {
                    console.log(response);
                })
            }
        }
    }
</script>

<style scoped>

</style>
