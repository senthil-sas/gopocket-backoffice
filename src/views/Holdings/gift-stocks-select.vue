<template>
    <div>
        <gift_stock_widget :name="getRecipientsData.recipientsName" :mobileNo="getRecipientsData.recipientsMobileNo" :email="getRecipientsData.recipientsEmail"/>
        <div class="relative h-[320px] overflow-y-auto border-y border-[#ededed] dark:border-[#232325]">
            <table id="giftstocks_table" class="w-full rounded-b relative table-sticky">
                <thead >
                    <!-- border-b dark:border-[#232325] dark:bg-[#766060] -->
                    <tr>
                        <th class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap">
                            <input class="accent-violet-600 h-[16px] w-[16px] cursor-pointer" type="checkbox" v-model="checkBoxSelectAll">
                        </th>
                        <th v-for="(head, id) in tableHeads" :key="id" scope="col" :class="head.class" class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap" id="giftstocks_th_instrument">
                            {{ head.name }}
                        </th>
                    </tr>
                </thead>

                <tbody class="max-h-[280px] overflow-y-auto">
                    <tr v-for="(i, id) in tableData" :key="id" class="border-b last:border-b-0 cursor-pointer" @click="selectRow(i,id)">
                        <th class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap">
                            <input class="accent-violet-600 h-[16px] w-[16px] cursor-pointer" type="checkbox" @change="clickCb($event, id)" v-model="selectedCheckbox" :value="i">
                        </th>
                        <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{ i.instrument }}</td>
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.availQty }}</td>
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.pdc }}</td>
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.presentvalue }}</td>
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">
                            <input :max="i.giftStoks" type="number" class="border-[0.02rem] max-w-[100px] h-7 px-2 rounded-md" :class="{ 'bg-gray-100': !i.isChecked}" v-model="i.giftStoks" :readonly="!i.isChecked">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="my-10 flex justify-end gap-3 px-2">
            <button class="commonbtn">Confirm & Gift</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gift_stock_widget from './gift-stock-widget.vue'
export default {
    components: { gift_stock_widget },
    data() {
        return {
            tableHeads: [
                { name: 'Instrument', class: 'text-left'},
                { name: 'Available qty.', class: 'text-right'},
                { name: 'Prev.close', class: 'text-right'},
                { name: 'Present value', class: 'text-right'},
                { name: 'Gift Qty.', class: 'text-center'},
            ],
            tableData: [
                { instrument: 'BANKBARODA', availQty: '1', pdc: '91.40', presentvalue: '205.40', giftStoks: '1', isChecked: false},
                { instrument: 'PAYTM', availQty: '1', pdc: '535.80', presentvalue: '869.95', giftStoks: '1', isChecked: false},
                { instrument: 'HUTSUN', availQty: '1', pdc: '883.60', presentvalue: '937.05', giftStoks: '1', isChecked: false},
                { instrument: 'M&M', availQty: '1', pdc: '1302.70', presentvalue: '1548.70', giftStoks: '1', isChecked: false},
                { instrument: 'TATAMOTORS', availQty: '1', pdc: '494.06', presentvalue: '2403.20', giftStoks: '1', isChecked: false},
            ],
            selectedCheckbox : []
        }
    },
    computed: {
        ...mapGetters('giftStocks', ['getRecipientsData']),

        checkBoxSelectAll: {
            get: function () {
                return (this.tableData ? this.selectedCheckbox.length == this.tableData.length : false) || false
            },
            set: function (value) {
                var selected = [];
                if (value) {
                    this.tableData.forEach(function (item) {
                            selected.push(item);
                    });
                }
                this.tableData.forEach(item => {
                    if(value) {
                        item.isChecked = true
                    } else {
                        item.isChecked = false 
                    }
                })
                this.selectedCheckbox = selected;
            },
        },
    },
    methods: {
        selectRow(item) {
            if(!item.isChecked) {
                this.selectedCheckbox.push(item)
                item.isChecked = true
            }
        },
        clickCb(event, index) {
            this.tableData[index]['isChecked'] = event.target.checked
        },
    },
}
</script>
