<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <form @submit.prevent="onSubmit()">
                                <div class="px-6">
                                    <div class="flex justify-center">
                                        <img :src="logo" alt="logo" class="max-w-[20%]">
                                    </div>
                                    <div class="flex flex-col content-center justify-center">
                                        <div class="text-center">
                                            <p class="text-primary font-semibold text-[20px] text-center pt-[24px] pb-[16px]">
                                                Authorize</p>
                                            <p class="text-primary font-semibold text-[16px] text-center  pb-[16px]">
                                                Permission required by the app</p>
                                        </div>
                                        <ul class="list-disc px-6 ">
                                            <li>Access holding and positions portfolio</li>
                                            <li>Place, modify, and cancel otders</li>
                                            <li>View your account balance and margins</li>
                                            <li>View your profile details</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="px-[24px] flex flex-col justify-center pt-[22px]">
                                    <button type="submit"
                                        class="!rounded-[60px] h-[48px] w-full text-white font-semibold commonbtn">
                                        <span class="text-white font-semibold" v-if="!isLoading">Authorize</span>
                                        <spinner v-else="isLoading" />
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { computed } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { useStore } from 'vuex'
import logo from "../assets/images/client-logo.svg"

const store = useStore()

const isOpen = computed({
    get() {
        return store.getters["auth/getIsAuthorizeDialog"]
    },
    set() {
        store.commit("auth/setIsAuthorizeDialog")
    }
})

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

const isLoading = computed(() => store.getters["auth/getAuthLoader"])

const onSubmit = () => {
    const json = {
        "userId": store.getters["auth/getUserId"],
        "vendor": store.getters["getRedirectionAppCode"],
    }
    store.dispatch("auth/authorize", json)
}
</script>
