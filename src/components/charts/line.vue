<template>
        <div id="linechart"></div>
</template>
<script>
import { Chart } from 'frappe-charts';
export default {
    methods: {
        renderChart() {
            let chart = new Chart("#linechart", { // or DOM element
                data: {
                    labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],

                    datasets: [
                        {
                            name: "Some Data",
                            values: [25, 40, 30, 35, 8, 52, 17, -4]
                        },
                    ],

                    // yMarkers: [{
                    //     label: "Marker", value: 70,
                    //     options: { labelPos: 'left' }
                    // }],
                    // yRegions: [{
                    //     label: "Region", start: -10, end: 50,
                    //     options: { labelPos: 'right' }
                    // }]
                },

                // title: "Trade Report",
                type: 'line', // or 'bar', 'line', 'pie', 'percentage'
                height: 300,
                // colors: ['purple', '#000000', '#a2a2a2'],

                tooltipOptions: {
                    formatTooltipX: d => (d + '').toUpperCase(),
                    // formatTooltipY: d => d + ' pts',
                }
            });
            chart.draw()
        }
    },
    mounted() {
        setTimeout(() => {
            this.renderChart();
        }, 0);
    },
}
</script>