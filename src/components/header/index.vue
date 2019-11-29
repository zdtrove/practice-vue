<template>
    <v-app-bar color="#970747" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-btn text to="/"><v-toolbar-title>WANTEDLY</v-toolbar-title></v-btn>
        <v-spacer></v-spacer>
        <v-btn text><LanguagePicker /></v-btn>
        <v-btn v-if="!this.$store.getters.isLoggedIn" text to="/signup">{{ $t('headerSignUp') }}</v-btn>
        <v-btn v-if="!this.$store.getters.isLoggedIn" text to="/login">{{ $t('headerLogin') }}</v-btn>
    </v-app-bar>
</template>

<script>
    import LanguagePicker from '../../components/languagepicker';
    export default {
        name: 'Header',
        components: {
            LanguagePicker
        },
    };
</script>