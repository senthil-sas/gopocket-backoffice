<template>
<div>
    <div v-if="isBox">
      <box class="w-full p-3" >
        <div class="flex mt-4">
          <icon name="profile" height="18" width="18" class="mr-4"/>
          <p class="primaryColor text-[14px]">
            
            {{ getProfileData.customer_name }}
          </p>
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4">
          <div class="flex">
            <icon name="date" height="18" width="18" class="mr-4"/>
            <p class="primaryColor text-[14px]">
              {{ formatDate(getProfileData.fsl_dob) }}
            </p>
          </div>
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4 gap-4 items-center">
          <icon name="mail" height="18" width="18"/>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.email_id }}
          </p>
          <span class="ml-auto cursor-pointer" @click="updateEmailOrMobile('email')"><icon name="edit" height="16" width="16" /></span>
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4 gap-4 items-center">
          <icon name="phone" height="18" width="18"/>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.mobile_no }}
          </p>
          <span class="ml-auto cursor-pointer"  @click="updateEmailOrMobile('mobile')"><icon name="edit" height="16" width="16" /></span>
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4">
          <icon name="address" height="18" width="18" class="mr-4"/>
          <div class="primaryColor text-[14px]">
            <div class="primaryColor text-[14px] leading-[1.3rem]">
              <!-- {{ getProfileData.address ? getProfileData.address.join(', ') : 'NA' }} -->
              {{ getProfileData.primary_address  }}

            </div>
          </div>
        </div>
      </box>
      <box class="w-full p-3 my-3" >
          <p class="primaryColor text-[14px]">Your PAN</p>
          <p class="pb-3 text-[20px] violet-color">
            {{ getProfileData.fsl_pan_card }}
          </p>
          <p class="primaryColor text-[14px]">Your Demat (BO)</p>
          <p class="pb-3 text-[20px] violet-color">
            {{ getProfileData.fsl_demat_id ? getProfileData.fsl_demat_id : 'NA' }}
          </p>
          <p class="primaryColor text-[14px]">Your Support code</p>
          <p class="pb-1 text-[#070A26] flex justify-between items-center" >
            <span class="text-[20px] violet-color" v-if="supportText != '....'">{{ getProfileData?.fsl_support_code ? getProfileData?.fsl_support_code : 'NA'}}</span>
            <span class="text-[18px]" v-if="supportText == '....'">&#x2022;&#x2022;&#x2022;&#x2022;</span>
            <span class="select-none">
                <span class="text-blue-400 hover:text-blue-600 mx-3 text-xs cursor-pointer" @click="viewSupportCode()" v-if="supportText == '....'">View</span>
                <span class="text-blue-400 hover:text-blue-600 text-xs cursor-pointer" @click="hideSupportCode()" v-if="supportText != '....'">Hide</span>
                <span class="text-[#070A26] ml-2 text-xs cursor-pointer" v-if="supportText != '....'" @click="resetSupportCode()">Reset</span>
            </span>
          </p>
      </box>
    </div>

  <div v-if="!isBox" class="p-5">
        <div class="flex mt-4">
          <icon name="profile" height="18" width="18" class="mr-4"/>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.customer_name }}
          </p>
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4">
          <div class="flex">
            <icon name="date" height="18" width="18" class="mr-4"/>
            <p class="primaryColor text-[14px]">
              {{ formatDate(getProfileData.fsl_dob) }}
            </p>
          </div>
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4 gap-4 items-center">
          <icon name="mail" height="18" width="18" />
          <p class="primaryColor text-[14px]">
            {{ getProfileData.email_id }}
          </p>
          <!-- <span class="ml-auto cursor-pointer"><icon name="edit" height="16" width="16" /></span> -->
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4 gap-4 items-center">
          <icon name="phone" height="18" width="18"/>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.mobile_no }}
          </p>
          <!-- <span class="ml-auto cursor-pointer"><icon name="edit" height="16" width="16" /></span> -->
        </div>
        <hr class="mt-4" />
        <div class="flex mt-4">
          <icon name="address" height="18" width="18" class="mr-4"/>
          <div class="primaryColor text-[14px]">
            <div class="primaryColor text-[14px] leading-[1.3rem] max-w-[265px]">
              <!-- {{ getProfileData.address ? getProfileData.address.join(', ') : 'NA' }} -->
              {{ getProfileData.primary_address  }}

            </div>
          </div>
        </div>

        <!--  -->
        <div class="my-8">
          <p class="primaryColor text-[14px]">Your PAN</p>
          <p class="pb-3 text-[20px] violet-color">
            {{ getProfileData.fsl_pan_card }}
          </p>
          <p class="primaryColor text-[14px]">Your Demat (BO)</p>
          <p class="pb-3 text-[20px] violet-color">
            {{ getProfileData.fsl_demat_id ? getProfileData.fsl_demat_id : 'NA' }}
          </p>
          <p class="primaryColor text-[14px]">Your Support code</p>
          <p class="pb-1 text-[#070A26] flex gap-[10rem] items-center" >
            <span class="text-[20px] violet-color" v-if="supportText != '....'">{{ getProfileData?.fsl_support_code ? getProfileData?.fsl_support_code : 'NA'}}</span>
            <span class="text-[18px]" v-if="supportText == '....'">&#x2022;&#x2022;&#x2022;&#x2022;</span>
            <span class="select-none">
                <span class="text-blue-400 hover:text-blue-600 mx-3 text-xs cursor-pointer" @click="viewSupportCode()" v-if="supportText == '....'">View</span>
                <span class="text-blue-400 hover:text-blue-600 text-xs cursor-pointer" @click="hideSupportCode()" v-if="supportText != '....'">Hide</span>
                <span class="text-[#070A26] ml-2 text-xs cursor-pointer" v-if="supportText != '....'" @click="resetSupportCode()">Reset</span>
            </span>
          </p>
        </div>
  </div>
</div>
</template>

<script>
import box from './utilComponents/box.vue'
import icon from './utilComponents/icons.vue'
import { mapGetters } from 'vuex';
import common from '../mixins/common';
export default {
    mixins: [common],
    components: { box, icon },
    data() {
        return {
            supportText: '....',
        }
    },
    computed: {
      ...mapGetters('profile', ['getProfileData', 'getLoader']),
    },
    methods: {
        startFromPan() {},
        viewSupportCode() {
            this.supportText = '1234'
        },
        hideSupportCode() {
            this.supportText = '....'
        },
        async updateEmailOrMobile(type) {
          this.$router.push('/profile').catch(()=>{})
          this.$store.commit('tabs/setProfileCurrentTab', JSON.stringify(5))
          this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id: 5 })
          this.$store.commit('popup/setUpdateType', type)
          this.$store.commit('popup/setIsEmailOrMobileUpdate', true)
        },
        async resetSupportCode() {
          this.$store.commit('popup/setIsResetSupportCode', true)
        },
    },
    props:{
      isBox: { type: Boolean, default: true }
    },

}
</script>