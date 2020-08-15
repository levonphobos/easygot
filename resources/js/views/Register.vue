<template>
    <div>
        <BackBtn></BackBtn>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <form @submit.prevent="register">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" v-model.trim="$v.name.$model"
                                   class="form-control" :class="{'is-invalid':$v.name.$error,
                                   'is-valid':!$v.name.$invalid}" id="name">
                            <div class="invalid-feedback">
                                <span v-if="formError">{{formError.name[0]}}</span>
                                <span v-if="!$v.name.required">Name is required</span>
                                <span v-if="!$v.name.alpha">Name must contain only alphabet letters</span>
                                <span v-if="!$v.name.minLength">Name must have at least 2 letters</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" v-model.trim="$v.email.$model"
                                   class="form-control" :class="{'is-invalid':$v.email.$error,
                                   'is-valid':!$v.email.$invalid}" id="email">
                            <small class="text-danger" v-if="emailError">{{emailError.errorEmail}}</small>
                            <div class="invalid-feedback">
                                <span v-if="formError">{{formError.email[0]}}</span>
                                <span v-if="!$v.email.required">Email is required</span>
                                <span v-if="!$v.email.email">This email is wrong</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="category">Choose Profile Category</label>
                            <select class="form-control" :class="{'is-invalid':$v.category.$error,
                                   'is-valid':!$v.category.$invalid}" v-model.trim="$v.category.$model" id="category">
                                <option value="" selected disabled hidden></option>
                                <option value="actor">Actor</option>
                                <option value="musician">Musician</option>
                                <option value="painter">Painter</option>
                                <option value="sculptor">Sculptor</option>
                                <option value="producer">Producer</option>
                                <option value="hotels">Hotels</option>
                            </select>
                            <div class="invalid-feedback">
                                <span v-if="formError">{{formError.category[0]}}</span>
                                <span v-if="!$v.category.required">Category is required</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model.trim="$v.password.$model"
                                   class="form-control" :class="{'is-invalid':$v.password.$error,
                                   'is-valid':!$v.password.$invalid}" id="password">
                            <div class="invalid-feedback">
                                <span v-if="formError">{{formError.password[0]}}</span>
                                <span v-if="!$v.password.required">Password is required</span>
                                <span v-if="!$v.password.minLength">8 characters minimum</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" v-model.trim="$v.confirm_password.$model"
                                   class="form-control" :class="{'is-invalid':$v.confirm_password.$error,
                                   'is-valid': (password !== '') ? !$v.confirm_password.$invalid : ''}"
                                   id="confirm_password">
                            <div class="invalid-feedback">
                                <span v-if="!$v.confirm_password.sameAsPassword">Passwords must be identical</span>
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <label for="photo" class="btn btn-info text-white">Profile Picture</label>
                            <input type="file" @change="previewPhoto" class="form-control d-none"
                                   :class="{'is-invalid':$v.photo.$error}" id="photo">
                            <div class="invalid-feedback">
                                <span v-if="formError">{{formError.photo[0]}}</span>
                                <span v-if="!$v.photo.required">Profile picture is required</span>
                            </div>
                            <img v-if="previewImg" :src="previewImg" alt="Your Image"
                                 class="img-thumbnail float-right prevImg"/>
                        </div>
                        <button type="submit" class="btn btn-success float-right mt-1" :disabled="loading">Register
                            <div v-if="loading" class="spinner-grow spinner-grow-sm ml-1" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import BackBtn from "../components/BackBtn";
    import {required, minLength, email, sameAs, alpha} from 'vuelidate/lib/validators';
    import {mapGetters} from "vuex";

    export default {
        name: "Register",
        data() {
            return {
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                category: '',
                photo: null,
                previewImg: null
            }
        },

        validations: {
            name: {
                required,
                minLength: minLength(2),
                alpha
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            },
            confirm_password: {
                sameAsPassword: sameAs('password')
            },
            category: {
                required
            },
            photo: {
                required
            }
        },

        components: {BackBtn},

        methods: {
            register() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.commit('User/loadingChange');
                    let form = new FormData;
                    form.append('name', this.name);
                    form.append('email', this.email);
                    form.append('category', this.category);
                    form.append('password', this.password);
                    form.append('photo', this.photo);
                    this.$store.dispatch('User/register', form);
                }
            },

            previewPhoto(e) {
                this.photo = e.target.files[0];
                let fileReader = new FileReader();
                fileReader.onload = e => {
                    this.previewImg = String(e.target.result);
                };
                fileReader.readAsDataURL(e.target.files[0]);
            }
        },

        computed: {
            ...mapGetters({
                formError: 'User/invalidForm',
                emailError: 'User/invalidEmail',
                loading:'User/getLoading'
            })
        },
    }
</script>
