<template>
    <div class="">
      <div class="h-[calc(100vh-100px)] overflow-y-auto border-t">
        <table class="w-full relative" v-if="getLedgerData?.length > 0">
          <thead>
            <tr class="h-12">
              <th v-for="(head, id) in tableHeads" :key="id" scope="col" :class="head.class"
                class="px-2 text-xs font-semibold z-10 whitespace-nowrap sticky top-0 bg-[#fbfbf9]">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, id) in getLedgerData" :key="id" class="border-b max-w-full">
              <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative">
                <span class="whitespace-nowrap">{{ commonjs.methods.formatDate(i.dtoftran) }}</span>
              </td>
              <td class="px-2 py-4 text-sm leading-6 primary-color dark:text-[#94A3B8] relative max-w-[250px]">
                <div class="max-w-[350px]">
                  {{ i.descript ? i.descript : 'NA' }}
                </div>
              </td>
              <!-- <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">
                {{ i.voucher }}
              </td> -->
              <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                {{ i.damount }}
              </td>
              <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                {{ i.camount }}
              </td>
              <!-- <td class="px-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.entrycode }}</td> -->
            </tr>
          </tbody>
        </table>
        <div v-else class="flex justify-center my-10 ">
          No Ledger Found
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, onUnmounted, } from "vue";
import { useStore } from "vuex";
import commonjs from "../../mixins/common"

const store = useStore();
const tableHeads = ref([
  { name: "Date", class: "text-left" },
  { name: "Description", class: "text-left" },
  // { name: "Voucher No", class: "text-center" },
  { name: "Debit", class: "text-right" },
  { name: "Credit.", class: "text-right" },
  // { name: "Entry Code", class: "text-right" },
]);
const getLedgerData = computed(() => store.getters["boReports/getLedgersData"]);

const resetState = () => {
  store.commit("boReports/setLedgerData", [])
}

onUnmounted(() => {
  resetState()
})
</script>