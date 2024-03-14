<template>
    <margin_widget />
    <table id="marginpledge_table" class="w-full rounded-b border-t border-[#ededed] dark:border-[#232325] relative mt-[1px]">
        <thead class="border-b dark:border-[#232325] dark:bg-[#181818]">
            <tr>
                <th class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap">
                    <input class="accent-violet-600 h-[16px] w-[16px] cursor-pointer" type="checkbox" v-model="checkBoxSelectAll">
                </th>
                <th v-for="(head,id) in tableHeads" :key="id" scope="col" :class="head.class" class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap" id="marginpledge_th_instrument"> {{head.name}}</th>
            </tr>
        </thead>
                    
        <tbody >
            <tr v-for="(i, id) in tableData" :key="id" class="border-b cursor-pointer" @click="selectRow(i,id)">
                <td class="py-3.5 px-3 text-sm primary-color dark:text-[#94A3B8] relative text-center">
                    <input class="accent-violet-600 h-[16px] w-[16px] cursor-pointer" type="checkbox" @change="clickCb($event, id)" v-model="selectedCheckbox" :value="i">
                </td>
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{ i.instrument }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.qty }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.pdc }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.buyValue }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.haircut }}</td>
                <td class="pr-3 py-4 text-sm relative text-right" :class="{'green-color' : Number(i.pnl) > 0, 'red-color' : Number(i.pnl) < 0, 'primary-color' : Number(i.pnl) == 0}">{{ i.pledgeAvail }}</td>
                <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center" >
                    <input :max="i.pledgeQty" type="number" class="border-[0.02rem] max-w-[100px] h-7 px-2 rounded-md" :class="{ 'bg-gray-100': !i.isChecked}" v-model="i.pledgeQty" :readonly="!i.isChecked">
                </td>
                <td class="px-3 py-4 text-sm relative text-right" >{{  i.potentialAmount }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import margin_widget from '../actions/margin-pledge-widget.vue'
export default {
    components: { margin_widget } ,
    data() {
        return {
            tableHeads: [
                { name: 'Instrument', class: 'text-left'},
                { name: 'Qty.', class: 'text-right'},
                { name: 'Prev. Close', class: 'text-right'},
                { name: 'Present value', class: 'text-right'},
                { name: 'Haircut %', class: 'text-right'},
                { name: 'Pledge Margin Available', class: 'text-right'},
                { name: 'Pledge Qty.', class: 'text-center'},
                { name: 'Potential Amount', class: 'text-right'}
            ],
            tableData: [
                { instrument: 'BANKBARODA', qty: '2', pdc: '91.40', buyValue: '91.40', haircut: '205.40', pledgeAvail: '205.40', pnl: '114.00', pledgeQty: '0', potentialAmount: '200', isChecked: false},
                { instrument: 'PAYTM', qty: '2', pdc: '535.80', buyValue: '535.80', haircut: '205.40', pledgeAvail: '869.95', pnl: '114.00', pledgeQty: '0', potentialAmount: '200', isChecked: false},
                { instrument: 'HUTSUN', qty: '3', pdc: '883.60', buyValue: '883.60', haircut: '205.40', pledgeAvail: '937.05', pnl: '114.00', pledgeQty: '0', potentialAmount: '200', isChecked: false},
                { instrument: 'M&M', qty: '1', pdc: '1302.70', buyValue: '1302.70', haircut: '205.40', pledgeAvail: '1548.70', pnl: '114.00', pledgeQty: '0', potentialAmount: '200', isChecked: false},
                { instrument: 'TATAMOTORS', qty: '1', pdc: '494.06', buyValue: '1976.25', haircut: '205.40', pledgeAvail: '2403.20', pnl: '-114.00', pledgeQty: '0', potentialAmount: '200', isChecked: false},
            ],
            selectedCheckbox: []
        }
    },
    computed: {
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
        clickCb(event, index) {
            this.tableData[index]['isChecked'] = event.target.checked
        },
        selectRow(item) {
            if(!item.isChecked) {
                this.selectedCheckbox.push(item)
                item.isChecked = true
            }
        },
    },
}
</script>