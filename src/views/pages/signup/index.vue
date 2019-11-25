<template>
    <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t('signup.titleForm') }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-text-field :label="$t('signup.usernamePlaceholder')" name="username" prepend-icon="person" type="text" />
                    <v-text-field id="password" :label="$t('signup.passwordPlaceholder')" name="password" prepend-icon="lock" type="password"/>
                    <v-text-field id="password_confirm" :label="$t('signup.passwordConfirmPlaceholder')" name="password_confirm" prepend-icon="lock" type="password"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary">{{ $t('signup.signupButton') }}</v-btn>
                <v-btn color="primary" to="/">{{ $t('signup.cancelButton') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    import LoginOrSignupLayout from '../../layouts/LoginOrSignupLayout';
    export default {
        name: 'SignupPage',
        created() {
            this.$emit(`update:layout`, LoginOrSignupLayout);
        }
    };
</script>