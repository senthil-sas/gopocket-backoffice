<template>
    <div>
      <TransitionRoot appear :show="getIsPasswordPDF" as="template">
        <Dialog as="div" class="relative z-10">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
  
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden radius4rem p-6 text-left align-middle bg-white">
                  <DialogTitle as="h3" class="text-base pb-2 font-medium leading-6 primaryColor">
                    <div v-if=isNomineepass>
                        <p class="text-[18px] primaryColor">Nominee File Password</p>
                        <div>
                        <div
                            class="relative h-10 radius4rem border flex items-center mt-4 shadow-sm"
                        >
                            <input
                            :type="passHide == 'Show' ? 'password' : 'text'"
                            v-model="nom_password"
                            name="nom_password"
                            autocomplete="off"
                            :autofocus="true"
                            
                            class="focus:outline-none px-4"
                            placeholder="Password"
                            />
                            <div @click="hideShow()" class="absolute inset-y-0 right-3 flex items-center pl-3 cursor-pointer z-50">
                                    <svg v-if="passHide == 'Show'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div v-if=isGuardianPass>
                        <p class="text-[18px] primaryColor">Guardian File Password</p>
                        <div>
                          <div
                              class="relative h-10 radius4rem border flex items-center mt-4 shadow-sm"
                          >
                              <input
                              :type="passHide == 'Show' ? 'password' : 'text'"
                              v-model="guard_password"
                              name="guard_password"
                              autocomplete="off"
                              :autofocus="true"
                              
                              class="focus:outline-none px-4"
                              placeholder="Password"
                              />
                              <div @click="hideShow()" class="absolute inset-y-0 right-3 flex items-center pl-3 cursor-pointer z-50">
                                      <svg v-if="passHide == 'Show'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                          stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                          stroke="currentColor" class="w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                      </svg>
                                  </div>
                          </div>
                        </div>
                    </div>
                  </DialogTitle>
  
                  <div class="mt-8 flex justify-end">
                    <button type="button"
                    class="border-[#753ED7] border text-[#753ED7] px-4 h-10 radius4rem min-widthBtn mr-2 outline-none"
                    @click="closeDialog()"
                      >
                      Cancel
                    </button>
                    <button type="button" @click="passwordConfirm()" class="primaryBtnColor border-[#753ED7] px-4 h-10 radius4rem min-widthBtn text-white btnCommon whitespace-nowrap outline-none"
                     >
                      Confirm
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </template>
  
  
  <script>
  import { mapGetters, mapState } from "vuex";
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/vue";
  export default {
    data() {
      return {
        passHide:'Show'
      }
    },
    methods: {
        hideShow() {
            this.passHide = this.passHide == 'Show' ? 'Hide' : 'Show'
        },
        closeDialog(){
            this.$store.commit('nominee/setIsPasswordPDF', false)
            this.$store.commit("nominee/setNomineepassword", '')
        },
        passwordConfirm(){
            if(this.nom_password || this.guard_password){
                this.$store.commit('nominee/setIsPasswordPDF', false)
            }
        }
    },
    computed: {
        ...mapGetters('nominee',["getIsPasswordPDF", "getNomineePassword", "getGuardianpassword"]),
        ...mapState('nominee', ["isNomineepass", "isGuardianPass"]),

        nom_password: {
            get() {
                return this.getNomineePassword;
            },
            set(val) {
                this.$store.commit("nominee/setNomineepassword", val);
            },
        },
        guard_password: {
            get() {
                return this.getGuardianpassword;
            },
            set(val) {
                this.$store.commit("nominee/setGuardianpassword", val);
            },
        },
    },
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogPanel,
      DialogTitle
    },
  }
  
  </script>