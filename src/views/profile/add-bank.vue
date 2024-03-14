<template>
    <div>
        <div class="mb-4 primary-color !font-bold text-sm">
            Enter your bank account details
        </div>

        <form @submit.prevent="handleSubmit()">
            <!-- <div class="my-6">
                <div class="primary-color text-sm mb-1">Select bank account type</div>
                <fieldset class="mt-4">
                  <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    <div v-for="account in accountTypes" :key="account.id" class="flex items-center">
                      <input v-model="accountType" :value="account.title" :id="account.id" name="notification-method" type="radio" class="h-4 w-4 border-gray-300 accent-[#753ED7] cursor-pointer" />
                      <label :for="account.id" class="ml-3 block text-sm font-medium leading-6 text-gray-900 cursor-pointer">{{ account.title }}</label>
                    </div>
                  </div>
                </fieldset>
            </div> -->

            <div class="my-4 flex items-center gap-5 flex-wrap">
                <div>
                    <div class="primary-color text-sm mb-1">Bank IFSC Code</div>
                    <div>
                        <input type="text" name="ifscCode" id="ifscCode" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="ifscCode"/>
                     </div>
                     <div class="secondary-color text-xs mt-1 ml-1">STATE BANK OF INDIA, VELLAKOIL, ERODE</div>
                </div>
                <div>
                    <div class="primary-color text-sm mb-1">Bank’s MICR Code</div>
                    <div>
                        <input type="text" name="micrCode" id="micrCode" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="micrCode"/>
                     </div>
                     <div class="h-5"></div>
                </div>
            </div>

            <div class="my-4 flex items-center gap-5 flex-wrap">
                <div >
                    <div class="primary-color text-sm mb-1">Enter your account number</div>
                    <div>
                        <input type="text" name="accountNo" id="accountNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="accountNo"/>
                    </div>
                </div>

                <div>
                    <div class="primary-color text-sm mb-1">Re-enter your account number</div>
                    <div>
                        <input type="text" name="reAccountNo" id="reAccountNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="reAccountNo"/>
                    </div>
                </div>
            </div>

            <div class="my-8 flex items-center gap-10" >
                <div class="flex flex-col gap-3">
                        <span class="primary-color text-sm">Make this my Primary bank account</span>
                        <div class="secondary-color text-xs">It will be for both trading and demat accounts</div>
                    </div>
                <Switch v-model="isPrimaryAcc" :class="[isPrimaryAcc ? 'violet-bg' : 'bg-gray-200', 'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out']">
                    <span aria-hidden="true" :class="[isPrimaryAcc ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                </Switch>
            </div>
            
            <div class="my-10 flex gap-3">
                <button type="button" class="cancelbtn" @click="backToBankDetails()">Cancel</button>
                <button type="submit" class="commonbtn">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import icon from '../../components/utilComponents/icons.vue'
import { Switch } from '@headlessui/vue'
export default {
    components: { icon, Switch },
    data() {
        return {
            accountNo: '',
            reAccountNo: '',
            ifscCode: 'SBIN0004272',
            micrCode: '',
            accountTypes : [
                { id: 'Savings', title: 'Savings' },
                { id: 'Current', title: 'Current' },
            ],
            accountType: 'Savings',
            isPrimaryAcc: false
        }
    },
    methods: {
        backToBankDetails() {
            this.$store.commit('bankDetails/setIsAddBank', false)
        },
        handleSubmit() {

        }
    },
    watch: {
        
    }
}
</script>