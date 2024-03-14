<!-- <template>
    <div class="p-5">
        <linechart />
    </div>
</template>

<script>
import linechart from '../../components/charts/line.vue'
export default {
    components: { linechart},
}
</script> -->

<template>
    <div class="p-5">
        <div class="primary-color mb-6">
           Hi {{ userName }} ,
        </div>
        <div class="w-full flex flex-wrap">
            <div class="w-[50%]">
                <div>
                    <span class="primary-color !font-bold">Equity</span> 
                    <span class="secondary-color text-xs mx-2">( Updated on <span>2023-07-06</span> )</span>
                </div>



                <div class="flex justify-between flex-wrap max-w-[300px] my-8">
                    <div class="flex flex-col flex-wrap">
                        <div class="secondary-color mb-1 text-xs">Account value</div>
                        <div class="primary-color">{{ accountValue }}</div>
                    </div>

                    <div class="flex-col flex">
                        <div class="flex flex-col flex-wrap">
                            <div class="flex items-center space-x-2 mb-1">
                                <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                <span class="text-xs secondary-color">Equity holdings</span>
                            </div>
                            <div class="primary-color ml-4">{{ equityHoldings }}</div>
                        </div>

                        <div class="flex flex-col flex-wrap pt-4">
                            <div class="flex items-center space-x-2 mb-1">
                                <div class="h-2 w-2 bg-yellow-500 rounded-full"></div>
                                <span class="text-xs secondary-color">Cash balance</span>
                            </div>
                            <div class="primary-color ml-4">{{ cashBalance }}</div>
                        </div>
                    </div>
                </div>



            </div>

            <div class="w-[50%]"> 
                <span class="primary-color !font-bold">Commodity</span>
                <span class="secondary-color text-xs mx-2">( Updated on <span>2023-07-06</span> )</span>

                <div class="flex flex-col justify-center items-center gap-4 h-60">
                    <img class="max-w-[20%] h-auto" src="https://console.zerodha.com/static/images/no-account-value.svg" alt="no-data">
                    <div class="text-center primary-color">You don't have any funds here</div>
                    <button class="commonbtn">Add Funds</button>
                </div>
            </div>
        </div>


        <!-- Recent Transactions -->
        <button class="" @click="viewRecentTransactions()">
            <span class="flex items-center gap-2" >
                <span class="text-blue-400 hover:text-blue-600">Account value</span> 
                <icon name="upArrow" height="16" width="16" v-if="isShowRecentTrans"/> 
                <icon name="downArrow" height="16" width="16" v-if="!isShowRecentTrans"/>
            </span>
        </button>

        <div v-if="isShowRecentTrans">
            <!-- <transactions_table /> -->
            <div class="p-5">
                <linechart />

                <div class="flex items-center gap-2 mb-5 mt-10">
                    <div v-html="calendorSvg"></div>
                    <div>{{ getPriviousDay() }}</div>
                </div>
                <div class="flex gap-5">
                    <div class="flex flex-col flex-wrap">
                        <div class="secondary-color mb-1 text-sm">Account value</div>
                        <div class="primary-color">{{ accountValue }}</div>
                    </div>

                    <div class="flex flex-col flex-wrap">
                        <div class="secondary-color mb-1 text-sm">Holdings</div>
                        <div class="primary-color">{{ equityHoldings }}</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import icon from '../../components/utilComponents/icons.vue'
import transactions_table from './transactions-table.vue'
import linechart from '../../components/charts/line.vue'
const calendorSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
</svg>
`
export default {
    components: { icon, transactions_table, linechart },
    data() {
        return {
            withdrawAmount:'',
            isShowRecentTrans: false,
            userName: 'Senthilnathan',
            accountValue: '3.53k',
            equityHoldings: '3000',
            cashBalance: '8000',
            calendorSvg
        }
    },
    methods: {
        viewRecentTransactions() {
            this.isShowRecentTrans = !this.isShowRecentTrans
        },
        getPriviousDay() {
            // Create a new Date object for the current date
            const currentDate = new Date();

            // Subtract one day (in milliseconds) from the current date
            const yesterdayTimestamp = currentDate.getTime() - (24 * 60 * 60 * 1000);

            // Create a new Date object for yesterday's date
            const yesterdayDate = new Date(yesterdayTimestamp);

            // Define an array of month names
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            // Get the day, month, and year components from yesterday's date
            const day = yesterdayDate.getDate();
            const monthIndex = yesterdayDate.getMonth(); // 0-based index
            const year = yesterdayDate.getFullYear();

            // Format yesterday's date as "4 Sep 2023" (assuming today is 5 Sep 2023)
            const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

            return formattedDate;
        }
    },
}
</script>