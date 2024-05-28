<template>
 <div>
    <div class="mb-4 primary-color !font-bold text-sm">
        Nominee Details
    </div>

    <div class="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-col-3 sm:grid-cols-2 gap-8 h-auto">
        <div v-for="(i, id) in mergedNomineeList" :key="id" class="p-3 border-[0.02rem] rounded-lg ">
            <div class="flex justify-between">
                <span class="primary-color !font-semibold text-sm">Nominee {{ id + 1 }}</span>
                <span class="primary-color text-sm cursor-pointer" @click="i.nominee_number ? deleteNominee(i.nominee_number) : deleteNewNominee(i.id)">
                    <icon name="delete" height="16" width="16" class="hover:text-red-600"/>
                </span>
            </div>

            <div class="my-3">
                <div class="flex flex-wrap gap-10 pt-4">
                    <span class="secondary-color text-sm  sm:min-w-[150px]">Full name</span>
                    <span class="primary-color text-sm">{{ i.firstname || i.nominee_name }}</span>
                </div>
                <div class="flex flex-wrap gap-10 pt-4">
                    <span class="secondary-color text-sm  sm:min-w-[150px]">Relationship</span>
                    <span class="primary-color text-sm">{{ i.relationship ? i.relationship : 'NA' }}</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 h-[50px] items-center mt-2">
                    <span class="secondary-color text-sm  sm:min-w-[150px]">Nominee Share <span class="primary-color"></span></span>
                    <div class="flex flex-wrap textColor">
                        <span v-if="id == 0">
                            <span class="flex flex-nowrap gap-2">
                                <input
                                    type="range"
                                    :class="isShare1Disable ? 'cursor-not-allowed' : 'cursor-pointer'"
                                    @input="onShareChange($event, id)"
                                    min="1"
                                    :max="this.mergedNomineeList.length == 1 ? 100 : this.mergedNomineeList.length == 2 ? 99 : this.mergedNomineeList.length == 3 ? 98 : ''"
                                    :disabled="isShare1Disable || this.mergedNomineeList.length == 1"
                                    v-model="i.allocation"
                                />
                                <span>{{ i.percentage_allocation ? i.percentage_allocation : i.allocation }}%</span>
                            </span>
                        </span>
                        <span v-if="id == 1">
                            <span class="flex flex-nowrap gap-2">
                                <input
                                    type="range"
                                    class="cursor-pointer"
                                    @input="onShareChange($event, id)"
                                    min="1"
                                    :max="this.mergedNomineeList.length == 1 ? 100 : this.mergedNomineeList.length == 2 ? 99 : this.mergedNomineeList.length == 3 ? 98 : ''"
                                    v-model="i.allocation"
                                />
                                <span>{{ i.percentage_allocation ? i.percentage_allocation : i.allocation }}%</span>
                            </span>
                        </span>
                        <span v-if="id == 2">
                            <span class="flex flex-nowrap gap-2">
                                <input
                                    type="range"
                                    class="cursor-pointer"
                                    @input="onShareChange($event, id)"
                                    min="1"
                                    :max="this.mergedNomineeList.length == 1 ? 100 : this.mergedNomineeList.length == 2 ? 99 : this.mergedNomineeList.length == 3 ? 98 : ''"
                                    v-model="i.allocation"
                                />
                                <span>{{ i.percentage_allocation ? i.percentage_allocation : i.allocation }}%</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="h-7 mt-4 flex justify-between">
        <div class="text-sm primaryColor">
            Total share : <span>{{ this.percentageCalculation }} %</span>
        </div>

        <span class="error-msg"  v-if="decimalPercentage() != 0">Nominee share percentage not accept decimal value</span>
    </div>
    <div class="mt-4 mb-5 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2" :class="mergedNomineeList.length < 3 ? 'justify-between' : 'sm:justify-end'">
        <button
            v-if="mergedNomineeList.length < 3 && getNomineeList.length == 0"
            class="commonbtn"
            @click="addMoreNominee()"
        >
            Add Another Nominee
        </button>
        <button
            class="border-[#753ED7] text-white primaryBtnColor commonbtn"
            @click="submitNomineeDetails()"
        >
            <spinner v-if="getdeleteloader"/><span v-else>Continue</span>
        </button>
    </div>

    <deleteNominee/>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import icon from '../../../components/utilComponents/icons.vue'
