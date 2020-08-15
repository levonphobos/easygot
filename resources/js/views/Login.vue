<template>
    <div>
        <BackBtn></BackBtn>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <form @submit.prevent="login()">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input v-model.trim="$v.email.$model" type="email" class="form-control" :class="{'is-invalid':$v.email.$error,
                                   'is-valid':!$v.email.$invalid}" id="email">
                            <div class="invalid-feedback">
                                <span v-if="!$v.email.required">Email is required</span>
                                <span v-if="!$v.email.email">Wrong Email Format</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pass">Password</label>
                            <input v-model.trim="$v.password.$model" type="password" class="form-control" :class="{'is-invalid':$v.password.$error,
                                   'is-valid':!$v.password.$invalid}" id="pass">
                            <small class="text-danger" v-if="formError">{{formError.errorLogin}}</small>
                            <div class="invalid-feedback">
                                <span v-if="!$v.password.required">Password is required</span>
                                <span v-if="!$v.password.minLength">8 characters minimum</span>
                            </div>
                        </div>
                        <router-link to="/auth/register">Create Account</router-link>
                        <button type="submit" class="btn btn-primary float-right" :disabled="loading">Login
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
    import {mapGetters} from "vuex";
    import {email, minLength, required} from "vuelidate/lib/validators";

    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null
            }
        },

        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            },
        },

        components: {BackBtn},

        methods: {
            login() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.commit('User/loadingChange');
                    let loginData = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('User/login', loginData);
                }
            }
        },

        computed: {
            ...mapGetters({
                formError: 'User/invalidForm',
                loading:'User/getLoading'
            })
        },
    }
</script>
