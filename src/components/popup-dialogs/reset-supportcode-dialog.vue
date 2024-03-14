<template>
    <TransitionRoot as="template" :show="getIsResetSupportCode">
      <Dialog as="div" class="relative z-10" @close="closeDialog()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
           
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <form @submit.prevent="verify()">
                    <div class="primary-color border-b pb-2 text-lg font-bold">
                        Reset Support code
                    </div>

                    <div class="text-sm primary-color my-4">
                        Verify OTP on :
                    </div>

                    <div class="text-sm secondary-color my-4">
                        <fieldset class="mt-4">
                          <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                            <div v-for="radio in radioButtons" :key="radio.id" class="flex items-center">
                              <input v-model="verifyType" :id="radio.id" type="radio" :value="radio.id" class="h-4 w-4 border-gray-300 cursor-pointer" />
                              <label :for="radio.id" class="ml-1 block text-xs font-medium leading-6 text-gray-900 cursor-pointer">{{ radio.title }}</label>
                            </div>
                          </div>
                        </fieldset>
                    </div>

                    <div class="mt-6 flex gap-3 justify-end">
                        <button type="button" class="cancelbtn" @click="closeDialog()">Cancel</button>
                        <button type="submit" class="commonbtn">Submit</button>
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
import { mapGetters } from 'vuex'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
export default {
    components: { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, CheckIcon },
    data() {
        return {
            radioButtons: [
                { id: 'email', title: 'E-mail' },
                { id: 'sms', title: 'Mobile (SMS)' },
            ],
            verifyType: 'email'
        }
    },
    computed: {
        ...mapGetters('popup', ['getIsResetSupportCode'])
    },
    methods: {
        closeDialog() {
            this.$store.commit('popup/setIsResetSupportCode', false)
        },
        verify() {
            this.closeDialog();
            let type = ''
            if(this.verifyType == 'email') {
                type = 'Email'
            } else {
                type = 'SMS'
            }
            this.$store.commit('popup/setIsOtpVerify', true)
            this.$store.commit('popup/setVerificationType', type)
        }
    },
}
</script>