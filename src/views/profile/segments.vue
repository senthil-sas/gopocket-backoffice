<template>
    <div class="p-5" v-if="!getLoader">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-col-3 sm:grid-cols-2 gap-8 h-auto">
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_eq">Equities</label>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nse_eq" class="bluebtn mr-2" >NSE EQ</button>
                    <button id="accinfo_label_nse_eq" class="bluebtn mr-2" >BSE EQ</button>
                    <button id="accinfo_label_nse_mf" class="bluebtn" >NSE MF</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm min-h-[60px]">Equity derivatives, as well as contract-based assets,such as bonds, commodities and currencies, on NSE.</p>
                    <button v-if="getProfileData.segment.nse?.toUpperCase() == 'Y' && getProfileData.segment.bse?.toUpperCase() == 'Y'" id="accinfo_eq_isactive" class="commonbtn green">Active</button>   
                    <button v-if="getProfileData.segment.nse?.toUpperCase() == 'N' || getProfileData.segment.bse?.toUpperCase() == 'N'" id="accinfo_eq_isactive" class="commonbtn" @click="ekyc()">Activate Segment</button>  
                    <button v-if="getProfileData.segment.nse?.toUpperCase() == 'DORMANT' || getProfileData.segment.bse?.toUpperCase() == 'DORMANT'" id="accinfo_eq_isactive" class="commonbtn" @click="ekyc()">Start-KYC</button>                 
            </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_derivatives">Derivatives</label>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nfo" class="graybtn mr-2">NFO</button>
                    <button id="accinfo_label_nfo" class="graybtn mr-2">BFO</button>
                    <button id="accinfo_label_nse_cur" class="graybtn">NSE CUR</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm min-h-[60px]">Equity derivatives, as well as contract-based assets, such as bonds, commodities & currencies, on NSE</p>
                <!-- <button id="accinfo_derivatives_isactive" class="commonbtn" >Enable Segment</button> -->
                    <button v-if="getProfileData.segment.nfo?.toUpperCase() == 'Y' && getProfileData.segment.bfo?.toUpperCase() == 'Y'" id="accinfo_eq_isactive" class="commonbtn green">Active</button>   
                    <button v-if="getProfileData.segment.nfo?.toUpperCase() == 'N' || getProfileData.segment.bfo?.toUpperCase() == 'N'" id="accinfo_eq_isactive" class="commonbtn" @click="ekyc()">Activate Segment</button>  
                    <button v-if="getProfileData.segment.nfo?.toUpperCase() == 'DORMANT' || getProfileData.segment.bfo?.toUpperCase() == 'DORMANT'" id="accinfo_eq_isactive" class="commonbtn" @click="ekyc()">Start-KYC</button>
                </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_com">Commodities</label>
                <div class="crd-body mr-3">
                <div class="my-3 text-xs">
                    <button id="accinfo_label_mcx" class="redbtn mr-2">MCX</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm min-h-[60px]">Trade physical substances such as gold, crude oil, cotton, lead etc. on MCX.</p>
                <!-- <button id="accinfo_com_isactive" class="commonbtn">Perform KYC</button> -->
                    <button v-if="getProfileData.segment.mcx?.toUpperCase() == 'Y'" id="accinfo_eq_isactive" class="commonbtn green">Active</button>   
                    <button v-if="getProfileData.segment.mcx?.toUpperCase() == 'N'" id="accinfo_eq_isactive" class="commonbtn" @click="ekyc()">Activate Segment</button>  
                    <button v-if="getProfileData.segment.mcx?.toUpperCase() == 'DORMANT'" id="accinfo_eq_isactive" class="commonbtn" @click="ekyc()">Start-KYC</button>
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
        ...mapGetters('boReports', ['getProfileData']), 
        ...mapGetters(['getLoader'])


    },
    methods: {
        ekyc() {
            this.$store.dispatch('ekycReirection', "segment");
        }
    }

}
</script>