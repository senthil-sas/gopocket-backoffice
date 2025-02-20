<template>
  <div>
    <div class=" gap-4 items-end mt-4">
      <div v-if="activeReportTab != 2">
        <div class="primary-color text-[14px] mb-2">Segment</div>
        <Listbox as="div" v-model="segment" class="">
          <div class="relative">
            <ListboxButton
              class="min-h-[40px] relative w-full text-xs cursor-pointer  rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900  ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
              <span class="block truncate text-[14px]">{{ segment.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
              leave-to-class="opacity-0">
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="i in segments" :key="i.id" :value="i" v-slot="{ active, segment }">
                  <li :class="[
                    active ? 'violet-bg text-white' : 'text-gray-900',
                    'relative cursor-pointer select-none py-2 pl-8 pr-4',
                  ]">
                    <span :class="[
                      segment ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]">{{ i.name }}</span>
                    <span v-if="segment" :class="[
                      active ? 'text-white' : 'text-indigo-600',
                      'absolute inset-y-0 left-0 flex items-center pl-1.5',
                    ]">
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
        <div class="primaryColor text-[14px]  mb-2">From Date</div>
        <div>
          <VDatePicker :max-date="today" v-model="fromDate" :popover="popover"
            :masks="{ input: 'DD-MM-YYYY', modelValue: 'YYYY-MM-DD' }" type="date" mode="date"
            class=" min-h-[40px]   text-[14px]" :dateFormat="'YYYY-MM-DD'">
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div
                class=" flex min-h-[40px] relative w-full  text-[14px] cursor-pointer items-center justify-between  rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900  ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                <input :value="inputValue" placeholder="DD-MM-YYYY" v-on="inputEvents"
                  class="w-full h-full ml-1  text-[14px] outline-none cursor-pointer" readonly />
                <button type="button"
                  class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                  @click="() => togglePopover()">
                  <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                </button>
              </div>
            </template>
          </VDatePicker>
        </div>
        <div class="h-5"></div>
      </div>

      <div>
        <div class="primary-color text-[14px] mb-2">To Date</div>
        <div>
          <VDatePicker :max-date="today" is-required v-model="toDate" :popover="popover"
            :masks="{ input: 'DD-MM-YYYY', modelValue: 'YYYY-MM-DD' }" type="date" mode="date" class="w-[150px]"
            :dateFormat="'YYYY-MM-DD'">
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div
                class=" flex  min-h-[40px] relative w-full  text-[14px] cursor-pointer items-center justify-between  rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900  ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                <input :value="inputValue" placeholder="DD-MM-YYYY" is-required v-on="inputEvents"
                  class="w-full h-full ml-1  text-[14px] outline-none cursor-pointer" readonly />
                <button type="button"
                  class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                  @click="() => togglePopover()">
                  <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                </button>
              </div>
            </template>
          </VDatePicker>
        </div>
        <div class="h-5"></div>
      </div>

      <div class="flex align-center justify-end">
        <button class="commonbtn" :disabled="!fromDate || !toDate" @click="getTradeBook">
          <spinner v-if="loader" />
          <span v-else>Get Reports</span>
        </button>
        <div class="h-5"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Icons from "../../components/utilComponents/icons.vue";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const store = useStore();
const segment = ref({ name: "Equity", id: 0, exch: "NSE" });
const segments = ref([
  { name: "Equity", id: 0, exch: "NSE" },
  { name: "Futures & Options", id: 0, exch: "NFO" },
  { name: "Currency", id: 0, exch: "CDS" },
]);

const activeReportTab = computed(() => store.getters["reports/getActiveReportTab"]);
const popover = ref({
  visibility: "click",
  placement: "bottom-start",
});

const fromDate = ref();
const toDate = ref();
const today = ref(new Date());
const loader = computed(() => store.getters["getLoader"]);

const getTradeBook = () => {
  if(!fromDate.value || !toDate.value) return
  let payload = {
    "exchange": segment.value.exch,
    "from_date": (window as any).formatDate(fromDate.value, 'D'),
    "to_date": (window as any).formatDate(toDate.value,'D'),
  }
  localStorage.setItem('tradeBookDates', JSON.stringify({ fromDate: new Date(fromDate.value).toString(), toDate: new Date(toDate.value).toString() }))
  if (activeReportTab.value === 0) {
    store.dispatch("boReports/getTradebookFromApi", payload);
  } else if (activeReportTab.value === 2) {
    store.dispatch("boReports/getLedgerdata", payload);
  }
};

onMounted(async() => {
  const localData = JSON.parse(localStorage.getItem('tradeBookDates')!)
  if(localData && Object.keys(localData).length) {
    fromDate.value = new Date(localData.fromDate)
    toDate.value = new Date(localData.toDate)
  }
});
</script>