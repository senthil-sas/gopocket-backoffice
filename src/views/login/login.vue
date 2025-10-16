<template>
    <div>
        <div class="text-red-500 text-base text-center mt-4">{{ getErrorMessage }}</div>
        <div v-if="getLoader" class="flex items-center justify-center" style="height:100vh !important">
        <img height="60" width="60" :src="spinnerGif" alt="loading">
        </div>

        <div v-else class="flex justify-center items-center h-screen">
            <div class="flex flex-col gap-4 max-w-[500px]">
                <div>
                    <img :src="client_logo" alt="client_logo" class="max-w-[25%] h-auto">
                </div>
                <div class="primary-color text-xl">
                    The central dashboard for your {{ $store.state.brokerName }} account
                </div>

                <div class="mt-4">
                    <button class="commonbtn" @click="login()">Login with {{ $store.state.brokerName }}</button>
                </div>
                <div>
                    <span class="secondary-color text-xs">Don't have an account? <a class="text-blue-500" :href="$store.state.ekycLink" target="_blank">Sign up</a></span>
                </div>
            </div>
        </div>
    </div>  
</template>
<script>
import spinnerGif from "../../assets/images/spinner.gif"
import client_logo from '../../assets/images/client-logo.svg'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            spinnerGif,
            client_logo
        }
    },
    computed: {
        ...mapGetters('auth',['getLoader', 'getErrorMessage'])
    },
    methods: {
        login() {
            window.location.href = `${this.$store.state.ssoRedirectionUrl}?appcode=${this.$store.state.myAppCode}`;
        }
    },
    created() {
        if ((this.$route.query.authCode || this.$route.query.authcode) && this.$route.query.userId) {
            let authcode = this.$route.query.authCode || this.$route.query.authcode
            const clientid = this.$route.query.userId
            this.isParamAvil = true;
            this.$store.dispatch("auth/getData", { vendor: this.$route.query.appcode, authCode: this.$route.query.authCode, });
        } 
        else if (this.$route.query.logout) { 

        } 
        else {
            this.login();
        }
    },
}
</script>

