<template>
    <div class="p-4">
        <Listbox as="div" v-model="income" class="max-w-[350px] mb-6">
            <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Your Annual Income *
            </ListboxLabel>
            <div class="relative mt-2">
                <ListboxButton
                    class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span class="block truncate">{{ income.name }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption as="template" v-for="i in incomeRanges" :key="i.id" :value="i"
                            v-slot="{ active, income }">
                            <li
                                :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                <span :class="[income ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.name
                                }}</span>
                                <span v-if="income"
                                    :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>

        <Listbox as="div" v-model="incomeProofType" class="max-w-[350px] mb-6">
            <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Select income proof type *
            </ListboxLabel>
            <div class="relative mt-2">
                <ListboxButton
                    class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span class="block truncate">{{ incomeProofType.name }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption as="template" v-for="i in incomeProofs" :key="i.id" :value="i"
                            v-slot="{ active, incomeProofType }">
                            <li
                                :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                <span :class="[incomeProofType ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.name
                                }}</span>
                                <span v-if="incomeProofType"
                                    :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>

        <div class="primary-color text-sm py-2">To activate the segments SEBI requires you to share your income proof with {{ $store.state.brokerName }}</div>

        <!-- vue file agent -->
        <div class="w-[350px] h-[180px] bg-violet-50 text-violet-600 flex justify-center items-center rounded my-4 cursor-pointer font-extrabold border border-gray-300">
            <span class="text-xl mx-1">+</span> <span class="text-sm">Income Proof</span>
        </div>

        <div class="text-base primary-color !font-bold py-4">
            Declaration
        </div>

        <div class="text-sm secondary-color pb-4 max-w-[700px] leading-6">
            I accept and acknowledge that Nidhi retains the authority to request any additional documents, clarifications, or information regarding the income I have declared above. 
        </div>

        <div class="flex">
            <fieldset class="mt-4">
              <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div v-for="confirmation in confirmations" :key="confirmation.id" class="flex items-center">
                  <input v-model="confirmationAccept" :value="confirmation.title"  :id="confirmation.id" name="notification-method" type="radio" class="h-4 w-4 border-gray-300 accent-[#753ED7] cursor-pointer" />
                  <label :for="confirmation.id" class="ml-3 block text-sm font-medium leading-6 text-gray-900 cursor-pointer">{{ confirmation.title }}</label>
                </div>
              </div>
            </fieldset>
        </div>

        <div class="py-8">
            <button class="commonbtn" :disabled="confirmationAccept == ''">Update financial information</button>
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
            exposure: '',
            incomeRanges: [
                { name: '0-1 lakh', id: 0 },
                { name: '1-5 lakhs', id: 0 },
                { name: '5-10 lakhs', id: 0 },
                { name: '10-20 lakhs', id: 0 },
                { name: 'More than 20 lakhs', id: 0 }],
            income: '',
            incomeProofs: [
                { name: 'Bank account statement for the last 6 months', id: 'Bank account statement for the last 6 months' },
                { name: 'Copy of ITR acknowledgement', id: 'Copy of ITR acknowledgement' },
                { name: 'The latest salary slip', id: 'The latest salary slip' },
            ],
            incomeProofType: '',
            confirmations : [
                { id: 'I accept above declaration', title: 'I accept above declaration' },
            ],
            confirmationAccept: ''
        }
    },
    watch: {
        income(val) {
            console.log(val,'val');
        }
    },
}
</script>