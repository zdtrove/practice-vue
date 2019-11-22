<template>
    <LoginOrSignupLayout>
        <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Sign up form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Username" name="username" prepend-icon="person" type="text" />
                        <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password"/>
                        <v-text-field id="password_confirm" label="Password Confirm" name="password_confirm" prepend-icon="lock" type="password"/>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary">Sign up</v-btn>
                    <v-btn color="primary" to="/">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </LoginOrSignupLayout>
</template>

<script>
    import LoginOrSignupLayout from '../views/layouts/LoginOrSignupLayout';
    export default {
        name: "SignupPage",
        components: {
            LoginOrSignupLayout
        }
    };
</script>

<style>

</style>
