<template>
    <div>
      <TransitionRoot appear :show="getnomineedialog" as="template">
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
                    <p class="text-[18px] primaryColor">Delete Bank</p>
                    <p class="text-sm secondaryColor pt-4">Are you sure you want to delete this Bank?</p>
                  </DialogTitle>
  
                  <div class="mt-8 flex justify-end">
                    <button type="button"
                    class="border-[#753ED7] border text-[#753ED7] px-4 h-10 radius4rem mr-2 outline-none min-widthBtn"
                      @click="$store.commit('nominee/setnomineedialog', false );">
                      Cancel
                    </button>
                    <button type="button" class="primaryBtnColor border-[#753ED7] min-widthBtn px-4 h-10 radius4rem text-white commonbtn whitespace-nowrap outline-none"
                      @click="deleteNominee" 
                      >
                      <spinner v-if="getdeleteloader"/><span v-else>Continue</span>
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
  import { mapGetters } from "vuex";
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
        
      }
    },
    methods: {
      deleteNominee(){
        this.$store.dispatch("nominee/deleteNominee", this.deletenomineeId);
        this.$store.commit('nominee/setnomineedialog', false);
      }
    },
    computed: {
      ...mapGetters('nominee', ["getnomineedialog",]),
      ...mapGetters('nominee', ['getdeleteloader']),

    },
  
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogPanel,
      DialogTitle,
    },
  }
  
  </script>