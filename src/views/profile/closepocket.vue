<template>
      <div class="flex mt-4">
            <icon name="profile" height="18" width="18" class="mr-4"/>
            <p class="primaryColor text-[14px]">
              
              {{ getProfileData.customer_name }}
            </p>
          </div>
</template>

<script setup>
import { mapGetters } from 'vuex';

const { getProfileData } = mapGetters('profile', ['getProfileData']);
</script>
