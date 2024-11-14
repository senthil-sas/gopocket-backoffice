<template>
    <div class="h-[calc(100vh-96px)] overflow-y-auto" v-if="!getLoader">
        <table id="positions_table" class="w-full rounded-b border-[#ededed] dark:border-[#232325] relative" v-if="getPositionData?.length > 0">
            <thead class="border-b dark:border-[#232325] dark:bg-[#181818]">
                <tr>
                    <th v-for="(head, id) in tableHeads" :key="id" scope="col" :class="head.class"
                        class="py-3.5 px-3 text-xs font-semibold whitespace-nowrap sticky top-0 z-10 bg-[#fbfbf9]"
                        id="holdings_th_instrument"> {{ head.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, id) in getPositionData" :key="id" class="border-b">
                    <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{ i.symbol }}</td>
                    <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.qty }}</td>
                    <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                        {{ i.exchange == 'CDS' || i.exchange == 'BCD' ? parseFloat(i?.avgPrice).toFixed(4) :
                parseFloat(i?.avgPrice).toFixed(2) }}
                    </td>
                    <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                        {{ ruppesFormat(i.exchange == 'CDS' || i.exchange == 'BCD' ? parseFloat(i?.price).toFixed(4) :
                            parseFloat(i?.price).toFixed(2)) }}
                    </td>
                    <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ parseFloat(i.pdc).toFixed(2) }}</td>
                    <td class="pr-3 py-4 text-sm dark:text-[#94A3B8] relative text-right" :class="{ 'positive-color': Number(i.pnl) >= 0, 'negative-color' : Number(i.pnl) < 0}">{{ parseFloat(i.pnl).toFixed(2)}}</td>
                    <td class="pr-3 py-4 text-sm dark:text-[#94A3B8] relative text-right" :class="{ 'positive-color': Number(i.pnlChange) >= 0, 'negative-color' : Number(i.pnlChange) < 0}">{{ parseFloat(i.pnlChange || '0.00').toFixed(2) }} %</td>
                </tr>
            </tbody>
        </table>

        <div v-else class="flex justify-center my-10 ">
            No Positions Found
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import commonjs from '../../mixins/common';
export default {
    mixins: [commonjs],
    data() {
        return {
            tableHeads: [
                { name: 'Instrument', class: 'text-left' },
                { name: 'Qty.', class: 'text-right' },
                { name: 'Avg.Price', class: 'text-right' },
                { name: 'Price', class: 'text-right' },
                { name: 'Prev. close Price', class: 'text-right' },
                { name: 'P&L', class: 'text-right' },
                { name: 'P&L chg.', class: 'text-right' },
            ],
        }
    },
    computed: {
        ...mapGetters('positions', ['getPositionData']),
        ...mapGetters('auth', ['getUserId']),
        ...mapGetters(['getLoader'])

    },
    async created() {
        this.$store.dispatch('positions/getPositionsFromApi', this.getUserId)
    },
}
</script>