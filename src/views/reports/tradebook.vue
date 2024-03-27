<template>
  <div>
    <div class="flex gap-4 items-end">
      <div>
        <div class="primary-color text-xs mb-1">Segment</div>
        <Listbox as="div" v-model="segment" class="w-[150px]">
          <div class="relative">
            <ListboxButton
              class="min-h-[28px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
            >
              <span class="block truncate text-xs">{{ segment.name }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronUpDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="i in segments"
                  :key="i.id"
                  :value="i"
                  v-slot="{ active, segment }"
                >
                  <li
                    :class="[
                      active ? 'violet-bg text-white' : 'text-gray-900',
                      'relative cursor-pointer select-none py-2 pl-8 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        segment ? 'font-semibold' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ i.name }}</span
                    >
                    <span
                      v-if="segment"
                      :class="[
                        active ? 'text-white' : 'text-indigo-600',
                        'absolute inset-y-0 left-0 flex items-center pl-1.5',
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <div class="h-5"></div>
      </div>

      <div>
        <div class="primaryColor text-xs ml-2 mb-2">From Date</div>
        <div>
          <VDatePicker
            :max-date="today"
            v-model="fromDate"
            is-required
            :popover="popover"
            :masks="{ input: 'DD-MM-YYYY', modelValue: 'YYYY-MM-DD' }"
            type="date"
            mode="date"
            class="w-[150px]"
            :dateFormat="'YYYY-MM-DD'"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div
                class="flex items-center justify-between w-[150px] h-7 border rounded cursor-pointer p-2"
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
        <div class="h-5"></div>
      </div>

      <div>
        <div class="primary-color text-xs mb-2">To Date</div>
        <div>
          <VDatePicker
            :max-date="today"
            v-model="toDate"
            is-required
            :popover="popover"
            :masks="{ input: 'DD-MM-YYYY', modelValue: 'YYYY-MM-DD' }"
            type="date"
            mode="date"
            class="w-[150px]"
            :dateFormat="'YYYY-MM-DD'"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div
                class="flex items-center justify-between w-[150px] h-7 border rounded cursor-pointer p-2"
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
        <div class="h-5"></div>
      </div>

      <div>
        <button class="commonbtn h-[30px] !py-0" @click="getTradeBook">
          <span class="text-xs">Submit </span>
        </button>
        <div class="h-5"></div>
      </div>
      <div>
        <button
          @click="previousYear()"
          type="button"
          class="commonbtn text-xs h-[30px] !py-0"
        >
          Previous Year
        </button>
        <div class="h-5"></div>
      </div>

      <div>
        <button
          type="button"
          @click="nextYear()"
          class="commonbtn text-xs h-[30px] !py-0"
        >
          Next Year
        </button>
        <div class="h-5"></div>
      </div>
    </div>
  </div>

  <div>
    <!-- chart Start -->
    <div class="chart-container">
      <v-frappe-chart
        type="heatmap"
        :data="{
          '1461744959': 20,
          '1463673055': 113,
          '1476892421': 57,
        }"
        :start="startDate"
        :end="endDate"
        :height="180"
        :bar-options="{ spaceRatio: 0.2 }"
      />
    </div>
    <!-- chart End  -->
    <div class="my-10">
      <div class="h-[calc(100vh-400px)] overflow-y-auto border-t">
        <table class="w-full relative">
          <thead>
            <tr>
              <th
                v-for="(head, id) in tableHeads"
                :key="id"
                scope="col"
                :class="head.class"
                class="py-3.5 px-2 text-xs font-semibold z-10 whitespace-nowrap sticky top-0 bg-[#fbfbf9]"
              >
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, id) in getTradeBookData" :key="id" class="border-b">
              <td
                class="px-2 py-4 whitespace-nowrap text-sm primary-color dark:text-[#94A3B8] relative text-left"
              >
                {{ i.trade_date }}
              </td>
              <td
                class="px-2 py-4 whitespace-nowrap text-sm primary-color dark:text-[#94A3B8] relative text-left"
              >
                {{ i.symbol }}
                <span class="pl-1 text-[10px] secondary-color">{{
                  i.segment
                }}</span>
              </td>
              <td
                class="px-2 py-4 text-sm leading-6 primary-color dark:text-[#94A3B8] relative max-w-[250px] text-center"
              >
                {{ i.type ? i.type : "Null" }}
              </td>
              <td
                class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-center"
              >
                {{ i.ucc }}
              </td>
              <td
                class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right"
              >
                {{ i.qty }}
              </td>
              <td
                class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right"
              >
                {{ i.price }}
                <!-- {{ toFixed(i.price / 100) }} -->
              </td>
              <td
                class="px-2 py-4 text-sm primary-color dark:text-[#94A3B8] relative text-right"
              >
                {{ i.value }}
                <!-- {{ toFixed(i.value) }} -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="flex justify-center my-10" v-else>
        <no_data name="Tradebook"/>
    </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { mapGetters, useStore } from "vuex";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
