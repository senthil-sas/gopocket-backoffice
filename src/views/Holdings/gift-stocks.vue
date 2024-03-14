<template>
    <div :class="{'h-[calc(100vh-96px)] overflow-y-auto': !getIsGiftSelect }">
        <div class="p-5" v-if="!getIsGiftSelect">
        <div class="mb-4 primary-color !font-bold text-sm">
            Send a Gift
        </div>

        <div class="flex w-full gap-10 ">
            <form @submit.prevent="handleSubmit()">
                <div class="my-4 flex items-center gap-5 flex-wrap">
                    <div>
                        <div class="primary-color text-sm mb-1">Recipient's Name</div>
                        <div>
                            <input type="text" name="recipientsName" id="recipientsName" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="recipientsName"/>
                         </div>
                    </div>
                </div>

                <div class="my-4 flex items-center gap-5 flex-wrap">
                    <div>
                        <div class="primary-color text-sm mb-1">Recipient's Mobile No</div>
                        <div>
                            <input type="text" name="recipientsMobileNo" id="recipientsMobileNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="recipientsMobileNo"/>
                         </div>
                    </div>
                </div>

                <div class="my-4 flex items-center gap-5 flex-wrap">
                    <div >
                        <div class="primary-color text-sm mb-1">Recipient's Email</div>
                        <div>
                            <input type="text" name="recipientsEmail" id="recipientsEmail" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="recipientsEmail"/>
                        </div>
                    </div>
                </div>
            
                <div class="my-10 flex justify-end gap-3">
                    <button type="submit" class="commonbtn">Continue</button>
                </div>
            </form>

            <div class="px-8 my-4">
                <span class="primary-color text-sm">Gift your loveable ones with your favourite stocks. </span>
                <ol class="my-3 max-w-[600px]">
                    <li class="secondary-color text-sm my-2 leading-6">1. Choose the instruments you want to gift from your portfolio. Access the list of approved securities.</li>
                    <li class="secondary-color text-sm my-2 leading-6">2. They log into their Nidhi account to accept the gift.</li>
                    <li class="secondary-color text-sm my-2 leading-6">3. If they don’t have an account, they can create an Account and then accept the gift later.</li>
                    <li class="secondary-color text-sm my-2 leading-6">4. We notify you of the acceptance and you authorize moving securities to the recipient’s demat.</li>
                </ol>
            </div>
        </div>
        </div>
        <gift_stocks_select v-if="getIsGiftSelect" />
    </div>
</template>

<script>
import icon from '../../components/utilComponents/icons.vue'
import { Switch } from '@headlessui/vue'
import { mapGetters } from 'vuex'
import gift_stocks_select from './gift-stocks-select.vue'
export default {
    components: { icon, Switch, gift_stocks_select },
    data() {
        return {
            recipientsName: '',
            recipientsMobileNo: '',
            recipientsEmail: ''
        }
    },
    computed: {
        ...mapGetters('giftStocks',['getIsGiftSelect'])
    },
    methods: {
        
        handleSubmit() {
            let json = {
                recipientsName : this.recipientsName,
                recipientsMobileNo : this.recipientsMobileNo,
                recipientsEmail: this.recipientsEmail
            }
            this.$store.commit('giftStocks/setRecipientsData', json)
        }
    },
}
</script>