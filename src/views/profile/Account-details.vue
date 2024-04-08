<template>
    <div class="p-4 max-w-[600px]">
      <div class=" mb-4">
        <p class="mb-4 primary-color !font-bold text-sm">Account Details : </p>
  
        <div class="flex mt-4">
          <div class="mr-4 text-[14px]"> User ID :</div>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.name }}
          </p>
        </div>
        <div class="flex mt-4 relative items-center">
          <div class="mr-4  text-[14px]">Your PAN :</div>
          <p v-if="!showPassword" class="primaryColor text-[14px] w-[450px] py-1 px-2">
            {{ getProfileData.fsl_pan_card }}
          </p>
          <input v-else type="password" :value="getProfileData.fsl_pan_card" class="primaryColor text-[14px] focus:none w-[450px] py-1 px-2 " />
          <!-- Toggle showPassword when eye icon is clicked -->
          <span class="ml-2 cursor-pointer" @click="showPassword = !showPassword">
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 016 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          </span>
        </div>
        
        <p class="mb-4 mt-4 primary-color !font-bold text-sm">Demat Details :</p>
  
        <div class="flex mt-4">
          <div class="mr-4 text-[14px]"> Depository Name:</div>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.fsl_demat_id ? getProfileData.fsl_demat_id : 'NA' }}
          </p>
        </div>
        <div class="flex mt-4">
          <div class="mr-4 text-[14px]"> Demat Account Number:</div>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.fsl_demat_id ? getProfileData.fsl_demat_id : 'NA' }}
          </p>
        </div>
      </div>
  
      <div class=" ">
        <h1 class="mb-4 primary-color !font-bold text-sm">Change TPIN</h1>
        <p class="secondary-color text-sm mb-4 max-w-[600px] leading-6">Your TPIN (Telephone PIN) allows you to authenticate yourself over the phone for faster service. </p>
        <p class="secondary-color text-sm mb-4 max-w-[600px] leading-6">TPIN is a 4 digit (numeric) code between 1000 and 9999. </p>

<div class="mb-6 relative">
  <label class="primary-color text-sm mb-1">View TPIN</label>
  <input v-if="!showTpin" type="text" :value="getProfileData?.fsl_support_code" class="w-full block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6" readonly>
  <input v-else type="password"  :value="getProfileData.fsl_support_code" class=" w-full block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 " readonly>
  <span class="absolute top-0 right-0 mt-9 mr-3 cursor-pointer" @click="showTpin = !showTpin">
    <svg v-if="!showTpin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 016 0Z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  </span>
</div>

  
        <div>
          <h2 class="text-sm font-semibold mb-4">Change Pin</h2>
          <form>
            <div class="mb-4">
              <label class="primary-color text-sm mb-1" for="oldTPIN">Enter old TPIN <span class="red">*</span> </label>
              <input type="password" id="newTPIN" class="w-full block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 input-width">
            </div>
            <div class="mb-4">
              <label class="primary-color text-sm mb-1" for="newTPIN">Enter new TPIN <span class="red">*</span> </label>
              <input type="password" id="newTPIN" class="w-full block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 input-width">
            </div>
            <div class="mb-6">
              <label class="primary-color text-sm mb-1" for="reenterTPIN">Re-enter new TPIN <span class="red">*</span> </label>
              <input type="password" id="reenterTPIN" class="w-full block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 input-width">
            </div>
            <button type="submit" class="commonbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    components: {  },
    data() {
      return {
        showPassword: true,
        showTpin:true,
      };
    },
      methods: {
    toggleTpinVisibility() {
      this.showtpin = !this.showtpin;
    },
  },
    computed: {
      ...mapGetters('profile', ['getProfileData']),
    },
  };
  </script>
  
  <style>
  .card {
    @apply border-[0.02rem] p-3 w-[400px] rounded-lg
  }
  input[type="password"],
  input[type="password"]:focus {
    background-color: transparent; /* or use 'inherit' */
  }
 
  .red{
    color: red;
}
  </style>
  