const store = useStore();

// const segment = ref("");
const segment = ref({ name: "Equity", id: 0, exch: "NSE" });
const segments = ref([
  { name: "Equity", id: 0, exch: "NSE" },
  { name: "Futures & Options", id: 0, exch: "NFO" },
  { name: "Currency", id: 0, exch: "CDS" },
]);

const popover = ref({
  visibility: "click",
  placement: "bottom-start",
});

const tableHeads = ref([
  { name: "Trade Date", class: "text-left" },
  { name: "Symbol", class: "text-left" },
  { name: "Trans Type", class: "text-center" },
  { name: "UCC", class: "text-center" },
  { name: "Qty.", class: "text-right" },
  { name: "Price", class: "text-right" },
  { name: "Value", class: "text-right" },
]);

const fromDate = ref("");
const toDate = ref("");
const today = ref(new Date());
const curMonth = ref("");
const curYear = ref(0);

const getLoader = computed(() => store.getters["reports/getLoader"]);
const getUserId = computed(() => store.getters["auth/getUserId"]);
const getTradeBookData = computed(
  () => store.getters["tradebook/getTradeBookData"]
);

const getFirstDayOfMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = "01";
  return `${year}-${month}-${day}`;
};
const getPreviousDay = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(yesterday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTradeBook = () => {
  let payload = {
    ucc: getUserId.value,
    segment: segment.value.exch,
    fromDate: formateDate(fromDate.value),
    toDate: formateDate(toDate.value),
  };
  store.dispatch("tradebook/getTradeBookFromApi", payload);
};

const formateDate = (data) => {
  const originalDate = new Date(data); // Assuming your original date is in YYYY-MM-DD format
  const formattedDate = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
};

const daysinMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const formatDate = (paloadDate) => {
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
  const [toyeardate] = formatDate(toDate.value).split("-");
  if (Number(toyeardate) <= curYear.value) {
    const [fyear, fmon, fday] = formatDate(fromDate.value).split("-");
    fromDate.value = (Number(fyear) - 1).toString() + "-" + fmon + "-" + fday;
    const [tyear, tmon, tday] = formatDate(toDate.value).split("-");
    toDate.value =
      (Number(tyear) - 1).toString() +
      "-" +
      "03" +
      "-" +
      Number(daysinMonth(Number(tyear) - 1, 3).toString());
  }
};

const nextYear = () => {
  const [toyeardate] = formatDate(toDate.value).split("-");

  if (Number(toyeardate) !== curYear.value) {
    console.log("toyeardate", toyeardate);
    console.log("curyear", curYear.value);
    const [fyear, fmon, fday] = formatDate(fromDate.value).split("-");
    fromDate.value = new Date(
      (Number(fyear) + 1).toString() + "-" + fmon + "-" + fday
    );
    const [tyear, tmon, tday] = formatDate(toDate.value).split("-");
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
  console.log("check");
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
  // store.dispatch("reports/getTradeBookFromApi");
  setDate();
});
</script>

