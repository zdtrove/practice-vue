<template>
    <v-container>
        <v-row>
            <h1>Home Page</h1>
        </v-row>
    </v-container>
</template>

<script>
    import DashboardLayout from '../views/layouts/DashboardLayout';
    export default {
        name: 'homepage',
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        }
    }
</script>

<style>

</style>