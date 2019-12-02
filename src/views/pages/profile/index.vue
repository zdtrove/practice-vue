<template>
    <div>User Profile</div>
</template>

<script>
    import DashboardLayout from '../../layouts/DashboardLayout';
    export default {
        name: 'profile',
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        }
    };
</script>