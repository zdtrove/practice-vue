<template>
    <v-app>
        <component :is="layout">
            <router-view :layout.sync="layout" />
        </component>
    </v-app>
</template>

<script>
    import '../public/assets/scss/style.scss';
    import '../public/assets/css/style.css';
    import { FACEBOOK_ID } from './constants';
    export default {
        name: "App",
        data() {
            return {
                layout: `div`
            };
        },
        created() {
            if (this.$store.getters.isLoggedIn) {
                this.$router.push('profile');
            }
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: FACEBOOK_ID,
                    autoLogAppEvents : true,
                    xfbml: true,
                    version: 'v5.0',
                    cookie: true
                });
            };
        }
    };
</script>