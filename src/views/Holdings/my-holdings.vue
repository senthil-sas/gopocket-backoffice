<template>
    <div class="h-[calc(100vh-96px)] overflow-y-auto">
     <!-- <holdings_widget /> -->
        <table id="holdings_table" class="w-full rounded-b border-t border-[#ededed] dark:border-[#232325] relative mt-[1px]">
        <thead class="border-b dark:border-[#232325] dark:bg-[#181818]">
            <tr>
                <th v-for="(head,id) in tableHeads" :key="id" scope="col" :class="head.class" class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap" id="holdings_th_instrument"> {{head.name}}</th>
            </tr>
        </thead>
                    
        <tbody>
            <tr v-for="(item, id) in getHoldingsData" :key="id" class="border-b">
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{ item.tradingSymbol }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ item.qty }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ item.buy_avg }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ item.buy_value }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ item.present_value  }}</td>
                <!-- <td class="pr-3 py-4 text-sm relative text-right" :class="{'green-color' : Number(item.pnl) > 0, 'red-color' : Number(item.pnl) < 0, 'primary-color' : Number(item.pnl) == 0}">{{ netPnlCalc(item)?.toFixed(2) }}</td> -->
                <td class="pr-3 py-4 text-sm relative text-right">{{ item.pnl }}</td>
                <td class="pr-3 py-4 text-sm relative text-right">{{ item.pnl_change }}</td>
               <!-- <td class="px-3 py-4 text-sm relative text-right" :class="{'green-color' : Number(item.pnl_change) > 0, 'red-color' : Number(item.pnl_change) < 0, 'primary-color' : Number(item.pnlChg) == 0}">{{ netChgCalc(item) }}%</td> -->
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import holdings_widget from './holding-widget.vue'
import { mapGetters } from 'vuex';
import commonjs from '../../mixins/common'
export default {
    mixins:[commonjs],
    components: { holdings_widget } ,
    data() {
        return {
            
            tableHeads: [
                { name: 'Instrument', class: 'text-left'},
                { name: 'Qty.', class: 'text-right'},
                { name: 'Buy Avg.', class: 'text-right'},
                { name: 'Buy value', class: 'text-right'},
                { name: 'Present value', class: 'text-right'},
                { name: 'P&L', class: 'text-right'},
                { name: 'P&L chg.', class: 'text-right'}
            ],
        }
    },
    computed: {
        ...mapGetters('holdings', ['getHoldingsData'])

    },
    methods: {
        
    },
    async created() {
        this.$store.dispatch('holdings/getHoldingsFromApi')
    },
}
</script>