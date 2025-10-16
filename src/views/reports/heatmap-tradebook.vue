<template>
    <div class="flex justify-center items-center heatmap_cus">
        <v-frappe-chart class="w-full h-[150px]" type="heatmap" :data="getDataPoints"
            :start="new Date(`${fromDateYear}`)" :end="new Date(`${toDateYear}`)"
             :truncateLegends="true" :colors="['#ebedf0', '#d4bff8', '#b893f4', '#8b5be4', '#3977de']"/>
        <!-- :start="new Date(dates.fromDate)"
            :end="new Date(dates.toDate)" -->
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { VFrappeChart } from "vue-frappe-chart"
import { computed, onMounted, PropType, ref, watch } from 'vue';
const store = useStore();
const props:any = defineProps({
    dates: {
        type: Object as PropType<Record<string, any>>
    }
}
)
const getDataPoints = computed(() => store.getters["boReports/getDataPoints"])
const fromDateYear = ref('');
const toDateYear = ref('');
const getTradeBook = (date) => {
    let json = {
        "segment": props.dates,
        "fromDate": formatDate(date),
        "toDate": formatDate(date)
    }
    store.dispatch('boReports/getTradeBookFromApi', json)
}

const getData = () => {
    let fromdate = new Date(props.dates.fromDate).getFullYear();
    let todate = new Date(props.dates.toDate).getFullYear();
    if (fromdate == todate) {
        fromDateYear.value = `${fromdate}-04-01`
        toDateYear.value = `${fromdate + 1}-03-31`
    } else {
        fromDateYear.value = `${todate - 1}-04-01`
        toDateYear.value = `${todate}-03-31`
    }
}

onMounted(() => getData())
</script>

<style>
.heatmap_cus .chart-legend {
    visibility: hidden !important;
}
</style>