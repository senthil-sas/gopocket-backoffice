<template>
  <div>
    <div class="flex gap-4 items-end">
      <div>
        <div class="primary-color text-xs mb-1">Segment</div>
        <Listbox as="div" v-model="segment" class="w-[200px]">
          <div class="relative">
            <ListboxButton
              class="min-h-[28px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <span class="block truncate">{{ segment.name }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronUpDownIcon
                  class="h-4 w-4 text-gray-400"
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
                      <CheckIcon class="h-4 w-4" aria-hidden="true" />
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
        <div class="h-5"></div>
      </div>

      <div>
        <button class="commonbtn h-[30px] !py-0">
          <span class="text-xs">Submit </span>
        </button>
        <div class="h-5"></div>
      </div>
    </div>


  </div>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { mapGetters } from "vuex";
export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    ChevronUpDownIcon,
  },
  data() {
    return {
      segment: "",
      segments: [
        { name: "Equity", id: 0 },
        { name: "Futures & Options", id: 0 },
        { name: "Currency", id: 0 },
        { name: "Commodity", id: 0 },
        // { name: 'Mutual funds', id: 0 },
        // { name: 'Equity (external trades)', id: 0 },
        // { name: 'MF (external trades', id: 0 },
      ],
      symbol: "",
      fromDate: "",
      toDate: "",
    };
  },
  computed: {
    ...mapGetters("reports", ["getLoader"]),
  },
  methods:{

    getFirstDayOfMonth() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
      const day = "01";
      return `${year}-${month}-${day}`;
    },
    getPreviousDay() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const year = yesterday.getFullYear();
      const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
      const day = String(yesterday.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    this.fromDate = this.getFirstDayOfMonth();
    this.toDate = this.getPreviousDay();
  },
  created() {
    this.$store.dispatch("reports/getTradeBookFromApi");
  },
};
</script>

