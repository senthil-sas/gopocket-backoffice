<template>
    <div>
        <div class="mb-4 primary-color !font-bold text-sm">
            Link a sub-account
        </div>

        <div class="flex w-full gap-10">
            <form @submit.prevent="handleSubmit()">
                <div class="my-4 flex items-center gap-5 flex-wrap">
                    <div>
                        <div class="primary-color text-sm mb-1">Sub-account's Client ID</div>
                        <div>
                            <input type="text" name="subClientId" id="subClientId" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="subClientId"/>
                         </div>
                    </div>
                </div>

                <div class="my-4 flex items-center gap-5 flex-wrap">
                    <div>
                        <div class="primary-color text-sm mb-1">Sub-account's PAN</div>
                        <div>
                            <input type="text" name="subClientPan" id="subClientPan" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="subClientPan"/>
                         </div>
                    </div>
                </div>

                <div class="my-4 flex items-center gap-5 flex-wrap">
                    <div >
                        <div class="primary-color text-sm mb-1">Sub-account's Mobile No</div>
                        <div>
                            <input type="text" name="subClientMobileNo" id="subClientMobileNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="subClientMobileNo"/>
                        </div>
                    </div>
                </div>

                <p class="bg-violet-200 leading-6 primary-color !font-semibold text-sm rounded-md p-4 my-8">
                    A Verification link will be sent to the sub-account's registered mobile number. <br>
                    If your family member does not have a {{ $store.state.brokerName }} account, you can refer them to open one.
                </p>
            
                <div class="my-10 flex gap-3">
                    <button type="button" class="cancelbtn" @click="backToHome()">Cancel</button>
                    <button type="submit" class="commonbtn">Submit</button>
                </div>
            </form>

            <!-- <div class="px-8 my-4">
                <p class="primary-color text-sm mb-6 leading-6">* A Verification link will be sent to the sub-account's registered mobile number. <br>
                If your family member does not have a {{ $store.state.brokerName }} account, you can refer them to open one.</p>
            </div> -->
        </div>
    </div>
</template>

<script>
import icon from '../../components/utilComponents/icons.vue'
import { Switch } from '@headlessui/vue'
export default {
    components: { icon, Switch },
    data() {
        return {
            subClientId: '',
            subClientPan: '',
            subClientMobileNo: ''
        }
    },
    methods: {
        backToHome() {
            this.$store.commit('subAcc/setIsAddSubAcc', false)
        },
        handleSubmit() {

        }
    },
}
</script>