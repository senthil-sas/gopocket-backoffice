<template>
    <div>
        <div class="m-4">
        <form class="gap-10 w-full">
            <p class="mb-4 primary-color !font-bold text-sm">Account Closure</p>

            <Listbox as="div" v-model="Closure" class="max-w-[350px] mb-4">
                <ListboxLabel class="block text-sm semi-bold font-medium leading-6 text-gray-900 mb-4">Why do you wish to close your account with Pocket? <span class="red">*</span> 
                </ListboxLabel>
                <div class="relative mt-2">
                    <ListboxButton
                        class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <span class="block truncate">{{ Closure.name }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="i in Closures" :key="i.id" :value="i"
                                v-slot="{ active, Closure }">
                                <li
                                    :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                    <span :class="[Closure ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.name
                                    }}</span>
                                    <span v-if="Closure"
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
                If you close your account, you won’t be able to trade with Pocket. To reopen your account, you’ll have to complete the KYC process again and will get a new Demat account.             </p>
            <div>
                <button type="submit" class="commonbtn" @click.prevent="handleClosePocket">Continue</button>
            </div>
            <closepocket v-if="stage === 'closePocket'" />
        </form>
        </div>
    </div>
</template>

<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import closepocket from  '../profile/closepocket.vue'


export default {
    components: { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, ChevronUpDownIcon,closepocket },
    data() {
        return {
            Closure: '',
            stage: '', 
            Closures: [
                { name: 'High brokerage and charges', id: 0 },
                { name: 'Monthly maintenance charges', id: 0 },
                { name: 'Need better margins', id: 0 },
                { name: 'Problem with payment and withdrawal', id: 0 },
                { name: 'Need better order placement options', id: 0 },
                { name: 'App crashes', id: 0 },
                { name: 'Need better charts', id: 0 },
                { name: 'Issues with back office portals', id: 0 },
                { name: 'Problem with customer service', id: 0 },
                { name: 'App is complicated to understand', id: 0 },
                { name: 'Faced losses', id: 0 },
                { name: 'No time to focus on trading', id: 0 },
                { name: 'Others', id: 0 },


            ]
        }
    },
    methods: {
        handleClosePocket() {
            this.stage = 'closePocket'; 
        }
    },
}
</script>

<style>
.red{
    color: red;
}
</style>