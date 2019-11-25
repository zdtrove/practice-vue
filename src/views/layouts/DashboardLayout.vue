<template>
    <div>
        <Header />
        <v-content>
            <slot />
        </v-content>
        <Footer />
    </div>
</template>

<script>
    import Header from '../../components/header';
    import Footer from '../../components/footer';
    export default {
        name: 'DashboardLayout',
        components: {
            Header,
            Footer
        }
    };
</script>