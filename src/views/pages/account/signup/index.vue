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
                            <v-alert color="error" :value="error">
                                <p v-for="(err, index) in errorMsg" v-bind:key="index">{{ err[0] }}</p>
                                <v-icon class="iconDelete" @click="error = !error">delete</v-icon>
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
                                v-model="password_confirmation"
                                :label="$t('signup.passwordConfirmPlaceholder')" 
                                name="password_confirmation" 
                                prepend-icon="lock" 
                                type="password"
                                :rules="[rules.required, rules.min, matchPasword]"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" small @click.prevent="signup()" :disabled="!validForm">{{ $t('signup.signupButton') }}</v-btn>
                        <v-btn v-if="social_list.includes('facebook')" color="#4267b2" dark small id="signupFb" @click.prevent="signupFb()">{{ $t('signup.signupButtonFacebook') }}</v-btn>
                        <v-btn v-if="social_list.includes('google')" color="#4285F4" dark small id="signupGg">{{ $t('signup.signupButtonGoogle') }}</v-btn>
                        <v-btn v-if="social_list.includes('uuid')" color="#0078d4" dark small id="signupMs">{{ $t('signup.signupButtonMicrosoft') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <Loading v-if="loading" />
    </v-container>
</template>

<script>
    import DashboardLayout from '../../../layouts/DashboardLayout';
    import Loading from '../../../../components/loading';
    import { TIMEOUT_MESSAGE, GOOGLE_ID, MICROSOFT_CONFIG, SOCIAL_LIST } from '../../../../constants';
    export default {
        name: 'SignupPage',
        components: {
            Loading
        },
        data: (data) => ({
            loading: false,
            validForm: true,
            success: false,
            successMsg: '',
            error: false,
            errorMsg: '',
            email: '',
            password: '',
            password_confirmation: '',
            social_list: SOCIAL_LIST,
            rules: {
                required: value => !!value || data.$t('signup.errors.required'),
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                    return pattern.test(value) || data.$t('signup.errors.emailError');
                },
                min: value => value.length >= 6 || data.$t('signup.errors.minPass')
            }
        }),
        computed: {
            matchPasword() {
                return () => (this.password === this.password_confirmation) || this.$t('signup.errors.matchPass');
            }
        },
        methods: {
            signup() {
                this.loading = true;
                this.$store.dispatch("SIGNUP", {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    type: 'profile',
                    register_type: 'email',
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    name: 'My Profile'
                })
                .then((result) => {
                    this.loading = false;
                    this.successMsg = result.data.message;
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, TIMEOUT_MESSAGE);
                })
                .catch((error) => {
                    this.loading = false;
                    this.errorMsg = error.data.error.message;
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, TIMEOUT_MESSAGE);
                });
            },
            async signupFb() {
                if (this.$store.getters.isLoggedIn) {
                    this.$router.push('/profile');
                } else {
                    window.FB.login(response => {
                        this.loading = true;
                        if (response.authResponse) {
                            window.FB.api('/me', 'GET', { fields: 'id,name,email' }, user => {
                                this.$store.dispatch("SIGNUP_SOCIAL", {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                    },
                                    type: 'profile',
                                    register_type: 'facebook',
                                    facebook: user.id,
                                    email: user.email,
                                    name: user.name,
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
                            });
                        }
                    });
                }
            }
        },
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        },
        mounted() {
            /* GOOGLE SIGNUP */
            let ref = this;
            window.gapi.load('auth2', () => {
                window.auth2 = window.gapi.auth2.init({
                    client_id: GOOGLE_ID
                });
                window.auth2.attachClickHandler(document.getElementById('signupGg'), {}, googleUser => {
                    ref.loading = true;
                    ref.$store.dispatch("SIGNUP_SOCIAL", {
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        type: 'profile',
                        register_type: 'google',
                        google: googleUser.getBasicProfile().getId(),
                        email: googleUser.getBasicProfile().getEmail(),
                        name: googleUser.getBasicProfile().getName(),
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

            /* MICROSOFT SIGNUP */
            let msObj = new window.Msal.UserAgentApplication(MICROSOFT_CONFIG);
            document.getElementById('signupMs').addEventListener('click', function() {
                msObj.acquireTokenPopup({ scopes: ["user.read"] }).then(function (msUser) {
                    console.log(msUser);
                    ref.loading = true;
                    let uuid = msUser.uniqueId.replace(/-/g, '');
                    ref.$store.dispatch("SIGNUP_SOCIAL", {
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        type: 'profile',
                        register_type: 'uuid',
                        uuid: uuid.replace(/^0+/, ''),
                        email: msUser.account.userName,
                        name: msUser.account.name,
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