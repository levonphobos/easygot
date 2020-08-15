<template>
    <button type="button" @click="routeBack" class="btn btn-link mt-2 ml-4">
        <i class="fas fa-chevron-left"></i> Back
    </button>
</template>

<script>
    import router from "../router/router";

    export default {
        name: "BackBtn",
        methods:{
            routeBack(){
                router.go(-1);
            }
        }
    }
</script>
