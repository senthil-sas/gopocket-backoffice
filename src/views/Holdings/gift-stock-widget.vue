<template>
    <div class="flex justify-between divide-x w-full py-5">
        <div class="flex flex-col gap-2 px-5">
            <div class="primary-color text-sm">
                Name
            </div>
            <div class="primary-color !font-semibold text-base">
                {{ name }}
            </div>
        </div>

        <div class="flex flex-col gap-2 pl-10 pr-5">
            <div class="primary-color text-sm">
                Mobile Number
            </div>
            <div class="primary-color !font-semibold text-base">
                {{ mobileNo }}
            </div>
        </div>

        <div class="flex flex-col gap-2 pl-10 pr-5">
            <div class="primary-color text-sm">
                E-mail ID
            </div>
            <div class="primary-color !font-semibold text-base">
                {{ email }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: { type: String },
        mobileNo: { type: String },
        email: { type: String }
    } 
}
</script>