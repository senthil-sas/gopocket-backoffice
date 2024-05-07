<template>
    <div class="p-5" v-if="!getLoader">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-col-3 sm:grid-cols-2 gap-8 h-auto">
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_eq">Equities</label>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nse_eq" class="bluebtn mr-2" >NSE EQ</button>
                    <button id="accinfo_label_nse_mf" class="bluebtn" >NSE MF</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm h-14">Equity derivatives, as well as contract-based assets,such as bonds, commodities and currencies, on NSE.</p>
                    <button v-if="getSegments.fsl_nse == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_nse == 'Inactive'" id="accinfo_eq_isactive" class="commonbtn">Activate Segment</button>  
                    <button v-if="getSegments.fsl_nse == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Start-KYC</button>                 
            </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_derivatives">Derivatives</label>
                <div class="crd-body mr-3">
                <div class="my-3 whitespace-nowrap text-xs">
                    <button id="accinfo_label_nfo" class="graybtn mr-2">NFO</button>
                    <button id="accinfo_label_nse_cur" class="graybtn">NSE CUR</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm h-14">Equity derivatives, as well as contract-based assets, such as bonds, commodities & currencies, on NSE</p>
                <!-- <button id="accinfo_derivatives_isactive" class="commonbtn" >Enable Segment</button> -->
                    <button v-if="getSegments.fsl_nfo == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_nfo == 'Inactive'" id="accinfo_eq_isactive" class="commonbtn">Activate Segment</button>  
                    <button v-if="getSegments.fsl_nfo == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Start-KYC</button>
                </div>
            </div>
            <div class="rounded-lg p-3 border-[0.02rem] dark:border-[#232325]">
                <label class="my-2 primary-color !font-semibold text-sm" id="accinfo_label_com">Commodities</label>
                <div class="crd-body mr-3">
                <div class="my-3 text-xs">
                    <button id="accinfo_label_mcx" class="redbtn mr-2">MCX</button>
                </div>
                <p class="secondary-color dark:text-[#94A3B8] mb-4 text-sm h-14">Trade physical substances such as gold, crude oil, cotton, lead etc. on MCX.</p>
                <div>
                <!-- <button id="accinfo_com_isactive" class="commonbtn">Perform KYC</button> -->
                    <button v-if="getSegments.fsl_mcx == 'Active'" id="accinfo_eq_isactive" class="commonbtn green" disabled>Active</button>   
                    <button v-if="getSegments.fsl_mcx == 'Inactive'" id="accinfo_eq_isactive" class="commonbtn">Activate Segment</button>  
                    <button v-if="getSegments.fsl_mcx == 'Dormant'" id="accinfo_eq_isactive" class="commonbtn">Start-KYC</button>
                </div>
                </div>
            </div>
        </div>
        <div >
                <div class="py-8">
                  <div class="fullSegment  h-16">
                    <p class="segmentColor">Equity (Stocks)</p>
                    <div class="spaceCheckbox">
                      <input type="checkbox" class="checboxColor w-4 h-4" v-model="equity">
                      <p class="textColor">NSE, BSE</p>
                    </div>
                  </div>
                  <div class="fullSegment  h-16">
                    <p class="segmentColor">Mutual Funds</p>
                    <div class="spaceCheckbox">
                      <input type="checkbox" class="checboxColor w-4 h-4" v-model="mFunds">
                      <p class="textColor">BSE</p>
                    </div>
                  </div>
                  <div class="fullSegment  h-16">
                    <p class="segmentColor">Equity Derivatives</p>
                    <div class="spaceCheckbox">
                      <input type="checkbox" class="checboxColor w-4 h-4" v-model="eDerivatives">
                      <p class="textColor">NSE, BSE</p>
                    </div>
                  </div>
                  <div class="fullSegment  h-16">
                    <p class="segmentColor">Currency Derivatives</p>
                    <div class="spaceCheckbox">
                      <input type="checkbox" class="checboxColor w-4 h-4" v-model="cDerivatives">
                      <p class="textColor">NSE, BSE</p>
                    </div>
                  </div>
                  <div class="fullSegment" :class="commodity ? 'lg:h-32 sm:h-32 md:h-16 h-32 2xl:h-16' : 'h-16'">
                    <p class="segmentColor">Commodity</p>
                    <div class="spaceCheckbox">
                      <input type="checkbox" class="checboxColor w-4 h-4" v-model="commodity">
                      <p class="textColor">MCX, NSE, BSE</p>
                    </div>
                    <!-- <p class="segmentColor" v-if="commodity">Select Category</p> -->
                    <!-- <div class="flex items-center" v-if="commodity">
                      <div
                          class="mr-4 flex radius4rem w-full"
                        >
                          <Menu as="div" class="relative inline-block text-left w-full">
                            <div class="">
                              <MenuButton
                                class="inline-flex h-10 w-full textColor truncate radius4rem border px-4 py-2 text-sm focus:outline-none whitespace-nowrap"
                              >{{ this.selectedMCX }}
                                <ChevronDownIcon class="ml-auto h-5 w-5" aria-hidden="true" />
                              </MenuButton>
                            </div>

                            <transition
                              enter-active-class="transition ease-out duration-100"
                              enter-from-class="transform opacity-0 scale-95"
                              enter-to-class="transform opacity-100 scale-100"
                              leave-active-class="transition ease-in duration-75"
                              leave-from-class="transform opacity-100 scale-100"
                              leave-to-class="transform opacity-0 scale-95"
                            >
                              <MenuItems
                                class="absolute right-0 z-10 mt-1 max-h-[200px] drop-shadow-md overflow-y-auto w-full origin-top-right radius4rem shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                <div
                                  class="py-1 bg-white"
                                  v-for="(dropdown, id) in McxForm"
                                  :key="id"
                                >
                                  <MenuItem
                                    v-slot="{ active }"
                                    @click="updateMcx(dropdown)"
                                  >
                                    <a
                                      :class="[
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'inline-block px-4 py-2 text-sm w-full cursor-pointer text-[13px]',
                                      ]"
                                    >
                                      {{ dropdown.name }}
                                    </a>
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </transition>
                          </Menu>
                    </div>
                    </div> -->
                  </div>
                  <!-- <div class="fullSegment  h-16">
                    <p class="flex primaryColor whitespace-wrap">Account Opening Charges</p> -->

                    <!-- <div class="spaceCheckbox">
                      <p class="text-[20px] textGreen" v-if="(!equity && !mFunds) && (commodity || cDerivatives || eDerivatives)">₹ 200</p>
                      <p class="text-[20px] textGreen" v-if="equity || mFunds">₹ 350</p>
                      <p class="text-[20px] textGreen" v-if="!equity && !mFunds && !commodity && !cDerivatives && !eDerivatives">₹ 0</p>
                    </div> -->

                    <!-- <div class="spaceCheckbox">
                      <p class="text-[20px] textGreen">₹{{ accOpenCharge = getCharges() }}</p>
                    </div> -->

                  <!-- </div> -->
                </div>

                <div class="flex items-start" v-if="equity || mFunds">
                  <input type="checkbox" class="accent-[#753ED7] mt-1" v-model="acceptTC">
                  <p class="tcText">I hereby agree to open a  <span class="primaryColor"> Demat account in CDSL </span>with Sky Commodities India Pvt Ltd and request to send digital contract notes to my mail ID <span class="primaryColor">{{ getPersonalDetailsField?.emailId }}</span></p>
                </div>
                <div class="flex items-start" v-if="(!equity && !mFunds) && (commodity || cDerivatives || eDerivatives)">
                  <input type="checkbox" class="accent-[#753ED7] mt-1" v-model="acceptTC">
                  <p class="tcText">I hereby request {{ brokerName }} (Sky Commodities India Pvt Ltd) to send digital contract notes to my mail ID <span class="primaryColor">{{ getPersonalDetailsField?.emailId }}</span></p>
                </div>
                <div class="flex sm:justify-end">
                  <button
                  class="commonbtn mt-5"
                    @click="continueToPayment"
                    :disabled="(!this.equity && !this.mFunds && !this.eDerivatives && !this.cDerivatives && !this.commodity) || !acceptTC || getLoader"
                    :class="(this.equity || this.mFunds || this.eDerivatives || this.cDerivatives || this.commodity) && acceptTC   ? 'primaryBtnColor text-white': 'bg-[#e0e0e0] secondaryColor cursor-not-allowed'"
                  >
                    <commonIcon name="loader" stroke="#ffffff" fill="none" v-if="getLoader"/>
                    <p v-if="!getLoader">
                      Continue
                    </p>
                    </button>
                </div>
                <div class="flex sm:justify-end h-2">
                  <errorMessage className="error" errMsg="please accept terms and conditions above" v-if="!acceptTC && (this.equity || this.mFunds || this.eDerivatives || this.cDerivatives || this.commodity)"></errorMessage>
                </div>
              </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            McxForm:[ {name:"Others"},{name:"Proprietary Traders"}, {name:"FPOs/Farmers"}, {name:"VCPs/Hedgers"}, {name:"Domestic Financial Institutional"}, {name:"Foreign Participants"},],
            commodity:true,

        }
    },
    computed: {
        ...mapGetters('profile', ['getSegments']), 
        ...mapGetters(['getLoader'])


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