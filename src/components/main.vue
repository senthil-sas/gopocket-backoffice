<template>
    <div>
        <div class="h-screen !overflow-hidden">
            <headerComp class="fixed top-0"/>
            <div class="flex  w-full relative  border border-r-[1px]">
                <sidebar class="h-[calc(100vh-74px)]  w-[350px] sidebar overflow-y-auto " v-if="$store.state.windowWidth >= 1200" :isBox="true"/>
                <box class="min-h-[calc(100vh-74px)] border-l-[1px]" :class="{ 'w-[calc(100vw-349px)]' : $store.state.windowWidth >= 1200, 'w-full' : $store.state.windowWidth < 1200}"><RouterView /></box>
            </div>
        </div>

        <reset_supportcode_dialog v-if="getIsResetSupportCode"/>
        <otp_verification_dialog v-if="getIsOtpVerify"/>
        <email_or_mobile_otp_dialog v-if="getIsEmailOrMobileUpdate" />
        <newEmailOrMobileDialog  v-if="getisNewEmailOrNewMobileUpdate" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import headerComp from './header.vue'
import sidebar from './sidebar.vue'
import box from './utilComponents/box.vue'
import reset_supportcode_dialog from './popup-dialogs/reset-supportcode-dialog.vue'
import otp_verification_dialog from './popup-dialogs/otp-verification-dialog.vue'
import email_or_mobile_otp_dialog from './popup-dialogs/email-or-mobile-update-dialog.vue'
import newEmailOrMobileDialog  from './popup-dialogs/new-email-or-mobile-dialog.vue'
export default {
    components:{ headerComp, sidebar, box,newEmailOrMobileDialog , reset_supportcode_dialog, otp_verification_dialog, email_or_mobile_otp_dialog },
    computed: {
        ...mapGetters('popup', ['getIsResetSupportCode', 'getIsEmailVerify','getIsOtpVerify','getIsEmailOrMobileUpdate','getisNewEmailOrNewMobileUpdate']),
        ...mapGetters('auth', ['getUserId'])
    },
    created() {
        let userId = this.getUserId
        this.$store.dispatch('profile/getProfileDataFromApi', userId)
    },
}
</script>