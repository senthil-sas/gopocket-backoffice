<template>
  <div class="px-4 py-5 max-w-[1200px] ">
    <div class=" mb-4 ">
      <h2 class="text-sm font-semibold mb-4">Account Details : </h2>
      <div class="flex mt-5 justify-between">
        <div class="mr-4 text-[14px]"> User ID :</div>
        <div>
          <p class="primaryColor text-[14px]">
            {{ getProfileData.uccCode }}
          </p>
        </div>
      </div>

      <div class="flex mt-5 relative justify-between items-center divide">
        <div class="mr-4  text-[14px]">Your PAN :</div>

        <div class="relative flex items-center">
          <p v-if="!showPassword" class="primaryColor text-[14px]  ">
            {{ getProfileData.panCard }}
          </p>
          <span v-else class="primaryColor text-[14px] w-fit text-end">{{ maskPAN(getProfileData.panCard) }}</span>
          <!-- Toggle showPassword when eye icon is clicked -->
          <span class="ml-2 cursor-pointer flex items-center" @click="showPassword = !showPassword">
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 016 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4 ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          </span>
        </div>
      </div>
      <div class="border-b border-gray-300 mt-5"></div>
      <h2 class="text-sm font-semibold mb-5 mt-5">Demat details </h2>




      <div class="flex mt-5 justify-between">
        <div class="mr-4 text-[14px]"> Depository Name:</div>
        <p class="primaryColor text-[14px]">
          {{ getProfileData.dematId ? getProfileData.dematId : 'NA' }}
        </p>
      </div>
      <div class="flex mt-5 justify-between">
        <div class="mr-4 text-[14px]"> Demat Account Number:</div>
        <p class="primaryColor text-[14px]">
          {{ getProfileData.dematId ? getProfileData.dematId : 'NA' }}
        </p>
      </div>
    </div>
    <div class="border-b border-gray-300 mb-4 mt-5"></div>


    <div class=" ">
      <h2 class="text-sm font-semibold mb-4">Change TPIN </h2>
      <p class="secondary-color text-sm mb-4 max-w-[600px] leading-6">Your TPIN (Telephone PIN) enables you to quickly
        verify your identity over the phone, ensuring faster service </p>

      <div class="mb-6 relative mt-5 justify-between flex">
        <label class=" text-sm mb-1">View TPIN</label>
        <div class="flex items-center">
          <p v-if="!showTpin" class="primaryColor text-[14px]  ">
            {{ getProfileData.fsl_support_code }}
          </p>
          <span v-else class="primaryColor text-[14px]">
            {{ maskTPIN(getProfileData.fsl_support_code) }}
          </span>
          <span class=" ml-2 cursor-pointer flex items-center" @click="showTpin = !showTpin">
            <svg v-if="!showTpin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4 ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 016 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4 ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          </span>
        </div>
      </div>
      <div class="border-b border-gray-300 mb-4 mt-5"></div>


      <div>
        <h2 class="text-sm font-semibold mb-4">Change Pin</h2>
        <form>
          <div class="mb-4">
            <label class="primary-color text-sm mb-1" for="oldTPIN">Enter old TPIN <span class="red">*</span> </label>
            <input type="password" id="oldTPIN"
              class="w-[350px]  block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 " autocomplete="off">
          </div>
          <div class="mb-4">
            <label class="primary-color text-sm mb-1" for="newTPIN">Enter new TPIN <span class="red">*</span> </label>
            <input type="password" id="newTPIN"
              class=" w-[350px] block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 " autocomplete="off">
          </div>
          <div class="mb-6">
            <label class="primary-color text-sm mb-1" for="reenterTPIN">Re-enter new TPIN <span class="red">*</span>
            </label>
            <input type="password" id="reenterTPIN"
              class="w-[350px] block h-10 rounded-md border-0 py-1.5 px-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 input-width" autocomplete="off">
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
  components: {},
  data() {
    return {
      showPassword: true,
      showTpin: true,
      //   getProfileData: {
      //   fsl_pan_card: "ABCDE1234F", 
      // },
    };
  },
  methods: {
    toggleTpinVisibility() {
      this.showtpin = !this.showtpin;
    },
    maskPAN(pan) {
      if (pan && pan.length === 10) {
        return `${pan.substring(0, 1)}*${pan.substring(2, 4)}****${pan.substring(8)}`;
      }
      return pan;
    },
    maskTPIN(tpin) {
      if (typeof tpin === 'string') {
        return tpin.replace(/./g, '*'); // Example masking logic (replace each character with *)
      }
      return '';
    }
  },
  computed: {
    ...mapGetters('boReports', ['getProfileData']),
  },
};
</script>

<style>
.card {
  @apply border-[0.02rem] p-3 w-[400px] rounded-lg
}

input[type="password"],
input[type="password"]:focus {
  background-color: transparent;
  /* or use 'inherit' */
}

.red {
  color: red;
}
</style>