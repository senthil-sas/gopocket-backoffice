<template>
    <div class="p-5">
        <div class="py-8 min-h-[426px]" v-if="getNomineeStage != 'nomineeSummary' && getNomineeStage != 'nomineeList'">
            <div class="flex justify-center items-center">
                <img :src="nomineesvg" alt="nominee" class="max-w-[15%] h-auto" />
            </div>
            <div class="text-center">
                <p class="primary-color text-sm mt-8 mb-2">
                    We highly recommend that you add a nominee to your account.
                </p>
                <p class="secondary-color text-xs py-2">
                    You can add upto 3 nominees to your demat account.
                </p>
            </div>
            <div class="my-6 flex justify-center gap-4">
                <button class="cancelbtn" @click="skip()">Opt Out</button>
                <button class="commonbtn" @click="addNominee()">Add Nominee</button>
            </div>
        </div>
        <add_nominee v-if="getNomineeStage == 'addNominee'" />
        <nominee_summary v-if="getNomineeStage == 'nomineeSummary' || getNomineeStage == 'nomineeList'" />
        <add_guardian v-if="getNomineeStage == 'addGuardian'" />
    </div>
</template>

<script>
import add_nominee from './add-nominee.vue'
import add_guardian from './add-guardian.vue'
import nominee_summary from './nominee-summary.vue'
import nomineesvg from '../../../assets/images/nominee.svg'
import { mapGetters } from 'vuex'
export default {
    components: { add_nominee, add_guardian, nominee_summary },
    data() {
        return {
            nomineesvg: nomineesvg
        }
    },
    computed: {
        ...mapGetters('nominee', ['getNomineeStage'])
    },
    methods: {
        addNominee() {
            this.$store.commit('nominee/setNomineeStage', 'addNominee')
        },
        skip() {

        }
    },
    created() {
        // nominee list retail with local store
        let nomineeList = JSON.parse(sessionStorage.getItem('nomineeList'))
        if(nomineeList && nomineeList?.length > 0) {
            this.$store.commit('nominee/setNomineeDetails', nomineeList)
        }
        this.$store.dispatch('nominee/getNomineeDetails')
    }
}
</script>