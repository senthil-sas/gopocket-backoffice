<template>
    <TransitionRoot as="template" :show="getIsOtpVerify">
      <Dialog as="div" class="relative z-10" @close="closeDialog()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <form @submit.prevent="verify()">
                    <div class="mb-6">
                        <img :src="brokerImg" alt="image" class="max-w-[30%]">
                    </div>

                    <div class="primary-color border-b pb-2 text-lg font-bold">
                        {{ getVerificationType }} verification
                    </div>

                    <div class="text-sm primary-color my-4 flex gap-3">
                       <input type="text" maxlength="6" v-model="otp" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter the OTP">
                       <button class="commonbtn">Verify</button>
                    </div>

                    <div class="mt-4 mb-10 text-xs border-t pt-2">
                        Didn't receive the OTP? <span class="text-blue-400 underline">Resend</span>
                    </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
<script>
import brokerImg from '../../assets/images/client-logo.svg'
import { mapGetters } from 'vuex'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
export default {
    components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, CheckIcon },
    data() {
        return {
            otp: '',
            brokerImg,
        }
    },
    computed: {
        ...mapGetters('popup', ['getIsOtpVerify', 'getVerificationType'])
    },
    methods: {
        closeDialog() {
            this.$store.commit('popup/setIsOtpVerify', false)
        },
        verify() {
          if(this.getVerificationType == 'Email') {

          } else {

          }
        }
    },
}
</script>