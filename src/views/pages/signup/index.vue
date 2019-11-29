<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" class="pt-12">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>{{ $t('signup.titleForm') }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="validForm">
                            <v-alert color="success" :value="success">
                                {{ successMsg }}
                                <v-icon class="iconDelete" @click="success = !success">delete</v-icon>
                            </v-alert>
                            <v-alert color="success" :value="successFb">
                                {{ successFbMsg }}
                                <v-icon class="iconDelete" @click="successFb = !successFb">delete</v-icon>
                            </v-alert>
                            <v-alert color="error" :value="error">
                                <p v-for="(err, index) in errorMsg" v-bind:key="index">{{ err[0] }}</p>
                                <v-icon class="iconDelete" @click="error = !error">delete</v-icon>
                            </v-alert>
                            <v-alert color="error" :value="errorFb">
                                <p v-for="(err, index) in errorFbMsg" v-bind:key="index">{{ err[0] }}</p>
                                <v-icon class="iconDelete" @click="errorFb = !errorFb">delete</v-icon>
                            </v-alert>
                            <v-text-field 
                                v-model="email"
                                :label="$t('signup.usernamePlaceholder')" 
                                name="username" 
                                prepend-icon="person" 
                                type="email" 
                                :rules="[rules.required, rules.email]"
                            />
                            <v-text-field 
                                v-model="password"
                                :label="$t('signup.passwordPlaceholder')" 
                                name="password" prepend-icon="lock" 
                                type="password"
                                :rules="[rules.required, rules.min]"
                            />
                            <v-text-field 
                                v-model="password_confirm"
                                :label="$t('signup.passwordConfirmPlaceholder')" 
                                name="password_confirm" 
                                prepend-icon="lock" 
                                type="password"
                                :rules="[rules.required, rules.min, matchPasword]"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" small @click.prevent="signup()" :disabled="!validForm">{{ $t('signup.signupButton') }}</v-btn>
                        <v-btn color="primary" small @click="fbSignup">{{ $t('signup.signupButtonFacebook') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DashboardLayout from '../../layouts/DashboardLayout';
    export default {
        name: 'SignupPage',
        data: (data) => ({
            validForm: true,
            success: false,
            successMsg: '',
            successFb: false,
            successFbMsg: '',
            error: false,
            errorMsg: '',
            errorFb: false,
            errorFbMsg: '',
            rules: {
                required: value => !!value || data.$t('signup.errors.required'),
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                    return pattern.test(value) || data.$t('signup.errors.emailError');
                },
                min: value => value.length >= 6 || data.$t('signup.errors.minPass')
            },
            email: '',
            password: '',
            password_confirm: ''
        }),
        computed: {
            matchPasword() {
                return () => (this.password === this.password_confirm) || this.$t('signup.errors.matchPass');
            },
        },
        methods: {
            fbSignup() {
                new Promise(() => {
                    window.FB.login(response => {
                        if (response.authResponse) {
                            window.FB.api('/me', 'GET', { fields: 'id,name,email' }, user => {
                                this.$store.dispatch("SIGNUP_FACEBOOK", {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                    },
                                    type: 'profile',
                                    register_type: 'facebook',
                                    facebook: user.id,
                                    email: user.email,
                                    name: user.name,
                                    azure_token: response.authResponse.accessToken
                                }).then(result => {
                                    console.log(result);
                                    console.log('register success');
                                    this.successFb = true;
                                    this.successFbMsg = result.data.message;
                                })
                                .catch((error) => {
                                    console.log(error);
                                    console.log('register error');
                                    this.errorFb = true;
                                    this.errorFbMsg = error.data.error.message;
                                });
                            });
                        }
                    });
                });
            },
            signup() {
                this.$store.dispatch("SIGNUP", {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    type: 'profile',
                    register_type: 'email',
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirm,
                    name: 'My Profile'
                })
                .then((result) => {
                    this.success = true;
                    this.successMsg = result.data.message;
                })
                .catch((error) => {
                    this.errorMsg = error.data.error.message;
                    this.error = true;
                });
            }
        },
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        }
    };
</script>