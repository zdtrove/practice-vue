<template>
    <div>
        <v-app-bar color="primary" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-btn text to="/"><v-toolbar-title>WANTEDLY</v-toolbar-title></v-btn>
            <v-spacer></v-spacer>
            <v-btn text><LanguagePicker /></v-btn>
            <v-btn v-if="!isLoggedIn" text to="/signup">{{ $t('headerSignUp') }}</v-btn>
            <v-btn v-if="!isLoggedIn" text to="/login">{{ $t('headerLogin') }}</v-btn>
            <v-btn v-if="isLoggedIn" @click="logout()" text>{{ $t('headerLogout') }}</v-btn>
            <v-btn v-if="isLoggedIn" to="/profile" text>Profile</v-btn>
        </v-app-bar>
        <Loading v-if="loading" />
        <v-snackbar v-model="snackbar" :timeout="timeout" color="error" top="top">
            {{ errorMsg }}
            <v-btn text @click="snackbar = false">{{ $t('logout.close') }}</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import LanguagePicker from '../../components/languagepicker';
    import Loading from '../../components/loading';
    import { TIMEOUT_MESSAGE } from '../../constants';
    export default {
        name: 'Header',
        components: {
            LanguagePicker,
            Loading
        },
        data: () => ({
            loading: false,
            snackbar: false,
            errorMsg: '',
            timeout: TIMEOUT_MESSAGE
        }),
        methods: {
            logout: function() {
                this.loading = true;
                this.$store.dispatch("LOGOUT", {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(() => {
                    this.loading = false;
                    this.$router.push('login');
                })
                .catch(error => {
                    this.loading = false;
                    this.errorMsg = error.data.error.message;
                    this.snackbar = true;
                    if (error.data.error.code === 401) {
                        this.$store.dispatch("LOGOUT_EXPIRED")
                        .then(() => {
                            this.$router.push('login');
                        });
                    }
                });
            }
        },
        computed : {
            isLoggedIn : function() { return this.$store.getters.isLoggedIn }
        }
    };
</script>