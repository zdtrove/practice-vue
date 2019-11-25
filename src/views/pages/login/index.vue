<template>
    <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t('login.titleForm') }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-text-field :label="$t('login.usernamePlaceholder')" name="login" prepend-icon="person" type="text" />
                    <v-text-field id="password" :label="$t('login.passwordPlaceholder')" name="password" prepend-icon="lock" type="password"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary">{{ $t('login.loginButton') }}</v-btn>
                <v-btn color="primary" to="/signup">{{ $t('login.signupButton') }}</v-btn>
                <v-btn color="primary" to="/">{{ $t('login.cancelButton') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    import LoginOrSignupLayout from '../../layouts/LoginOrSignupLayout';
    export default {
        name: 'LoginPage',
        created() {
            this.$emit(`update:layout`, LoginOrSignupLayout);
        }
    };
</script>