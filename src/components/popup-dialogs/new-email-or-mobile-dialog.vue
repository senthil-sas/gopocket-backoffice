<template>
    <TransitionRoot as="template" :show="getisNewEmailOrNewMobileUpdate">
      <Dialog as="div" class="relative z-10" @close="closeDialog()">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6"
              >
                <form @submit.prevent="verify">
                  <div class="mb-6">
                    <img :src="brokerImg" alt="image" class="h-6 pr-4 max-w-[104px]" />
                  </div>
                 <div   v-if="getUpdateType === 'mobile'">
                  <div class="primary-color border-b pb-2 text-[14px]">
                    Enter New Mobile
                  </div>
  
                  <div class="text-sm primary-color my-4 flex gap-3 ">
                    <input
                     
                      type="text"
                      maxlength="10"
                      v-model="NewMobile"
                      class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter the Number"
                    />
                <button class="commonbtn">Continue</button>
                </div>
                <div class="text-red-500 text-xs h-3">{{ errorMessage }}</div>
</div>
                  <div  v-if="getUpdateType === 'email'">
                  <div class="primary-color border-b pb-2 text-[14px]">
                    Enter New Email
                  </div>
  
                  <div class="text-sm primary-color my-4 flex gap-3">
                    <input
                      type="text"
                      name="emailId"
                      v-model="NewEmail"
                      class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter the Email"
                    />
                    <button class="commonbtn">Continue</button>

                </div>
                  <div class="text-red-500 text-xs h-3">{{ errorMessage }}</div>
</div>
                
  
  
                  <div v-if="isVerified">
                    <div class="text-sm primary-color my-4 flex gap-3">
                      <input
                        type="text"
                        maxlength="6"
                        v-model="otp"
                        class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter the OTP"
                      />
                      <button class="commonbtn" @click="validateOTP">Verify</button>
                    </div>
                    <div class="text-red-500 text-xs h-3">{{ otpErrorMessage }}</div>
  
                    <div class="mt-4 mb-10 text-xs border-t pt-2">
                      Didn't receive the OTP? <span class="text-blue-400 underline">Resend</span>
                    </div>
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
  import { mapGetters } from 'vuex';
  import brokerImg from '../../assets/images/client-logo.svg';
  
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
  // Import any other necessary components or icons
  
  export default {
    components: { Dialog, DialogPanel, TransitionChild, TransitionRoot },
    data() {
      return {
        otp: '',
        NewMobile: '',
        NewEmail: '',
        errorMessage: '',
        verifyType: 'email',
        brokerImg,
        isVerified: false,
        otpErrorMessage: '',
      };
    },
    computed: {
      ...mapGetters('popup', ['getisNewEmailOrNewMobileUpdate', 'getUpdateType', 'getVerificationType']),
    },
    methods: {
      closeDialog() {
            this.$store.commit('popup/setisNewEmailOrNewMobileUpdate', false)
        },      
      verify() {
        this.errorMessage = '';
  
        if (this.getUpdateType === 'mobile') {
          if (!this.NewMobile) {
            this.errorMessage = 'Please enter a mobile number.';
            return;
          } else if (!/^\d{10}$/.test(this.NewMobile)) {
            this.errorMessage = 'Please enter a valid 10-digit mobile number.';
            return;
          }
        } else if (this.getUpdateType === 'email') {
          if (!this.NewEmail) {
            this.errorMessage = 'Please enter an email address.';
            return;
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.NewEmail)) {
            this.errorMessage = 'Please enter a valid email address.';
            return;
          }
        }
  
        this.isVerified = true;
      },
      validateOTP() {
        if (this.otp.trim() === '') {
          this.otpErrorMessage = 'Please enter the OTP.';
          return;
        } else if (!/^\d{6}$/.test(this.otp.trim())) {
          this.otpErrorMessage = 'Please enter a valid 6-digit OTP.';
          return;

        }else {
        this.errorMessage = ''; // Clear error message when OTP is valid
        this.$store.commit('popup/setisNewEmailOrNewMobileUpdate', false)
        
    }
  
        // Additional validation if needed
  
        // Process verification
  
      },
    },
  };
  </script>
  
  <style>
  /* Add any necessary styles */
  </style>
  