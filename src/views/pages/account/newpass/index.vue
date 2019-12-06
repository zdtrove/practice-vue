<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" class="pt-12">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>{{ $t('newpassTitle') }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="validForm">
                            <v-alert color="success" :value="success">
                                {{ successMsg }}
                                <v-icon class="iconDelete" @click="success = !success">delete</v-icon>
                            </v-alert>
                            <v-alert color="error" :value="error">
                                {{ errorMsg }}
                                <v-icon class="iconDelete" @click="error = !error">delete</v-icon>
                            </v-alert>
                            <v-text-field 
                                v-model="password" 
                                :label="$t('signup.passwordPlaceholder')" 
                                name="password" 
                                prepend-icon="lock" 
                                type="password" 
                                :rules="[rules.required, rules.min]"
                            />
                            <v-text-field 
                                v-model="password_confirmation" 
                                :label="$t('signup.passwordConfirmPlaceholder')" 
                                name="password" 
                                prepend-icon="lock" 
                                type="password"
                                :rules="[rules.required, rules.min, matchPasword]"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" small @click.prevent="createNewPass()" :disabled="!validForm">{{ $t('newpassSendButton') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <Loading v-if="loading" />
    </v-container>
</template>

<script>
    import DashboardLayout from '../../../layouts/DashboardLayout';
    import Loading from '../../../../components/loading';
    import { TIMEOUT_MESSAGE } from '../../../../constants';
    export default {
        name: 'newpass',
        components: {
            Loading
        },
        data: (data) => ({
            loading: false,
            validForm: true,
            password: '',
            password_confirmation: '',
            params: '',
            error: false,
            errorMsg: '',
            success: false,
            successMsg: '',
            rules: {
                required: value => !!value || data.$t('login.errors.required'),
                min: value => value.length >= 6 || data.$t('signup.errors.minPass')
            }
        }),
        methods: {
            createNewPass() {
                this.loading = true;
                this.$store.dispatch("CREATE_NEW_PASSWORD", {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    type: 'profile',
                    email: this.params.email,
                    token_confirm: this.params.token,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
                .then((result) => {
                    this.loading = false;
                    this.successMsg = result.data.message;
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, TIMEOUT_MESSAGE);
                })
                .catch((error) => {
                    this.loading = false;
                    this.errorMsg = error.data.error.message;
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, TIMEOUT_MESSAGE);
                });
            }
        },
        computed: {
            matchPasword() {
                return () => (this.password === this.password_confirmation) || this.$t('signup.errors.matchPass');
            }
        },
        created() {
            this.$emit(`update:layout`, DashboardLayout);
        },
        mounted() {
            let ref = this;
            ref.params = ref.$route.query;
        }
    }
</script>