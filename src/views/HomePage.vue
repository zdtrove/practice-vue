<template>
    <v-container>
        <v-row>
            <div class="wrapp">
                <h1 class="title">{{ $t('homepage') }}</h1>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    import DashboardLayout from '../views/layouts/DashboardLayout';
    import '../assets/scss/style.scss';
    export default {
        name: 'homepage',
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        }
    }
</script>

<style scoped>
    
</style>