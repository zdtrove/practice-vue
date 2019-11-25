<template>
    <v-app-bar color="#970747" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-btn text to="/"><v-toolbar-title>WANTEDLY</v-toolbar-title></v-btn>
        <v-spacer></v-spacer>
        <v-btn text><languagePicker /></v-btn>
        <v-btn text to="/tasks">{{ $t('headerApi') }}</v-btn>
        <v-btn text to="/signup">{{ $t('headerSignUp') }}</v-btn>
        <v-btn text to="/login">{{ $t('headerLogin') }}</v-btn>
    </v-app-bar>
</template>

<script>
    import languagePicker from '../components/languagePicker.vue';
    export default {
        name: 'Header',
        components: {
            languagePicker
        },
    };
</script>

<style>

</style>