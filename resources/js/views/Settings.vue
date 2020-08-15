<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6 shadow mb-5 bg-white rounded mt-3 pt-1 pb-1">
                <form>
                    <img v-if="img === this.getUser.data.photo" :src="`http://127.0.0.1:8000/storage/uploads/${img}`"
                         class="img-thumbnail"
                         alt="Avatar" width="60">
                    <img v-if="img !== this.getUser.data.photo" :src="img"
                         class="img-thumbnail"
                         alt="Avatar" width="60">
                    <label for="img-edit" class="btn btn-link float-right mt-3"><i
                        class="fas fa-pencil-alt"></i></label>
                    <input @change="changeImage" type="file" id="img-edit" class="d-none">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Settings",
        data() {
            return {
                img: null,
                imgFile: null
            }
        },

        mounted() {
            this.img = this.getUser.data.photo;
        },

        computed: {
            ...mapGetters({
                getUser: 'User/getUser'
            })
        },

        methods: {
            formData() {
                let data = new FormData;
                data.append('id', this.getUser.data.id);
                data.append('photo', this.imgFile);
                this.$store.dispatch('User/updateImage', data)
            },

            changeImage(e) {
                this.imgFile = e.target.files[0];
                let fileReader = new FileReader();
                fileReader.onload = e => {
                    this.img = String(e.target.result);
                };
                fileReader.readAsDataURL(e.target.files[0]);
                this.formData();
            }
        }
    }
</script>

<style scoped>

</style>
