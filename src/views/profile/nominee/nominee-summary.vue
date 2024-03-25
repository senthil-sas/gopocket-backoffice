<template>
    <div>
        <div class="mb-4 primary-color !font-bold text-sm">
            Nominee Details
        </div>
        
        <div class="flex gap-3 flex-wrap">
            <div v-for="(i, id) in getNomineeList" :key="id" class="p-3 border-[0.02rem] rounded-lg max-w-[400px]">
                <div class="flex justify-between">
                    <span class="primary-color !font-semibold text-sm">Nominee {{ id + 1 }}</span>
                    <span class="primary-color text-sm cursor-pointer" @click="deleteNominee(id)">
                        <icon name="delete" height="16" width="16" class="hover:text-red-600"/>
                    </span>
                </div>

                <div class="my-3">
                    <div class="flex gap-10 pt-4">
                        <span class="secondary-color text-sm min-w-[150px]">Full name</span>
                        <span class="primary-color text-sm">{{ i.nominee_name ? i.nominee_name : 'NA' }}</span>
                    </div>
                    <div class="flex gap-10 pt-4">
                        <span class="secondary-color text-sm min-w-[150px]">Relationship</span>
                        <span class="primary-color text-sm">{{ i.relationship ? i.relationship : 'NA' }}</span>
                    </div>
                    <div class="flex gap-10 pt-4">
                        <span class="secondary-color text-sm min-w-[150px]">Nominee Share <span class="primary-color"></span></span>
                        <span class="primary-color text-sm">
                            <input class="accent-violet-600" type="range" min="1" max="100" v-model="i.percentage_allocation">
                            <div class="mt-1">
                                ({{ i.percentage_allocation }}%)
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-10 flex gap-3">
            <button type="submit" class="commonbtn" @click="addMoreNominee()" :disabled="getNomineeList?.length == 3">Add another nominee</button>
        </div>

        <p class="bg-violet-200 leading-6 primary-color !font-semibold text-sm rounded-md p-4 my-4 max-w-[800px]" v-if="getNomineeList?.length == 3">
            You have successfully allocated the maximum allotment of 3 Nominees to your Account.
            If you wish to include additional nominees, kindly remove an existing nominee before proceeding to add more.
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import icon from '../../../components/utilComponents/icons.vue'
export default {
    components: { icon },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters('nominee',['getNomineeList']),
        ...mapGetters('auth', ['getUserId'])
    },
    methods: {
        addMoreNominee() {
            if(this.getNomineeList?.length == 3) return;
            this.$store.commit('nominee/setNomineeStage', 'addNominee')
        },
        backToHome() {
            this.$store.commit('nominee/setNomineeStage', 'initialList')
        },
        deleteNominee(id) {
            this.$store.commit('nominee/deleteNominee', id)
        }
    },
    created() {
        // nominee list retail with local store
        let nomineeList = JSON.parse(sessionStorage.getItem('nomineeList'))
        if(nomineeList && nomineeList?.length > 0) {
            this.$store.commit('nominee/setNomineeDetails', nomineeList)
        }
        let userId = this.getUserId
        this.$store.dispatch('nominee/getNomineeDetails',userId)
    }
}
</script>