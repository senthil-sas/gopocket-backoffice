<template>
  <div
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
        <button @click="getLedger()" class="commonbtn h-[30px] !py-0 text-xs">
          Submit
        </button>
      </div>

      <div>
        <button
          type="button"
          @click="previousYear()"
          class="commonbtn text-xs !py-0 h-[30px]"
        >
          Previous Year
        </button>
      </div>

      <div>
        <button
          type="button"
          @click="nextYear()"
          class="commonbtn text-xs !py-0 h-[30px]"
        >
          Next Year
        </button>
      </div>
    </div>

    <div class="flex-auto">
      <div
        class="flex justify-start lg:justify-end items-start lg:items-center pr-4 py-2 space-x-6"
      >
        <div class="border-e pr-4">
          <p class="text-end text-sm">
            <!-- {{ debitAmount ? parseFloat(debitAmount).toFixed(2) : debitAmount }} -->
            90
          </p>
          <p class="secondary-color font-semibold text-xs">Total Debit</p>
        </div>
        <div>
          <p class="text-end text-sm">
            <!-- {{
              creditAmount ? parseFloat(creditAmount).toFixed(2) : creditAmount
             }} -->

            80
          </p>
          <p class="font-semibold secondary-color text-xs">Total Credit</p>
        </div>
      </div>
    </div>
  </div>
  <div class="px-4">
    <div class="h-[calc(100vh-200px)] overflow-y-auto border-t">
      <table class="w-full relative">
        <thead>
          <tr class="h-12">
            <th
              v-for="(head, id) in tableHeads"
              :key="id"
              scope="col"
              :class="head.class"
              class="px-2 text-xs font-semibold z-10 whitespace-nowrap sticky top-0 bg-[#cbcbc4]"
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
            <!-- <td class="px-3 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right">{{ i.entrycode }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
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
  { name: "Debit", class: "text-center" },
  { name: "Credit.", class: "text-right" },
]);

const ledgerData = ref([
  {
    branchcode: "DIGI",
    drcr: "C",
    dtoftran: "2024-02-08",
    damount: 0.0,
    voucher: "RECSEC 2213756",
    tradingcode: "124492",
    camount: 100.0,
    entrycode: "3",
    descript: "RECEIVED ON ACCOUNT124492",
  },
  {
    branchcode: "DIGI",
    drcr: "D",
    dtoftran: "2024-02-20",
    damount: 82.74,
    voucher: "NTN/035/211",
    tradingcode: "124492",
    camount: 0.0,
    entrycode: "5",
    descript:
      "TO BILL NTN/035/211    FOR EX: NSE- BT: T1-NORMAL - SETTLEMENT=2024035GST INVOICE # : 3323240000586006",
  },
  {
    branchcode: "DIGI",
    drcr: "D",
    dtoftran: "2024-02-21",
    damount: 0.22,
    voucher: "NTN/036/208",
    tradingcode: "124492",
    camount: 0.0,
    entrycode: "5",
    descript:
      "TO BILL NTN/036/208    FOR EX: NSE- BT: T1-NORMAL - SETTLEMENT=2024036GST INVOICE # : 3323240000588512",
  },
  {
    branchcode: "DIGI",
    drcr: "D",
    dtoftran: "2024-02-26",
    damount: 4.0,
    voucher: "NTW/039/25",
    tradingcode: "124492",
    camount: 0.0,
    entrycode: "5",
    descript:
      "TO BILL NTW/039/25     FOR EX: NSE- BT: T1-DEPOS. (O) - SETTLEMENT=2024039GST INVOICE # : 3323240000596496",
  },
  {
    branchcode: "DIGI",
    drcr: "D",
    dtoftran: "2024-02-28",
    damount: 3.6,
    voucher: "NTW/041/32",
    tradingcode: "124492",
    camount: 0.0,
    entrycode: "5",
    descript:
      "TO BILL NTW/041/32 FOR EX: NSE- BT: T1-DEPOS. (O) - SETTLEMENT=2024041GST INVOICE # : 3323240000602903",
  },
  {
    branchcode: "DIGI",
    drcr: "D",
    dtoftran: "2024-03-07",
    damount: 4.55,
    voucher: "NTN/047/266",
    tradingcode: "124492",
    camount: 0.0,
    entrycode: "5",
    descript:
      "TO BILL NTN/047/266 FOR EX: NSE- BT: T1-NORMAL - SETTLEMENT=2024047GST INVOICE # : 3323240000623233",
  },
  {
    branchcode: "DIGI",
    drcr: "D",
    dtoftran: "2024-03-06",
    damount: 0.56,
    voucher: "NTN/046/231",
    tradingcode: "124492",
    camount: 0.0,
    entrycode: "5",
    descript:
      "TO BILL NTN/046/231    FOR EX: NSE- BT: T1-NORMAL - SETTLEMENT=2024046GST INVOICE # : 3323240000619576",
  },
  {
    branchcode: "DIGI",
    drcr: "D",
    dtoftran: "2024-03-15",
    damount: 3.85,
    voucher: "NTW/052/23",
    tradingcode: "124492",
    camount: 0.0,
    entrycode: "5",
    descript:
      "TO BILL NTW/052/23     FOR EX: NSE- BT: T1-DEPOS. (O) - SETTLEMENT=2024052GST INVOICE # : 3323240000642742",
  },
]);

