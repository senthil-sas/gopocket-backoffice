<template>
  <div>
      <div v-if="isBox">
        <box class="w-full p-3" >
          <p class="loginHeader font-bold py-2 header">Personal Details</p>
  
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
             <div class="flex pl-5">
            <icon name="male" height="20" width="20" v-if="getProfileData.gender == 'MALE' || getProfileData.gender == 'Male'"/>
            <icon name="female" height="20" width="20" v-if="getProfileData.gender == 'FEMALE' || getProfileData.gender == 'Female'"/>
            <p class="primaryColor text-[14px] ml-2">
              {{ getProfileData.gender || "NA" }}
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
            <div class="flex pl-5">
            <icon name="male" height="20" width="20" v-if="getProfileData.gender == 'MALE' || getProfileData.gender == 'Male'"/>
            <icon name="female" height="20" width="20" v-if="getProfileData.gender == 'FEMALE' || getProfileData.gender == 'Female'"/>
            <p class="primaryColor text-[14px] ml-2">
              {{ getProfileData.gender || "NA" }}
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
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { reactive, computed } from 'vue';
  // import commonIcon from '@/components/commonIcon.vue';
  
  import box from './utilComponents/box.vue';
  import icon from './utilComponents/icons.vue';
  import { mapGetters } from 'vuex';
  import common from '../mixins/common';
  import { useStore } from 'vuex'
  
  const store = useStore()
  const getProfileData = computed(() => store.getters['profile/getProfileData']);
  const getLoader = computed(() => store.getters['profile/getLoader']);
  
  
  const supportText = ref('....');
  
  const startFromPan = () => {};
  const viewSupportCode = () => {
      supportText.value = '1234';
  };
  const hideSupportCode = () => {
      supportText.value = '....';
  };
  const updateEmailOrMobile = async (type: string) => {
      $router.push('/profile').catch(() => {});
      $store.commit('tabs/setProfileCurrentTab', JSON.stringify(5));
      $store.dispatch('tabs/setActiveTab', { path: $route.path, id: 5 });
      $store.commit('popup/setUpdateType', type);
      $store.commit('popup/setIsEmailOrMobileUpdate', true);
  };
  const resetSupportCode = async () => {
      $store.commit('popup/setIsResetSupportCode', true);
  };
  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`;
  }
  
  
  ;
  
  const props = defineProps({
    isBox: { type: Boolean, default: true }
  });
  </script>