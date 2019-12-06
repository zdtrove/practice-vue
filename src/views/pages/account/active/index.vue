<template>
    <DashboardLayout>
        <Loading v-if="loading" />
    </DashboardLayout>
</template>

<script>
    import DashboardLayout from '../../../layouts/DashboardLayout';
    import Loading from '../../../../components/loading';
    import { TIMEOUT_MESSAGE } from '../../../../constants';
    export default {
        name: 'active',
        components: {
            DashboardLayout,
            Loading
        },
        data: () => ({
            loading: true,
            params: '',
            error: false,
            errorMsg: ''
        }),
        mounted() {
            let ref = this;
            ref.params = ref.$route.query;
            ref.$store.dispatch("ACTIVE_ACCOUNT", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                type: 'profile',
                email: ref.params.email,
                token_confirm: ref.params.token
            })
            .then(() => {
                ref.loading = false;
                ref.$router.push('/account/login');
            })
            .catch((error) => {
                ref.loading = false;
                ref.errorMsg = error.data.error.message;
                ref.error = true;
                setTimeout(() => {
                    ref.error = false;
                }, TIMEOUT_MESSAGE);
            });
        }
    }
</script>