<template>
    <div>
        <div v-if="getLoader" class="flex items-center justify-center" style="height:100vh !important">
        <img height="60" width="60" :src="spinnerGif" alt="loading">
    </div>
    
    <div v-else class="flex justify-center items-center h-screen">
        <div class="flex flex-col gap-4 max-w-[500px] w-full px-4 md:px-0">
            <div class="flex !justify-start !sm:justify-center">
                <img :src="nidhi_logo" alt="nidhi_logo" class="max-w-[25%] h-auto">
            </div>
            <div class="primary-color text-xl text-center md:text-left">
                The central dashboard for your {{ $store.state.brokerName }} account
            </div>

            <div class="mt-4 flex justify-center md:justify-start">
                <button class="commonbtn " @click="login()">Login with {{ $store.state.brokerName }}</button>
            </div>
            <div class="text-center md:text-left">
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

        login(){
            window.location.href = `${this.$store.state.ssoRedirectionUrl}?appcode=${this.$store.state.myAppCode}`;
        }
    },
    created() {
            if (this.$route.query.authCode) {
                this.$store.dispatch("auth/getData", this.$route.query.authCode);
            }    
           
    },
}
</script>

