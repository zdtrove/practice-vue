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
    export default {
        name: "App",
        data() {
            return {
                layout: `div`
            };
        }
    };
</script>