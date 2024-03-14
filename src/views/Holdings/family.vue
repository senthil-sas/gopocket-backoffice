<template>
    <div class="p-5 h-[calc(100vh-96px)] overflow-y-auto">
        <div class="text-sm primary-color" v-if="!getIsAddSubAcc">
            <!-- <img :src="familyImg" alt="familyImage" load="lazy" class="max-w-[10%] h-auto"> -->
            <div class="mb-6">
                <span class="primary-color text-sm">Link your family's {{ $store.state.brokerName }} stock broking accounts as sub-accounts to view your family's combined portfolios. <span class="text-blue-400 hover:text-blue-600 cursor-pointer text-xs">Learn more.</span></span>
                    </div>
                <button class="commonbtn" @click="linkSubAcc()">Link a sub-account</button>

                    <div class="mt-6 mb-2">
                        <span class="primary-color text-sm">Family members account not in {{ $store.state.brokerName }}?</span>
                    </div>
                <div>
                    <span class="primary-color text-sm">Open Account and Transfer them to {{ $store.state.brokerName }} to link them. <span class="text-blue-400 hover:text-blue-600 cursor-pointer text-xs">Learn more.</span></span>
            </div>
        </div>

        <!-- Sub Accounts -->
        <button v-if="!getIsAddSubAcc" class="mt-12" @click="viewSubAccounts()">
            <span class="flex items-center gap-2" >
                <span class="text-blue-400 hover:text-blue-600">Sub-accounts</span> 
                <icon name="upArrow" height="16" width="16" v-if="isShowSubAccounts"/> 
                <icon name="downArrow" height="16" width="16" v-if="!isShowSubAccounts"/>
            </span>
        </button>

        <table id="transactions_table" class="w-full rounded-b border-t border-[#ededed] dark:border-[#232325] relative my-8" v-if="isShowSubAccounts && !getIsAddSubAcc">
            <thead class="border-b dark:border-[#232325] dark:bg-[#181818]">
                <tr>
                    <th v-for="(head, id) in tableHeads" :key="id" scope="col" :class="head.class" class="py-3.5 px-3 text-xs font-semibold secondary-color whitespace-nowrap" id="transactions_th_instrument"> {{ head.name }}</th>
                </tr>
            </thead>
                    
            <tbody>
                <tr v-for="(i, id) in getFamilyDetails" :key="id" class="border-b">
                    <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative">{{ i.account_holder_name }}</td>
                    <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-left">{{ i.sub_account }}</td>
                    <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">{{ i.status }}</td>
                    <td class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">
                        <div class="flex items-center justify-center gap-2">
                            <span class="text-xs text-blue-500 cursor-pointer ">
                                <span class="text-xs text-blue-500 cursor-pointer flex items-center gap-1 hover:text-blue-800">
                                    <span>
                                        <icon name="holdings" height="14" width="14" class=""/>
                                    </span>
                                    <span>
                                        view Portfolio
                                    </span>
                                </span>
                            </span> | 
                            <span class="text-xs text-blue-500 cursor-pointer flex items-center gap-1 hover:text-blue-800">
                                 <span>
                                    <icon name="delete" height="14" width="14" class=""/>
                                </span>
                                <span>
                                    Remove
                                </span>
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <linksub_account v-if="getIsAddSubAcc" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import familyImg from '../../assets/images/family.svg'
import linksub_account from './linksub-account.vue'
import icon from '../../components/utilComponents/icons.vue'
export default {
    components: { linksub_account, icon },
    data() {
        return {
            familyImg : familyImg,
            tableHeads: [
                { name: 'Name', class: 'text-left'},
                { name: 'Client Code', class: 'text-left'},
                { name: 'Status', class: 'text-center'},
                { name: '', class: ''},
            ],
            isShowSubAccounts: true
        }
    },
    computed: {
        ...mapGetters('subAcc', ['getIsAddSubAcc', 'getFamilyDetails'])
    },
    methods: {
        linkSubAcc() {
            this.$store.commit('subAcc/setIsAddSubAcc', true)
        },
        viewSubAccounts() {
            this.isShowSubAccounts = !this.isShowSubAccounts
        }
    },
    created() {
        this.$store.dispatch('subAcc/getFamilyAccountFromApi')
    },
}
</script>