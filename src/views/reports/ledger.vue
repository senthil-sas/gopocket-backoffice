<template>
 <div>
  <!-- <div
    class="flex flex-col gap-4 item-start lg:flex-row lg:items-end my-8 mx-4"
  >
    <div class="z-20">
      <div class="primary-color text-xs mb-1">From Date</div>
      <div>
        <VDatePicker
          v-model="fromDate"
          :value="fromDate"
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

    <div class="z-20">
      <div class="primary-color text-xs mb-1">To Date</div>
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

    <div class="flex space-x-4">
      <div>
        <button @click="getLedger()" class="commonbtn ">
          Submit
        </button>
      </div>
    </div>

    <div class="flex-auto">
      <div
        class="flex justify-start lg:justify-end items-start lg:items-center pr-4 py-2 space-x-6"
      >
        <div class="border-e pr-4">
          <p class="text-end text-sm">
            {{ debitAmount ? parseFloat(debitAmount).toFixed(2) : debitAmount }}
            90
          </p>
          <p class="secondary-color font-semibold text-xs">Total Debit</p>
        </div>
        <div>
          <p class="text-end text-sm">
        

            80
          </p>
          <p class="font-semibold secondary-color text-xs">Total Credit</p>
        </div>
      </div>
    </div>
  </div>  -->
  <div class="px-4">
    <div class="h-[calc(100vh-200px)] overflow-y-auto border-t">
      <table class="w-full relative" v-if="getLedgerData?.length > 0">
        <thead>
          <tr class="h-12">
            <th
              v-for="(head, id) in tableHeads"
              :key="id"
              scope="col"
              :class="head.class"
              class="px-2 text-xs font-semibold z-10 whitespace-nowrap sticky top-0 bg-[#fbfbf9]"
            >
              {{ head.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(i, id) in getLedgerData"
            :key="id"
            class="border-b max-w-full"
          >
            <td
              class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative"
            >
              <span class="whitespace-nowrap">{{ i.dtoftran }}</span>
            </td>
            <td
              class="px-2 py-4 text-sm leading-6 primary-color dark:text-[#94A3B8] relative max-w-[250px]"
            >
              <div class="max-w-[350px]">
                {{ i.descript }}
              </div>
            </td>
            <td
              class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-left"
            >
              {{ i.voucher }}
            </td>
            <td
              class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right"
            >
              {{ i.damount }}
            </td>
            <td
              class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right"
            >
              {{ i.camount }}
            </td>
             <td class="px-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.entrycode }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="flex justify-center my-10 ">
            No Ledger Found
        </div>
    </div>
  </div>
  </div> 
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const fromDate = ref("");
const today = ref(new Date());
const toDate = ref("");
const curMonth = ref("");
const curYear = ref(0);
const tableHeads = ref([
  { name: "Date", class: "text-left" },
  { name: "Description", class: "text-left" },
  { name: "Voucher No", class: "text-center" },
  { name: "Debit", class: "text-right" },
  { name: "Credit.", class: "text-right" },
]);



const popover = ref({
  visibility: "click",
  placement: "bottom-start",
});

const getUserId = computed(() => store.getters["auth/getUserId"]);
const getLedgerData = computed(() => store.getters["ledger/getLedgerData"]);

// const getLedger = () => {
//   let json = {
//     ucc: getUserId.value,
//     from_date: fromDate.value,
//     to_date: toDate.value,
//   };
//   store.dispatch("ledger/getledgerApi", json);
// };

const daysinMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const formateDate = (paloadDate) => {
  const dateObject = new Date(paloadDate);

  // Get year, month, and day from the Date object
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month index
  const day = ("0" + dateObject.getDate()).slice(-2);

  // New date string in yyyy-mm-dd format
  const newDateFormat = year + "-" + month + "-" + day;

  return newDateFormat;
};

// const previousYear = () => {
//   const [toyeardate] = formateDate(toDate.value).split("-");
  
//   if (Number(toyeardate) <= curYear.value) {
//     const [fyear, fmon, fday] = formateDate(fromDate.value).split("-");
//     fromDate.value = (Number(fyear) - 1).toString() + "-" + fmon + "-" + fday;
//     const [tyear, tmon, tday] = formateDate(toDate.value).split("-");
//     toDate.value =
//       (Number(tyear) - 1).toString() +
//       "-" +
//       "03" +
//       "-" +
//       Number(daysinMonth(Number(tyear) - 1, 3).toString());
//   }
// };

// const nextYear = () => {
//   const [toyeardate] = formateDate(toDate.value).split("-");

//   if (Number(toyeardate) !== curYear.value) {
//     const [fyear, fmon, fday] = formateDate(fromDate.value).split("-");
//     fromDate.value = new Date(
//       (Number(fyear) + 1).toString() + "-" + fmon + "-" + fday
//     );
//     const [tyear, tmon, tday] = formateDate(toDate.value).split("-");
//     toDate.value = new Date(
//       (Number(tyear) + 1).toString() + "-" + tmon + "-" + tday
//     );
//   }
// };

// const getPreviousDays = (dateString) => {
//   const date = new Date(dateString);
//   date.setDate(date.getDate() - 1);
//   const finalDate = date.toLocaleDateString().split("/");
//   const [mm, days, yyyy] = finalDate;
//   const dd = days.length == 1 ? `0${days}` : days;
//   const month = mm.length == 1 ? `0${mm}` : mm;
//   return `${yyyy}-${month}-${dd}`;
// };



onMounted(() => {
});
</script> 
<style>
</style>