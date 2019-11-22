<template>
    <v-container>
        <v-row>
            <Tasks />
        </v-row>
    </v-container>
</template>

<script>
    import DashboardLayout from '../views/layouts/DashboardLayout';
    import Tasks from '../components/Tasks/Tasks';
    export default {
        name: 'app',
        components: {
            Tasks
        },
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        }
    }
</script>

<style>

</style>