<template>
    <div class="p-5 bank-details">
        <div v-if="!isAddBank">
            <div class="flex gap-3 grow flex-wrap">
                <div v-for="(bank, id) in getbankdetails" :key="id" class="bank-details-card">
                    <div class="flex justify-between">
                        <span class="primary-color !font-semibold text-xs mt-1"> BANK {{ id + 1 }}</span>
                        <span v-if="bank.accPrimary == '1'">
                            <button class="graybtn" >Primary</button>
                        </span>
                    </div>
                    <div class="flex gap-5 items-center my-4">
                        <img :src="hdfcImg" :alt="bank?.bankName" class="max-w-[60px] max-h-[60px] border rounded p-2">
                        <span>
                            <div class="primary-color text-sm">{{ bank.bankName}}</div>
                            <div class="secondary-color text-xs">{{ bank.branch }}</div>
                        </span>
                    </div>
                    <div class="my-4 flex flex-col">
                        <div class="secondary-color text-xs mb-2">ACCOUNT NO</div>
                        <div class="primary-color text-sm">{{ bank.accountNo }}</div>
                    </div>

                    <div class="my-4 flex flex-col">
                        <div class="secondary-color text-xs mb-2">IFSC</div>
                        <div class="primary-color text-sm">{{ bank.ifscCode }}</div>
                    </div>
                </div>
            </div>

            <div class="my-6">
                <button class="commonbtn" @click="addBank()">Add New bank</button>
                </div>
            </div>
        <add_bank v-if="isAddBank" @cancel="cancelAddBank" />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import add_bank from './add-bank.vue'
import hdfcImg from '../../assets/images/hdfc.png'
import { useStore } from 'vuex'

const store = useStore()

const isAddBank = ref(false)

const cancelAddBank = () => {
    isAddBank.value = false;
}

const getbankdetails = computed(() => store.getters['boReports/getBankDetails']);
const addBank = () => {
    isAddBank.value = true;
}

onMounted(() => {
    store.dispatch('boReports/getBankDetails')
})
</script>

<style>
.bank-details-card {
    @apply border-[0.02rem] p-3 min-w-[360px] rounded-lg
}

.bank-details .primarybtn {
    @apply px-2 py-[4px] rounded bg-[#fae1a826] text-[#f8ab00] text-xs cursor-default
}
</style>