<template>
    <div>
        <div class="relative h-[320px] overflow-y-auto border-y border-[#ededed] dark:border-[#232325] mt-[1px]">
            <table id="edis_table" class="w-full rounded-b relative table-sticky">
                <thead>
                    <tr>
                        <th class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap">
                            <input class="accent-violet-600 h-[16px] w-[16px] cursor-pointer" type="checkbox" v-model="checkBoxSelectAll">
                        </th>
                        <th v-for="(head, id) in tableHeads" :key="id" scope="col" :class="head.class" class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap" id="edis_th_instrument">
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
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.qty }}</td>
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.authQty }}</td>
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.buyAvg }}</td>
                        <td class="pr-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.buyValue }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="my-10 flex justify-end gap-3 px-2">
            <button class="commonbtn">Authorize</button>
            <button class="commonbtn !bg-red-600">Revoke</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            tableHeads: [
                { name: 'Instrument', class: 'text-left'},
                { name: 'Qty.', class: 'text-right'},
                { name: 'Authorised Qty.', class: 'text-right'},
                { name: 'Buy Avg.', class: 'text-right'},
                { name: 'Buy Value', class: 'text-right'},
            ],
            tableData: [
                { instrument: 'BANKBARODA', qty: '1', authQty: '1', buyAvg: '205.40', buyValue: '205.40', isChecked: false},
                { instrument: 'PAYTM', qty: '1', authQty: '1', buyAvg: '869.95', buyValue: '869.95', isChecked: false},
                { instrument: 'HUTSUN', qty: '1', authQty: '1', buyAvg: '937.05', buyValue: '937.05', isChecked: false},
                { instrument: 'M&M', qty: '1', authQty: '1', buyAvg: '1548.70', buyValue: '1548.70', isChecked: false},
                { instrument: 'TATAMOTORS', qty: '1', authQty: '1', buyAvg: '2403.20', buyValue: '2403.20', isChecked: false},
            ],
            selectedCheckbox : []
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
