<template>
    <div class="p-5">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-col-3 sm:grid-cols-2 gap-8 h-auto">
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_eq">Equities</label>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nse_eq" class="bluebtn mr-2" >NSE EQ</button>
                    <button id="accinfo_label_nse_mf" class="bluebtn" >NSE MF</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm">Equity derivatives, as well as contract-based assets,such as bonds, commodities and currencies, on NSE.</p>
                    <button v-if="getSegments.fsl_nse == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_nse == 'Inactive'" id="accinfo_eq_isactive" class="commonbtn">Enable Segment</button>  
                    <button v-if="getSegments.fsl_nse == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Re-KYC</button>                 
            </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_derivatives">Derivatives</label>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nfo" class="graybtn mr-2">NFO</button>
                    <button id="accinfo_label_nse_cur" class="graybtn">NSE CUR</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm">Equity derivatives, as well as contract-based assets,such as bonds, commodities and currencies, on NSE.</p>
                <!-- <button id="accinfo_derivatives_isactive" class="commonbtn" >Enable Segment</button> -->
                    <button v-if="getSegments.fsl_nfo == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_nfo == 'Inactive'" id="accinfo_eq_isactive" class="commonbtn">Enable Segment</button>  
                    <button v-if="getSegments.fsl_nfo == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Re-KYC</button>
                </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_com">Commodities</label>
                <div class="crd-body mr-3">
                <div class="my-3 text-xs">
                    <button id="accinfo_label_mcx" class="redbtn mr-2">MCX</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm">Equity derivatives, as well as contract-based assets,such as bonds, commodities and currencies, on NSE.</p>
                <!-- <button id="accinfo_com_isactive" class="commonbtn">Perform KYC</button> -->
                    <button v-if="getSegments.fsl_mcx == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_mcx == 'Inactive'" id="accinfo_eq_isactive" class="commonbtn">Enable Segment</button>  
                    <button v-if="getSegments.fsl_mcx == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Re-KYC</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters('segment', ['getSegments'])
    },
    created() {
        this.$store.dispatch('segment/getSegmentsFromApi')
    },
}
</script>