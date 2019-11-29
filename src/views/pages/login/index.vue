<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" class="pt-12">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>{{ $t('login.titleForm') }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="validForm">
                            <v-alert color="error" :value="error">
                                {{ errorMsg }}
                                <v-icon class="iconDelete" @click="error = !error">delete</v-icon>
                            </v-alert>
                            <v-alert color="error" :value="errorFb">
                                {{ errorFbMsg }}
                                <v-icon class="iconDelete" @click="errorFb = !errorFb">delete</v-icon>
                            </v-alert>
                            <v-text-field 
                                v-model="email" 
                                :label="$t('login.usernamePlaceholder')" 
                                name="login" 
                                prepend-icon="person" 
                                type="email" 
                                :rules="[rules.required, rules.email]"
                            />
                            <v-text-field 
                                v-model="password" 
                                :label="$t('login.passwordPlaceholder')" 
                                name="password" 
                                prepend-icon="lock" 
                                type="password"
                                :rules="[rules.required]"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" small @click.prevent="login()" :disabled="!validForm">{{ $t('login.loginButton') }}</v-btn>
                        <v-btn color="primary" small @click.prevent="loginFb()">{{ $t('login.loginButtonFacebook') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DashboardLayout from '../../layouts/DashboardLayout';
    export default {
        name: 'LoginPage',
        data: (data) => ({
            validForm: true,
            error: false,
            errorMsg: '',
            errorFb: false,
            errorFbMsg: '',
            rules: {
                required: value => !!value || data.$t('login.errors.required'),
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                    return pattern.test(value) || data.$t('login.errors.emailError');
                }
            },
            email: '',
            password: ''
        }),
        methods: {
            login() {
                this.$store.dispatch("LOGIN", {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    type: 'profile',
                    login_type: 'email',
                    email: this.email,
                    password: this.password
                })
                .then(() => {
                    this.$router.push('/searchjob');
                })
                .catch(error => {
                    this.error = true;
                    this.errorMsg = error.data.error.message;
                    console.log(this.error);
                    console.log(this.errorMsg);
                });
            },
            loginFb() {
                new Promise(() => {
                    window.FB.login(response => {
                        if (response.authResponse) {
                            window.FB.api('/me', 'GET', { fields: 'id,name,email' }, user => {
                                this.$store.dispatch("LOGIN_FACEBOOK", {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                    },
                                    type: 'profile',
                                    login_type: 'facebook',
                                    facebook: user.id,
                                    email: user.email,
                                    name: user.name,
                                    azure_token: response.authResponse.accessToken
                                }).then(() => {
                                    this.$router.push('/profile');
                                })
                                .catch((error) => {
                                    console.log(error);
                                    console.log('login error');
                                    this.errorFb = true;
                                    this.errorFbMsg = error.data.error.message;
                                });
                            });
                        }
                    });
                });
            }
        },
        created() {
            this.$emit(`update:layout`, DashboardLayout);
            if (this.$store.getters.isLoggedIn) {
                this.$router.push('/profile');
            }
        }
    };
</script>