const popover = ref({
  visibility: "click",
  placement: "bottom-start",
});

const getUserId = computed(() => store.getters["auth/getUserId"]);
const getLedgerData = computed(() => store.getters["ledger/getLedgerData"]);

const getLedger = () => {
  let json = {
    ucc: getUserId.value,
    from_date: fromDate.value,
    to_date: toDate.value,
  };
  store.dispatch("ledger/getledgerApi", json);
};

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

const previousYear = () => {
  const [toyeardate] = formateDate(toDate.value).split("-");
  // console.log(curYear.value, "prev");

  if (Number(toyeardate) <= curYear.value) {
    const [fyear, fmon, fday] = formateDate(fromDate.value).split("-");
    fromDate.value = (Number(fyear) - 1).toString() + "-" + fmon + "-" + fday;
    const [tyear, tmon, tday] = formateDate(toDate.value).split("-");
    toDate.value =
      (Number(tyear) - 1).toString() +
      "-" +
      "03" +
      "-" +
      Number(daysinMonth(Number(tyear) - 1, 3).toString());
  }
};

const nextYear = () => {
  const [toyeardate] = formateDate(toDate.value).split("-");

  if (Number(toyeardate) !== curYear.value) {
    const [fyear, fmon, fday] = formateDate(fromDate.value).split("-");
    fromDate.value = new Date(
      (Number(fyear) + 1).toString() + "-" + fmon + "-" + fday
    );
    const [tyear, tmon, tday] = formateDate(toDate.value).split("-");
    toDate.value = new Date(
      (Number(tyear) + 1).toString() + "-" + tmon + "-" + tday
    );
  }
};

const getPreviousDays = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  const finalDate = date.toLocaleDateString().split("/");
  const [mm, days, yyyy] = finalDate;
  const dd = days.length == 1 ? `0${days}` : days;
  const month = mm.length == 1 ? `0${mm}` : mm;
  return `${yyyy}-${month}-${dd}`;
};

const setDate = () => {
  const curfullYear = new Date();
  const currentYear = curfullYear.getFullYear();
  const currentMonth = curfullYear.getMonth();
  const currentDay = curfullYear.getDate();
  curYear.value = Number(currentYear);
  fromDate.value = new Date(`${currentYear - 1}-0${4}-01`);
  toDate.value = new Date(
    getPreviousDays(`${currentYear}-${currentMonth + 1}-${currentDay}`)
  );
};

onMounted(() => {
  setDate();
});
</script>

<style>
</style>