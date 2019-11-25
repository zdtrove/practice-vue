<template>
    <v-container>
        <v-row>
            <Tasks />
        </v-row>
    </v-container>
</template>

<script>
    import DashboardLayout from '../../layouts/DashboardLayout';
    import Tasks from '../../../components/tasks';
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