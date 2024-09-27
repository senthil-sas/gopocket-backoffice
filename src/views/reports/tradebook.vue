<template>
  <div>
    <div class="overflow-x-auto overflow-y-hidden">
      <heatmap v-if="getTradeBookData?.length" :height="100" :bar-options="{ spaceRatio: 0.2 }"
        :dates="{ fromDate: fromDate, toDate: toDate, segment: segment }" />
    </div>
    <div class="my-10">
      <div class="h-[calc(100vh-296px)] overflow-y-auto "  v-if="getTradeBookData?.length > 0">
        <table class="w-full relative">
          <thead>
            <tr>
              <th v-for="(head, id) in tableHeads" :key="id" scope="col" :class="head.class"
                class="py-3.5 px-2 text-xs font-semibold z-10 whitespace-nowrap sticky top-0 bg-[#fbfbf9]">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, id) in getTradeBookData" :key="id" class="border-b">
              <td class="px-2 py-4 whitespace-nowrap text-sm primary-color dark:text-[#94A3B8] relative text-left">
                {{ commonjs.methods.formatDate(i.tradeDate) }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap text-sm primary-color dark:text-[#94A3B8] relative text-left">
                {{ i.symbol }}
                <span class="pl-1 text-[10px] secondary-color">{{ i.segment }}</span>
              </td>
              <td
                class="px-2 py-4 text-sm leading-6 primary-color dark:text-[#94A3B8] relative max-w-[250px] text-center">
                {{ i.type ? i.type : "Null" }}
              </td>
              <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center">
                {{ i.ucc }}
              </td>
              <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                {{ i.qty }}
              </td>
              <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                {{ i.price }}
              </td>
              <td class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">
                {{ i.value }}
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <div v-else class="flex justify-center my-10 ">
          No Trades Found
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
const store = useStore();
const heatmap = defineAsyncComponent(() => import("./heatmap-tradebook.vue"))

import commonjs from "../../mixins/common"

const today = new Date()
const fromDate = ref(getFinancialYearDates(today).startDate);
const toDate = ref(getFinancialYearDates(today).endDate);
const segment = ref({ name: "Equity", id: 0, exch: "NSE" });
const tableHeads = ref([
  { name: "Trade Date", class: "text-left" },
  { name: "Symbol", class: "text-left" },
  { name: "Trans Type", class: "text-center" },
  { name: "UCC", class: "text-center" },
  { name: "Qty.", class: "text-right" },
  { name: "Price", class: "text-right" },
  { name: "Value", class: "text-right" },
]);
const getTradeBookData = computed(() => store.getters["boReports/getTradeBookData"]);

function getFinancialYearDates (date: any) {
        const fiscalYearStartMonth = 3;
        const year = date.getFullYear()
        const startYear = date.getMonth() < fiscalYearStartMonth ? year - 1 : year;
        const startDate = new Date(startYear, fiscalYearStartMonth, 1);
        let endDate = new Date(startYear + 1, fiscalYearStartMonth - 1, 31);
        const currentDate = new Date();
        if (new Date(endDate) > currentDate) {
            endDate = new Date()
        }
        return {
            startDate: startDate,
            endDate: endDate
        };
    }

onMounted(() => {
});

const resetState = () => {
  store.commit(("boReports/setTradeBookData"))
}
onUnmounted(() =>  {
  resetState()
})
</script>

