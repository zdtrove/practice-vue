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
                            <v-alert color="success" :value="success">
                                {{ successMsg }}
                                <v-icon class="iconDelete" @click="success = !success">delete</v-icon>
                            </v-alert>
                            <v-alert color="error" :value="error">
                                {{ errorMsg }}
                                <v-icon class="iconDelete" @click="error = !error">delete</v-icon>
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
                                :rules="[rules.required, rules.min]"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-dialog v-model="dialog" persistent max-width="640">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on" small>{{ $t('dialog.forgetPassword') }}</v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="headline">{{ $t('dialog.forgetPassword') }}</v-card-title>
                                <v-card-text>
                                    <v-form onSubmit="return false;" v-model="validFormDialog">
                                        <v-text-field 
                                            v-model="emailPw" 
                                            :label="$t('login.usernamePlaceholder')" 
                                            name="forgetPw" 
                                            prepend-icon="person" 
                                            type="email" 
                                            :rules="[rules.required, rules.email]"
                                        />
                                    </v-form>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" text @click.prevent="forgetPw()" :disabled="!validFormDialog">{{ $t('dialog.send') }}</v-btn>
                                    <v-btn color="green darken-1" text @click.prevent="dialog = false">{{ $t('dialog.close') }}</v-btn>
                                    </v-card-actions>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                        <v-btn color="primary" small @click.prevent="login()" :disabled="!validForm">{{ $t('login.loginButton') }}</v-btn>
                        <v-btn v-if="social_list.includes('facebook')" color="#4267b2" dark small @click.prevent="loginFb()">{{ $t('login.loginButtonFacebook') }}</v-btn>
                        <v-btn v-if="social_list.includes('google')" color="#4285F4" dark small id="loginGg">{{ $t('login.loginButtonGoogle') }}</v-btn>
                        <v-btn v-if="social_list.includes('uuid')" color="#0078d4" dark small id="loginMs">{{ $t('login.loginButtonMicrosoft') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <Loading v-if="loading" />
        <v-snackbar v-model="isActive.status" :timeout="timeout" color="success" top="top">
            {{ isActive.message }}
            <v-btn text @click="isActive.status = false">{{ $t('logout.close') }}</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import DashboardLayout from '../../../layouts/DashboardLayout';
    import Loading from '../../../../components/loading';
    import { TIMEOUT_MESSAGE, GOOGLE_ID, MICROSOFT_CONFIG, SOCIAL_LIST } from '../../../../constants';
    export default {
        name: 'LoginPage',
        components: {
            Loading
        },
        data: (data) => ({
            snackbar: false,
            dialog: false,
            loading: false,
            validForm: true,
            validFormDialog: true,
            error: false,
            errorMsg: '',
            email: '',
            emailPw: '',
            password: '',
            social_list: SOCIAL_LIST,
            success: false,
            successMsg: '',
            timeout: TIMEOUT_MESSAGE,
            rules: {
                required: value => !!value || data.$t('login.errors.required'),
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                    return pattern.test(value) || data.$t('login.errors.emailError');
                },
                min: value => value.length >= 6 || data.$t('signup.errors.minPass')
            }
        }),
        methods: {
            login() {
                this.loading = true;
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
                    this.loading = false;
                    this.$router.push('/profile');
                })
                .catch(error => {
                    this.loading = false;
                    this.errorMsg = error.data.error.message;
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, TIMEOUT_MESSAGE);
                });
            },
            loginFb() {
                window.FB.login(response => {
                    this.loading = true;
                    if (response.authResponse) {
                        this.$store.dispatch("LOGIN", {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                            },
                            type: 'profile',
                            login_type: 'facebook',
                            azure_token: response.authResponse.accessToken
                        }).then(() => {
                            this.loading = false;
                            this.$router.push('/profile');
                        })
                        .catch(error => {
                            this.loading = false;
                            this.errorMsg = error.data.error.message;
                            this.error = true;
                            setTimeout(() => {
                                this.error = false;
                            }, TIMEOUT_MESSAGE);
                        });
                    }
                });
            },
            forgetPw() {
                this.dialog = false;
                this.loading = true;
                this.$store.dispatch("FORGET_PASSWORD", {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    type: 'profile',
                    email: this.emailPw
                })
                .then((result) => {
                    this.loading = false;
                    this.success = true;
                    this.successMsg = result.data.message;
                    setTimeout(() => {
                        this.success = false;
                    }, TIMEOUT_MESSAGE);
                })
                .catch(error => {
                    this.loading = false;
                    this.errorMsg = error.data.error.message;
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, TIMEOUT_MESSAGE);
                });
            }
        },
        computed : {
            isActive : function() { return this.$store.getters.isActive }
        },
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        },
        mounted() {
            /* GOOGLE LOGIN */
            let ref = this;
            window.gapi.load('auth2', () => {
                window.auth2 = window.gapi.auth2.init({
                    client_id: GOOGLE_ID
                });
                window.auth2.attachClickHandler(document.getElementById('loginGg'), {}, googleUser => {
                    ref.loading = true;
                    ref.$store.dispatch("LOGIN", {
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        type: 'profile',
                        login_type: 'google',
                        azure_token: googleUser.getAuthResponse('access_token').access_token
                    }).then(() => {
                        ref.loading = false;
                        ref.$router.push('/profile');
                    })
                    .catch(error => {
                        ref.loading = false;
                        ref.errorMsg = error.data.error.message;
                        ref.error = true;
                        setTimeout(() => {
                            ref.error = false;
                        }, TIMEOUT_MESSAGE);
                    });
                });
            });
            /* MICROSOFT LOGIN */
            let msObj = new window.Msal.UserAgentApplication(MICROSOFT_CONFIG);
            document.getElementById('loginMs').addEventListener('click', function() {
                msObj.acquireTokenPopup({ scopes: ["user.read"] }).then(function (msUser) {
                    ref.loading = true;
                    ref.$store.dispatch("LOGIN", {
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        type: 'profile',
                        login_type: 'uuid',
                        azure_token: msUser.accessToken
                    })
                    .then(() => {
                        ref.loading = false;
                        ref.$router.push('/profile');
                    })
                    .catch(error => {
                        ref.loading = false;
                        ref.errorMsg = error.data.error.message;
                        ref.error = true;
                        setTimeout(() => {
                            ref.error = false;
                        }, TIMEOUT_MESSAGE);
                    });
                });
            });
        }
    };
</script>