import deleteNominee from '../../../store/modules/deleteNominee.vue'
export default {
    components: { icon,deleteNominee },
    data() {
      return {
      sharePer: 100,
      sharePercentageError: "",
      percentage: "",
      percentageCalculation:"",
      share1: "",
      share2  : "",
      share3: "",
      isShare1Disable: false,
        }
    },
    computed: {
        ...mapGetters('nominee',['getNomineeList','getshowNomineeDetails']),
        ...mapGetters('nominee',['getNomineeDetails','getnomineedialog']),
        ...mapGetters(['getLoader']),
        ...mapGetters('nominee', ['getdeleteloader']),

        mergedNomineeList() {

            // Merging getNomineeList and getNomineeDetails
            let merged = [...this.getNomineeList, ...this.getNomineeDetails]; 
            merged = merged.flat();
            return merged;
        }
    },
    methods: {
        addMoreNominee() {
            if(this.mergedNomineeList?.length == 3) return;
            this.$store.commit('nominee/setNomineeStage', 'addNominee')
        },
        backToHome() {
            this.$store.commit('nominee/setNomineeStage', 'initialList')
        },
        deleteNominee(id) {
            this.$store.dispatch('nominee/deleteOldNominee',id)
        },

        deleteNewNominee(id){
            this.$store.commit('nominee/deleteNominee', id)
            this.$store.commit('nominee/setnomineedialog', true);
         },


 onShareChange(eve, id) {
      let share1 = 0;
      let share2 = 0;
      let share3 = 0;
      if (id == 0) {
        this.share1 = parseFloat(eve.target.value);
        share1 = parseFloat(eve.target.value);
        if (this.mergedNomineeList.length == 2) {
          share2 = parseFloat(100) - parseFloat(share1);
        }
        if (this.mergedNomineeList.length == 3) {
         share2 = (parseFloat(100) - parseFloat(share1)) / parseFloat(2);
         share3 = (parseFloat(100) - parseFloat(share1)) / parseFloat(2);
        }
      } else if (id == 1) {
        this.share1 = this.mergedNomineeList[0].allocation;
        if (this.mergedNomineeList.length == 2) {
          this.share2 = parseFloat(eve.target.value);
          share2 = parseFloat(eve.target.value);
          this.share1 = parseFloat(100) - parseFloat(share2);
        } else {
          if (
            parseFloat(100) - parseFloat(this.mergedNomineeList[0].allocation) >
            parseFloat(eve.target.value)
          ) {
            share2 = parseFloat(eve.target.value);
            share3 =
              parseFloat(100) - (parseFloat(this.share1) + parseFloat(share2));
          } else {
            share2 =
              (parseFloat(100) - parseFloat(this.share1)) / parseFloat(2);
            share3 =
              (parseFloat(100) - parseFloat(this.share1)) / parseFloat(2);
          }
        }
      } else if (id == 2) {
        this.share1 = this.mergedNomineeList[0].allocation;
        if (
          parseFloat(100) - parseFloat(this.mergedNomineeList[0].allocation) >
          parseFloat(eve.target.value)
        ) {
          share3 = parseFloat(eve.target.value);
          share2 =
            parseFloat(100) - (parseFloat(this.share1) + parseFloat(share3));
        } else {
          share2 = (parseFloat(100) - parseFloat(this.share1)) / parseFloat(2);
          share3 = (parseFloat(100) - parseFloat(this.share1)) / parseFloat(2);
        }
      }
      this.share2 = share2
      this.share3 = share3
      
      this.percentageCalculation = Number(this.share1) + Number(this.share2) + Number(this.share3)
      if (this.mergedNomineeList[0]) {
        this.mergedNomineeList[0].percentage_allocation   = this.share1;
        this.mergedNomineeList[0].nomOneAllocation = this.share1;
      }
      if (this.mergedNomineeList[1]) {
          this.mergedNomineeList[1].percentage_allocation = share2;
          this.mergedNomineeList[1].nomTwoAllocation = share2;
      }
      if (this.mergedNomineeList[2]) {
          this.mergedNomineeList[2].percentage_allocation = share3;
          this.mergedNomineeList[2].nomThreeAllocation = share3;
      }
    },


    async submitNomineeDetails() {
      if(this.decimalPercentage() == 0){
        let json = {
          nominee1:this.share1,
          nominee2:this.share2,
          nominee3:this.share3
        }

        this.$store.dispatch('nominee/saveSharePercent',json, )
      }

    },

    decimalPercentage(){
      let percentage1 = (this.share1 % 1)
      let percentage2 = (this.share2 % 1)
      let percentage3 = (this.share3 % 1)

      let totalDecimal = percentage1 + percentage2 + percentage3
      return totalDecimal
    }
  },
  async created() {
        await this.$store.dispatch('nominee/NomineeDetails');
        console.log(this.mergedNomineeList);
    if(this.mergedNomineeList?.length == 1){
      this.share1 = this.mergedNomineeList[0]?.percentage_allocation ? this.mergedNomineeList[0]?.percentage_allocation : this.mergedNomineeList[0]?.allocation
      this.share2 = this.mergedNomineeList[1]?.percentage_allocation ? this.mergedNomineeList[1].percentage_allocation : this.mergedNomineeList[1]?.allocation ? this.mergedNomineeList[1]?.allocation : 0,
      this.share3 = this.mergedNomineeList[2]?.percentage_allocation ? this.mergedNomineeList[2].percentage_allocation : this.mergedNomineeList[2]?.allocation ? this.mergedNomineeList[2].allocation : 0
      this.percentageCalculation = this.share1 + this.share2 + this.share3
    }else if(this.mergedNomineeList?.length == 2){
      this.share1 = this.mergedNomineeList[0]?.percentage_allocation ? this.mergedNomineeList[0]?.percentage_allocation : this.mergedNomineeList[0]?.allocation
      this.share2 = this.mergedNomineeList[1]?.percentage_allocation ? this.mergedNomineeList[1].percentage_allocation : this.mergedNomineeList[1]?.allocation ? this.mergedNomineeList[1]?.allocation : 0,
      this.share3 = this.mergedNomineeList[2]?.percentage_allocation ? this.mergedNomineeList[2].percentage_allocation : this.mergedNomineeList[2]?.allocation ? this.mergedNomineeList[2]?.allocation : 0
      this.percentageCalculation = this.share1 + this.share2 + this.share3
    }else if(this.mergedNomineeList?.length == 3){
      console.log(this.mergedNomineeList);
      this.share1 = this.mergedNomineeList[0]?.percentage_allocation ? this.mergedNomineeList[0]?.percentage_allocation : this.mergedNomineeList[0]?.allocation
      this.share2 = this.mergedNomineeList[1]?.percentage_allocation ? this.mergedNomineeList[1].percentage_allocation : this.mergedNomineeList[1]?.allocation ? this.mergedNomineeList[1]?.allocation : 0,
      this.share3 = this.mergedNomineeList[2]?.percentage_allocation ? this.mergedNomineeList[2].percentage_allocation : this.mergedNomineeList[2]?.allocation ? this.mergedNomineeList[2]?.allocation : 0
      this.percentageCalculation = this.share1 + this.share2 + this.share3
    }
  },    mounted() {

    }
}
</script>