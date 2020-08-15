<template>
    <div>
        <div class="d-flex align-items-center img-block">
            <BackBtn></BackBtn>
            <img class="img" v-if="" src="/images/error.jpg" alt="Page Not Found"/>
        </div>
    </div>
</template>

<script>
    import BackBtn from "../components/BackBtn";

    export default {
        name: "PageNotFound",
        components: {BackBtn}
    }
</script>

<style scoped>

</style>
