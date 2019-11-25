<template>
    <v-content>
        <v-container class="fill-height loginsignuplayout" fluid>
            <v-row align="center" justify="center">
                <languagePicker />
                <slot />
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    import LanguagePicker from '../../components/languagepicker';
    export default {
        name: 'LoginOrSignupLayout',
        components: {
            LanguagePicker
        }
    };
</script>