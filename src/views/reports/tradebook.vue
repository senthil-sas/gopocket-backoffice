<template>
    <div>
        <div class="flex gap-4 items-end">
            <div>
                <div class="primary-color text-sm mb-1">Segment</div>
                <Listbox as="div" v-model="segment" class="w-[200px]">
                    <div class="relative">
                        <ListboxButton
                            class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span class="block truncate">{{ segment.name }}</span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                            leave-to-class="opacity-0">
                            <ListboxOptions
                                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption as="template" v-for="i in segments" :key="i.id" :value="i"
                                    v-slot="{ active, segment }">
                                    <li
                                        :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                        <span :class="[segment ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.name
                                        }}</span>
                                        <span v-if="segment"
                                            :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
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

            <!-- <div>
                <div class="primary-color text-sm mb-1">Symbol</div>
                <div>
                    <input type="text" name="symbol" id="symbol" class="block w-[200px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="symbol"/>
                </div>
                <div class="h-5"></div>
            </div> -->

            <div>
                <div class="primary-color text-sm mb-1">From Date</div>
                <div>
                    <input min="2023-04-01" type="date" name="fromDate" id="fromDate" class="w-[200px] px-2 block h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="fromDate"/>
                </div>
                <div class="h-5"></div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">To Date</div>
                <div>
                    <input type="date" name="toDate" id="toDate" class="w-[200px] px-2 block h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="toDate"/>
                </div>
                <div class="h-5"></div>
            </div>

            <div>
                <button class="commonbtn h-[40px]">Go</button>
                <div class="h-5"></div>
            </div>
        </div>

        <heatmap v-if="!getLoader" />
    </div>
</template>

<script>
import heatmap from '../../components/charts/heatmap.vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { mapGetters } from 'vuex'
export default {
    components: { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, ChevronUpDownIcon, heatmap },
    data() {
        return {
            segment: '',
            segments: [
                { name: 'Equity', id: 0 },
                { name: 'Futures & Options', id: 0 },
                { name: 'Currency', id: 0 },
                { name: 'Commodity', id: 0 },
                // { name: 'Mutual funds', id: 0 },
                // { name: 'Equity (external trades)', id: 0 },
                // { name: 'MF (external trades', id: 0 },
            ],
            symbol:'',
            fromDate: '',
            toDate: ''
        }
    },
    computed: {
        ...mapGetters('reports', ['getLoader'])
    },
    methods: {
        getFirstDayOfMonth() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
            const day = '01';
            return `${year}-${month}-${day}`;
        },
        getPreviousDay() {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const year = yesterday.getFullYear();
            const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
            const day = String(yesterday.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        }
    },
    mounted() {
        this.fromDate = this.getFirstDayOfMonth()
        this.toDate = this.getPreviousDay()
    },
    created() {
        this.$store.dispatch('reports/getTradeBookFromApi')
    },
}
</script>

