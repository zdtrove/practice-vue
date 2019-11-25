<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <languagePicker />
                <slot />
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    import languagePicker from '../../components/languagePicker';
    export default {
        name: 'LoginOrSignupLayout',
        components: {
            languagePicker
        }
    };
</script>

<style scoped>
    #languagePicker {
        position: fixed;
        top: 30px;
        right: 30px;
    }
</style>