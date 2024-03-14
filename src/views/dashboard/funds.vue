<template>
    <div class="p-5">
        <div class="w-full flex flex-wrap">
            <div class="w-[50%]">
                <div>
                    <span class="primary-color !font-bold">Equity</span> 
                    <span class="secondary-color text-xs mx-2">( Updated on <span>2023-07-06</span> )</span>
                </div>

                <div class="max-w-[350px] my-8">
                    <!-- <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Account Value</div>
                        <div class="primary-color text-sm">0.00</div> 
                    </div> -->

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Cash balance</div>
                        <div class="primary-color text-sm">0.00</div> 
                    </div>
                    
                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Unsettled credits</div>   
                        <div class="primary-color text-sm">0.00</div> 
                    </div>

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Payin</div>   
                        <div class="primary-color text-sm">0.00</div> 
                    </div>

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Colleteral utilised</div>   
                        <div class="primary-color text-sm">0.00</div> 
                    </div>

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="violet-color text-sm">Withdrawable balance</div>   
                        <div class="violet-color text-2xl">0.00</div> 
                    </div>

                    <div class="flex gap-4 w-full py-4">
                        <input placeholder="Amount to withdraw" type="text" name="withdrawAmount" id="withdrawAmount" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="withdrawAmountCom"/>
                        <button class="commonbtn" >Continue</button>
                    </div>
                </div>
            </div>

            <div class="w-[50%]"> 
                <span class="primary-color !font-bold">Commodity</span>
                <span class="secondary-color text-xs mx-2">( Updated on <span>2023-07-06</span> )</span>

                <div class="max-w-[350px] my-8">
                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Account Value</div>
                        <div class="primary-color text-sm">0.00</div> 
                    </div>

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Cash balance</div>
                        <div class="primary-color text-sm">0.00</div> 
                    </div>
                    
                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Unsettled credits</div>   
                        <div class="primary-color text-sm">0.00</div> 
                    </div>

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Payin</div>   
                        <div class="primary-color text-sm">0.00</div> 
                    </div>

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="secondary-color text-sm">Colleteral utilised</div>   
                        <div class="primary-color text-sm">0.00</div> 
                    </div>

                    <div class="flex items-center justify-between gap-10 my-4">
                        <div class="violet-color text-sm">Withdrawable balance</div>   
                        <div class="violet-color text-2xl">0.00</div> 
                    </div>

                    <div class="flex gap-4 w-full py-4">
                        <input placeholder="Amount to withdraw" type="text" name="withdrawAmount" id="withdrawAmount" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="withdrawAmount"/>
                        <button class="commonbtn" >Continue</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Recent Transactions -->
        <button @click="viewRecentTransactions()">
            <span class="flex items-center gap-2" >
                <span class="text-blue-400 hover:text-blue-600">Recent Transactions</span> 
                <icon name="upArrow" height="16" width="16" v-if="isShowRecentTrans"/> 
                <icon name="downArrow" height="16" width="16" v-if="!isShowRecentTrans"/>
            </span>
        </button>

        <div v-if="isShowRecentTrans">
            <transactions_table />
        </div>
    </div>
</template>

<script>
import icon from '../../components/utilComponents/icons.vue'
import transactions_table from './transactions-table.vue'
export default {
    components: { icon, transactions_table },
    data() {
        return {
            withdrawAmount:'',
            withdrawAmountCom: '',
            isShowRecentTrans: false
        }
    },
    methods: {
        viewRecentTransactions() {
            this.isShowRecentTrans = !this.isShowRecentTrans
        }
    },
    created() {
        this.$store.dispatch('funds/getWithdrawFromApi')
    },
}
</script>