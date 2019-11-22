<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <slot />
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: 'LoginOrSignupLayout'
    };
</script>

<style>

</style>