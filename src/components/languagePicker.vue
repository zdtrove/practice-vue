<template>
    <div id="languagePicker">
        <img src="../assets/images/en.png" @click="changeLanguage(languages[0])" class="en" />
        <img src="../assets/images/vi.png" @click="changeLanguage(languages[1])" />
    </div>
</template>
<script>
    export default {
        name: 'languagePicker',
        data() {
            return {
                languages: [
                    {
                      value: 'en'
                    },
                    {
                      value: 'vi'
                    }
                ]
            };
        },
        methods: {
            changeLanguage(lang) {
                this.$i18n.locale = lang.value;
                this.$store.dispatch('language/setLanguage', lang.value);
            }
        }
    };
</script>

<style>
    .en { margin-right: 15px; }
</style>