<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn float-right mr-3 mb-4" data-toggle="modal" data-target="#exampleModal">
            <i class="fas fa-plus h3 text-success"></i>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create New Post</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createPost">

                        <div class="modal-body">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input v-model.trim="$v.title.$model" type="text" class="form-control" :class="{'is-invalid':$v.title.$error,
                                   'is-valid':!$v.title.$invalid}" id="title">
                                <div class="invalid-feedback">
                                    <span v-if="!$v.title.required">Title is required</span>
                                    <span v-if="!$v.title.maxLength">12 characters maximum</span>
                                    <span v-if="!$v.title.minLength">2 characters minimum</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="context">Context</label>
                                <textarea placeholder="Maximum 250 symbols" v-model.trim="$v.content.$model"
                                          class="form-control" :class="{'is-invalid':$v.content.$error,
                                   'is-valid':!$v.content.$invalid}" id="context" rows="5">

                                </textarea>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.content.required">Context is required</span>
                                    <span v-if="!$v.content.maxLength">250 characters maximum</span>
                                </div>
                            </div>
                            <p>Type of post</p>
                            <div class="form-check d-inline">
                                <input v-model.trim="$v.type.$model" class="form-check-input" type="radio"
                                       name="exampleRadios" id="exampleRadios1"
                                       :class="{'is-invalid':$v.type.$error,
                                   'is-valid':!$v.type.$invalid}" value="suggest">
                                <label class="form-check-label text-dark" for="exampleRadios1">
                                    Suggest
                                </label>
                            </div>
                            <div class="form-check d-inline">
                                <input v-model.trim="$v.type.$model" class="form-check-input" type="radio"
                                       name="exampleRadios" id="exampleRadios2"
                                       :class="{'is-invalid':$v.type.$error,
                                   'is-valid':!$v.type.$invalid}" value="proposal">
                                <label class="form-check-label text-dark" for="exampleRadios2">
                                    Proposal
                                </label>
                                <div class="invalid-feedback">
                                    <span v-if="!$v.type.required">Type of post is required</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {minLength, maxLength, required} from "vuelidate/lib/validators";
    import {mapGetters} from 'vuex';

    export default {
        name: "AddPost",
        data() {
            return {
                title: null,
                content: null,
                type: null
            }
        },

        validations: {
            title: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(12)
            },
            content: {
                required,
                maxLength: maxLength(250)
            },
            type: {
                required
            },
        },
        props: ['user'],

        methods: {
            createPost() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    $('#exampleModal').modal('hide');
                    let postData = {
                        title: this.title,
                        context: this.content,
                        type: this.type,
                        user_id: this.user.id
                    }
                    this.$store.dispatch('Post/createPost', postData);
                    this.title = null;
                    this.content = null;
                    this.type = null;
                    this.$v.$reset();
                }
            }
        },

        computed: {
            ...mapGetters({
            })
        }
    }
</script>

<style scoped>

</style>
