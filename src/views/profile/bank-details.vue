<template>
    <div class="p-5 bank-details">
        <div v-if="!getIsAddBank" >
        <div class="flex gap-3 grow flex-wrap">
            <div v-for="(bank, id) in getbankdetails" :key="id" class="bank-details-card">
                <div class="flex justify-between">
                    <span class="primary-color !font-semibold text-xs"> BANK {{ id + 1 }}</span>
                    <span v-if="bank.primary == 1">
                        <button class="primarybtn">Primary</button>
                    </span>
                </div>

                <div class="flex gap-5 items-center my-4">
                    <img :src="hdfcImg" :alt="bank?.name" class="max-w-[60px] max-h-[60px] border rounded p-2">
                    <span>
                        <div class="primary-color text-sm">{{ bank.bank_name}}</div>
                        <div class="secondary-color text-xs">{{ bank.account_no }}</div>
                    </span>
                </div>

                <div class="my-4 flex flex-col">
                    <div class="secondary-color text-xs mb-2">IFSC</div>
                    <div class="primary-color text-sm">{{ bank.ifsc_code }}</div>
                </div>

                <div class="my-4 flex flex-col">
                    <div class="secondary-color text-xs mb-2">MICR</div>
                    <div class="primary-color text-sm">{{ bank.micr_code }}</div>
                </div>

                <div class="my-4 flex flex-col">
                    <div class="secondary-color text-xs mb-2">+ Set as primary</div>
                </div>
            </div>
        </div>

        <div class="my-6">
                <button class="commonbtn" @click="addBank()">Add New bank</button>
            </div>

            <!-- Recent Transactions -->
            <!-- <button @click="viewBankMandates()">
                <span class="flex items-center gap-2 py-4">
                    <span class="text-blue-400 hover:text-blue-600">Bank Mandates</span> 
                    <icon name="upArrow" height="16" width="16" v-if="isShowBankMandates"/> 
                    <icon name="downArrow" height="16" width="16" v-if="!isShowBankMandates"/>
                </span>
            </button> -->
        </div>


        <!-- <div v-if="isShowBankMandates">
            <bank_mandates />
        </div> -->

        <add_bank v-if="getIsAddBank"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import add_bank from './add-bank.vue'
import icon from '../../components/utilComponents/icons.vue'
import bank_mandates from './bank-mandates.vue'
import hdfcImg from '../../assets/images/hdfc.png'

export default {
    components: { add_bank, icon, bank_mandates },
    data() {
        return {
            isAddBank: false,
            isShowBankMandates: false,
            hdfcImg
        }
    },
    
    computed: {
        ...mapGetters('profile', ['getbankdetails', 'getLoader']),
    },
    methods: {
        addBank() {
            this.$store.commit('bankDetails/setIsAddBank', true)
        },
        viewBankMandates() {
            this.isShowBankMandates = !this.isShowBankMandates
        }

        
    },
    created() {
        // this.$store.dispatch('bankDetails/getBankDataFromApi')
    },
}
</script>




<style>
.bank-details-card {
    @apply border-[0.02rem] p-3 min-w-[360px] rounded-lg
}

.bank-details .primarybtn {
    @apply px-2 py-[4px] rounded bg-[#fae1a826] text-[#f8ab00] text-xs cursor-default
}
</style>