<template>
    <div>
        <div class="m-4">
        <form class="gap-10 w-full" @submit.prevent="sendMail()">
            <Listbox as="div" v-model="fiancialYear" class="max-w-[350px] mb-4">
                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Select Financial Year *
                </ListboxLabel>
                <div class="relative mt-2">
                    <ListboxButton
                        class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <span class="block truncate">{{ fiancialYear.name }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="i in fiancialYears" :key="i.id" :value="i"
                                v-slot="{ active, fiancialYear }">
                                <li
                                    :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                    <span :class="[fiancialYear ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.name
                                    }}</span>
                                    <span v-if="fiancialYear"
                                        :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
            </Listbox>

            <p class="secondary-color text-sm mb-4 max-w-[600px] leading-6">
                Please use the dropdown menu to choose the financial year to download the Tax P&L.
            </p>
            <div>
                <button type="submit" class="commonbtn">Download</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
export default {
    components: { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, ChevronUpDownIcon },
    data() {
        return {
            fiancialYear: '',
            fiancialYears: [
                { name: 'April 2022 - March 2023', id: 0 },
                { name: 'April 2021 - March 2022', id: 0 },
                { name: 'April 2020 - March 2021', id: 0 },
            ]
        }
    },
    methods: {
        sendMail() {

        }
    },
}
</script>