<template>
  <div class="overflow-y-auto h-[calc(100vh-100px)]">

    <div class="mx-5 mt-4 flex flex-col gap-4 item-start lg:flex-row lg:items-end"> 
      <div>
        <div class="primaryColor text-xs ml-2 mb-1">From Date</div>
        <div>
          <VDatePicker
            :max-date="today"
            v-model="fromDate"
            is-required
            :popover="popover"
            :masks="{ input: 'DD-MM-YYYY', modelValue: 'YYYY-MM-DD' }"
            type="date"
            mode="date"
            class="w-[100px]"
            :dateFormat="'YYYY-MM-DD'"
          >
            <template v-slot="{ inputValue, inputEvents, togglePopover }">
              <div
                class="flex items-center justify-between w-[100px] h-7 border rounded cursor-pointer p-2"
              >
                <input
                  :value="inputValue"
                  placeholder="DD-MM-YYYY"
                  v-on="inputEvents"
                  class="w-full h-full ml-1 text-[10px] outline-none cursor-pointer"
                  readonly
                />
              </div>
            </template>
          </VDatePicker>
        </div>
      </div>

      <div>
        <div class="primaryColor text-xs ml-2 mb-1">To Date</div>
        <div>
          <VDatePicker
            :max-date="today"
            v-model="toDate"
            is-required
            :popover="popover"
            :masks="{ input: 'DD-MM-YYYY', modelValue: 'YYYY-MM-DD' }"
            type="date"
            mode="date"
            class="w-[100px]"
            :dateFormat="'YYYY-MM-DD'"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div
                class="flex items-center justify-between w-[100px] h-7 border rounded cursor-pointer p-2"
              >
                <input
                  :value="inputValue"
                  placeholder="DD-MM-YYYY"
                  v-on="inputEvents"
                  class="w-full h-full ml-1 text-[10px] outline-none cursor-pointer"
                  readonly
                />
              </div>
            </template>
          </VDatePicker>
        </div>
      </div>
      <div class="flex flex-col items-end space-x-4">
        <div>
          <button @click="onSubmit()" class="commonbtn !py-1.5 h-7 !text-xs">
            Submit
          </button>
        </div>
      </div>
    </div>
    <div v-if="getmisReportData.length" class="flex w-full my-5">
      <misChart/>
    </div>

    <div v-if="getmisReportData.length" class="m-5 relative">
      <table id="revenue_table" class="w-full m-0 table-sticky rounded-3xl">
        <thead class="md:h-[50px] grid-rows-none">
          <tr class="relative grid-rows-none">
            <th
              rowspan="2"
              class="text-xs font-semibold whitespace-nowrap !bg-gray-100"
              id="revenue_th_instrument" >
              A/c Opening Date
            </th>
            <th
              rowspan="2"
              class="text-xs font-semibold whitespace-nowrap !bg-gray-100"
              id="revenue_th_instrument">
              Total A/c Started
            </th>
            <th
              rowspan="2"
              class="text-xs font-semibold whitespace-nowrap !bg-gray-100"
              id="revenue_th_instrument"
            >
              Esign Completed
            </th>
            <th
              rowspan="2"
              class="text-xs font-semibold whitespace-nowrap !bg-gray-100"
              id="revenue_th_instrument"
            >
              A/c Opened
            </th>
            <!-- referral -->
            <th
              rowspan="2"
              class="text-xs font-semibold whitespace-nowrap !bg-gray-100"
              id="revenue_th_instrument"
            >
              Referral
            </th>
          </tr>
        </thead>
        <tbody ref="myTable">
          <template v-for="(i, id, index) in getmisReportData" :key="id">
            <tr class="border-b">
              <td
                class="pl-3 primary-color py-4 text-sm dark:text-[#94A3B8] relative text-center"
              >
                {{ i.date }}
              </td>
              <td
                class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center"
              >
                {{ i.totalAccOpen }}
              </td>
              <td
                class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center"
              >
                {{ i.totalAccEsign }}
              </td>
              <td
                class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center"
              >
                {{ i.totalAccBo }}
              </td>
              <td
                class="pl-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center"
              >
                {{ i.referral }}
              </td>
            
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup  type="ts" >
import tabs from "../../components/utilComponents/tabs.vue";
import heatmap from "../../components/charts/heatmap.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useCommonHook } from "../../Composible/commonHook";
import misChart from "./chartView/misChart.vue"

const { getLast30DaysDates } = useCommonHook();

const store = useStore();
const today = new Date();
const toDate = ref(getLast30DaysDates().endDate);
const fromDate = ref(getLast30DaysDates().startDate);

const popover = ref({
  visibility: "click",
  placement: "bottom-start",
});

onMounted(() => {});
const getmisReportData = computed(
  () => store.getters["misreport/getmisReportData"]
);

const onSubmit = () => {
  let [fmon, fday, fyear] = new Date(fromDate.value)
    .toLocaleDateString()
    .split("/");
  let [tmon, tday, tyear] = new Date(toDate.value)
    .toLocaleDateString()
    .split("/");

  fday = fday.length == 1 ? `0${fday}` : fday;
  fmon = fmon.length == 1 ? `0${fmon}` : fmon;
  tday = tday.length == 1 ? `0${tday}` : tday;
  tmon = tmon.length == 1 ? `0${tmon}` : tmon;

  store.dispatch("misreport/getmisReportFromApi", {
    fromDate: `${fday}-${fmon}-${fyear}`,
    toDate: `${tday}-${tmon}-${tyear}`,
  });
};
</script>