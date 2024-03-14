<template>
    <table id="transactions_table" class="w-full rounded-b border-t border-[#ededed] dark:border-[#232325] relative my-4">
        <thead class="border-b dark:border-[#232325] dark:bg-[#181818]">
            <tr>
                <th v-for="(head,id) in tableHeads" :key="id" scope="col" :class="head.class" class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap" id="transactions_th_instrument"> {{head.name}}</th>
            </tr>
        </thead>
                    
        <tbody >
            <tr v-for="(i,id) in tableData" :key="id" class="border-b">
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{i.Date}}</td>
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">{{i.refNo}}</td>
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{i.acc}}</td>
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">
                    <button class="min-w-[100px]" :class="{'bluebtn' : i.type == 'Withdraw', 'graybtn' : i.type == 'Pending', 'greenbtn' : i.type == 'Deposit'}">{{i.type}}</button>
                </td>
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{i.amount}}</td>
                <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">{{i.status}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            tableHeads: [
                { name: 'Date', class: 'text-left'},
                { name: 'Ref.no.', class: 'text-center'},
                { name: 'Account', class: 'text-left'},
                { name: 'Type', class: 'text-center'},
                { name: 'Amount', class: 'text-right'},
                { name: 'Status', class: 'text-center'},
            ],
            tableData: [
                { Date: '2023-7-05', refNo: '-', acc: 'Equity', type: 'Withdraw', status: 'Success', amount: '2,527.98'},
                { Date: '2023-6-10', refNo: '-', acc: 'Equity', type: 'Deposit', status: 'Success', amount: '5000.00'},
            ]
        }
    },
}
</script>