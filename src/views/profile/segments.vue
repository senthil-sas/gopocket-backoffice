<template>
    <div class="p-5" v-if="!getLoader">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-col-3 sm:grid-cols-2 gap-8 h-auto">
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <span class="justify-between flex items-center">
                  <label class=" primary-color !font-semibold text-sm my-2" id="accinfo_label_eq">Equities</label>

                        <button class="graybtn " v-if="getreKYCsegment.equCash == 1"  >Pending</button>
                    </span>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs ">
                    <button id="accinfo_label_nse_eq" class="bluebtn mr-2" >NSE EQ</button>
                    
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm h-14">Equity derivatives, as well as contract-based assets,such as bonds, commodities and currencies, on NSE.</p>
                    <button v-if="getSegments.fsl_nse == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_nse == 'Inactive' && getreKYCsegment.equCash == 1" id="accinfo_eq_isactive" class="commonbtn" disabled>Activate Segment</button>  
                   <button v-else-if="getSegments.fsl_nse == 'Inactive'" @click="equitesactive()" id="accinfo_eq_isactive" class="commonbtn"><span >Activate Segment</span></button>
                    <button v-if="getSegments.fsl_nse == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Start-KYC</button>                 
            </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <span class="justify-between flex items-center">
                  <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_derivatives"> Equity derivatives</label>

                        <button class="graybtn " v-if="getreKYCsegment.ed == 1"  >Pending</button>
                    </span>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nfo" class="graybtn mr-2">NFO</button>
                    
                    <!-- <button id="accinfo_label_nse_cur" class="graybtn">NSE CUR</button> -->
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm h-14">Equity derivatives, as well as contract-based assets, such as bonds, commodities & currencies, on NSE</p>
                <!-- <button id="accinfo_derivatives_isactive" class="commonbtn" >Enable Segment</button> -->
                    <button v-if="getSegments.fsl_nfo == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_nfo == 'Inactive' && getreKYCsegment.ed == 1" id="accinfo_eq_isactive" class="commonbtn" disabled>Activate Segment</button>  
                    <button v-else-if="getSegments.fsl_nfo == 'Inactive'" @click="edactive()" id="accinfo_eq_isactive" class="commonbtn"><span >Activate Segment</span></button>

                    <button v-if="getSegments.fsl_nfo == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Start-KYC</button>
                </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <span class="justify-between flex items-center">
                  <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_derivatives"> Currency derivatives</label>

                        <button class="graybtn " v-if="getreKYCsegment.cd == 1"  >Pending</button>
                    </span>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nfo" class="graybtn mr-2">NSE CUR</button>
                    
                    <!-- <button id="accinfo_label_nse_cur" class="graybtn">NSE CUR</button> -->
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm h-14">Equity derivatives, as well as contract-based assets, such as bonds, commodities & currencies, on NSE</p>
                <!-- <button id="accinfo_derivatives_isactive" class="commonbtn" >Enable Segment</button> -->
                    <button v-if="getSegments.fsl_cds == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_cds == 'Inactive'&& getreKYCsegment.cd == 1" id="accinfo_eq_isactive" class="commonbtn" disabled>Activate Segment</button>  
                    <button v-else-if="getSegments.fsl_cds == 'Inactive'" @click="cdactive()" id="accinfo_eq_isactive" class="commonbtn"><span >Activate Segment</span></button>

                    <button v-if="getSegments.fsl_cds == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Start-KYC</button>
                </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <span class="justify-between flex items-center">
                  <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_com">Commodities</label>

                        <button class="graybtn " v-if="getreKYCsegment.comm == 1"  >Pending</button>
                    </span>
                <div class="crd-body mr-3">
                <div class="my-3 text-xs">
                    <button id="accinfo_label_mcx" class="redbtn mr-2">MCX</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm h-14">Trade physical substances such as gold, crude oil, cotton, lead etc. on MCX.</p>
                <div>
                <!-- <button id="accinfo_com_isactive" class="commonbtn">Perform KYC</button> -->
                    <button v-if="getSegments.fsl_mcx == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_mcx == 'Inactive' && getreKYCsegment.comm == 1" id="accinfo_eq_isactive" class="commonbtn" disabled>Activate Segment</button>  
                    <button v-else-if="getSegments.fsl_mcx == 'Inactive'" @click="comactive()" id="accinfo_eq_isactive" class="commonbtn"><span>Activate Segment</span></button>

                    <button v-if="getSegments.fsl_mcx == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Start-KYC</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon} from '@heroicons/vue/20/solid'


export default {
  components:{
    Menu, MenuButton, MenuItem, MenuItems,ChevronDownIcon
  },
    data() {
        return {
       McxForm:[ {name:"Others"},{name:"Proprietary Traders"}, {name:"FPOs/Farmers"}, {name:"VCPs/Hedgers"}, {name:"Domestic Financial Institutional"}, {name:"Foreign Participants"},],
      checked: true,
      formConsent: true,
      selectedMailingLists: "",
      segmentActive: "",
      commodity:true,
      cDerivatives:true,
      eDerivatives:true,
      mFunds:true,
      equity:true,
      acceptTC:true,
      selectedMCX:'Others',
      acceptTCEq:true,
      accOpenCharge: 0
        }
    },
    computed: {
        ...mapGetters('profile', ['getSegments']), 
        ...mapGetters('reekyc', ['getloginloader']),
        ...mapGetters("segment", ["getSavedSegmentDetails"]),
        ...mapGetters("segment", ["getreKYCsegment"]),
        ...mapGetters("auth", ["getUserId"]),
    },

    methods: {
    equitesactive(){
      let json ={
        "uccCode": this.getUserId,
        "equCash": "1"
       }
          this.$store.dispatch('segment/saveSegmentDetails',json)
    },

    edactive(){
      let json ={
        "uccCode": this.getUserId,
        "ed": "1"
       }
          this.$store.dispatch('segment/saveSegmentDetails',json)
    },

    cdactive(){
      let json ={
        "uccCode": this.getUserId,
        "cd": "1"
       }
          this.$store.dispatch('segment/saveSegmentDetails',json)
    },
    
    comactive(){
      let json ={
        "uccCode": this.getUserId,
        "comm": "1"
       }
          this.$store.dispatch('segment/saveSegmentDetails',json)
    },
  },
  async created() {
    await this.$store.dispatch("segment/reKYCsegment");
  },

}
</script>


<style scoped>
.fullSegment{
  @apply grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 border-b items-center
}
.segmentColor{
  @apply text-[#070A26] whitespace-nowrap
}
.spaceCheckbox{
  @apply space-x-4 items-center flex
}


</style>