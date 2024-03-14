<template>
    <div>
        <div v-if="getLoader" class="flex items-center justify-center" style="height:100vh !important">
        <img height="60" width="60" :src="spinnerGif" alt="loading">
        </div>

        <div v-else class="flex justify-center items-center h-screen">
            <div class="flex flex-col gap-4 max-w-[500px]">
                <div>
                    <img :src="nidhi_logo" alt="nidhi_logo" class="max-w-[25%] h-auto">
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
import nidhi_logo from '../../assets/images/client-logo.svg'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            spinnerGif,
            nidhi_logo
        }
    },
    computed: {
        ...mapGetters('auth',['getLoader'])
    },
    methods: {
        login() {
            window.location.href = `${this.$store.state.ssoRedirectionUrl}?appcode=${this.$store.state.myAppCode}`;
        }
    },
    created() {
        if (this.$store.state.sessionId && this.$store.state.userId) {
            this.$router.push('dashboard').catch(() => { })
        } else {
            if (this.$route.query.authCode) {
                this.isParamAvil = true
                this.$store.dispatch("auth/getData", this.$route.query.authCode);
            } else if (this.$route.query.logout) {

            } 
            // auto redirect
            // else {
            //     this.login();
            // }
        }
    },
}
</script>

