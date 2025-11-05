<template>
    <div class="relative w-full pl-4 pr-10">
        <!-- <Label class="text-[11px]">Reports:</Label> -->
        <Listbox v-model="internalValue">
                <ListboxButton
                    class="min-w-[180px] relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left sm:text-sm primary-color !font-bold">
                    <span class="block truncate">
                        {{ internalValue?.[labelKey] || placeholder }}
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute mt-1 min-w-[180px] max-h-60 w-fit rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                        <ListboxOption v-slot="{ active, selected }" v-for="(option, i) in options" :key="i"
                            :value="option" as="template">
                            <li :class="[
                                active ? 'bg-[#F0F6FD] text-[#3977DE]' : 'text-gray-900',
                                'relative cursor-pointer select-none py-2 pl-3 pr-4 flex items-center gap-2 primary-color font-bold',
                            ]" @click="clickHandler()">
                                <span v-if="isSso">
                                    <img :src="redirectSvg" alt="redirectSvg" class="h-4 w-4">
                                </span>
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                ]">
                                    {{ option[labelKey] }}
                                </span>

                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-1 text-[#3977DE]">
                                    <!-- <CheckIcon class="h-4 w-4" aria-hidden="true" /> -->
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
        </Listbox>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import redirectSvg from "../assets/redirection.svg"
import { useStore } from 'vuex'
const store = useStore()

// Props
const props = defineProps({
    modelValue: {
        type: Object,
        default: null,
    },
    options: {
        type: Array,
        required: true,
    },
    labelKey: {
        type: String,
        default: 'name',
    },
    placeholder: {
        type: String,
        default: 'Select option',
    },
    isSso: {
        type: Boolean,
        default:false
    }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Local reactive state to sync with v-model
const internalValue = ref(props.modelValue)

// Watch for external changes
watch(
    () => props.modelValue,
    (val) => {
        internalValue.value = val
    }
)

// Emit changes back up
watch(internalValue, (val) => {
    emit('update:modelValue', val)
})

const clickHandler = () => {
    if(props.isSso) {
        store.dispatch("appcodeBasedRedirection", internalValue.value.appcode)
        return
    }
}
</script>
