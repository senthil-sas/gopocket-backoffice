<template>
    <div>
         <table id="positions_table" class="w-full rounded-b border-t border-[#ededed] dark:border-[#232325] relative mt-[1px] "            v-if="getPositionData?.length >0 "

>

             <thead class="border-b dark:border-[#232325] dark:bg-[#181818]">
                <tr>
                <th v-for="(head,id) in tableHeads" :key="id" scope="col" :class="head.class" class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap" id="holdings_th_instrument"> {{head.name}}</th>
            </tr>
             </thead>
 
             <tbody >
                 <tr v-for="(i, id) in getPositionData" :key="id" class="border-b">
                         <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{ i.ucc }}</td>
                         <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.qty }}</td> 
                         <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                            {{  i.exchange == 'CDS' || i.exchange == 'BCD' ? parseFloat(i?.avg_price).toFixed(4) : parseFloat(i?.avg_price).toFixed(2) }}
                         </td>
                         <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.pdc }}</td>
                         <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ Number(i.pnl) + Number(i.pnl) }}</td> 
                     </tr>
             </tbody>
         </table>

         <div  v-else class="flex justify-center my-10 ">
            No Positions Found
         </div>
     </div>
 </template>
 <script>
 import { mapGetters } from 'vuex';
 export default {
     data() {
         return {
             tableHeads: [
                 { name: 'Instrument', class: 'text-left' },
                 { name: 'Qty.', class: 'text-right' },
                 { name: 'Avg.Price', class: 'text-right' },
                 { name: 'Prev. close Price', class: 'text-right' },
                 { name: 'P&L', class: 'text-right' },
             ],
         }
     },
     computed: {
         ...mapGetters('positions', ['getPositionData'])
     },
     async created() {
         this.$store.dispatch('positions/getPositionsFromApi')
     },
 }
 </script>