<template>
    <v-app-bar color="#970747" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-btn text to="/"><v-toolbar-title>WANTEDLY</v-toolbar-title></v-btn>
        
        <v-spacer></v-spacer>
        <v-btn text to="/signup">sign up</v-btn>
        <v-btn text to="/login">login</v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'Header',
    };
</script>

<style>

</style>