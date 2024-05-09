<template>
  <div class="w-full">
    <v-frappe-chart
      type="pie"
      :labels="['Total A/C Started', 'Esign Completed','A/C Opened']"
      :data="[{ values: getmisReportData.pieChartData.values }]"
    />
  </div>
  <!-- <div class="w-full">
    <v-frappe-chart
  type="bar"
  :labels="getmisReportData.BarChartData.labelName"
  :data="[
    { name: 'Dataset 1', values: [18, 40, 30, 35, 8, 52, 17, -4] },
    { name: 'Dataset 2', values: [30, 50, -10, 15, 18, 32, 27, 14] },
  ]"
  :bar-options="{
    stacked: 1, 
  }"
/>
  </div> -->
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { VFrappeChart } from "vue-frappe-chart";
import { useStore } from "vuex";

const store =useStore();

const getmisReportData = computed( () =>{
    const arrObj = store.getters["misreport/getmisReportData"];
    const totalAcc =  arrObj.reduce((acc, curr) => acc + Number(curr.totalAccBo), 0);
    const totalEsign = arrObj.reduce((acc, curr) => acc + Number(curr.totalAccEsign), 0);
    const totalOpened= arrObj.reduce((acc, curr) => acc + Number(curr.totalAccBo), 0);
    // const barChartlabel = arrObj.map(item => item.date);
    // const piedata=arrObj.map(item =>{
    //   // console.log(item,"check");
    //   const values=[Number(item.totalAccBo),Number(item.totalAccEsign),Number(item.totalAccBo)];
    //   return {
    //   name:item.date,
    //   values:values
    //   }
    // });
    // console.log(piedata,"piechart");

    return {
     pieChartData:{
      labelName:['Total A/C Started', 'Esign Completed','A/C Opened'],
      values:[totalAcc,totalEsign,totalOpened],  
     }
    //  BarChartData:{
    //   labelName:barChartlabel,
    //   values:piedata
    //  }
    };
  } 
);
</script>

<style>
</style>