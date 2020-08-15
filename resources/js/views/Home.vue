<template>
    <div>
        <Header></Header>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import {mapGetters} from "vuex";
    export default {
        name: "Home",
        components: {Header}
    }
</script>
