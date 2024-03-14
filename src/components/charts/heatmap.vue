<template>
<div>
    <v-frappe-chart
      class="w-full"
      type="heatmap"
      :data="getDataPoints"
      :start="getStartDate"
      :end="getEndDate"
    />
</div>
</template>

<script>
import { Chart } from 'frappe-charts';
import { mapGetters } from 'vuex';

import { VFrappeChart } from "vue-frappe-chart"
export default {
    components: {
        VFrappeChart,
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters('reports',['getChartObj', 'getStartDate', 'getEndDate', 'getDataPoints'])
    },
}
</script>

<style>
</style>