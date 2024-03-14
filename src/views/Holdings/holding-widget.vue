<template>
    <div class="flex justify-between divide-x w-full py-5">
        <div class="flex flex-col gap-2 px-5">
            <div class="primary-color text-sm">
                Total Investment
            </div>
            <div class="primary-color !font-semibold text-base">
                ₹ {{ getTotalInvestment ? ruppesFormat(parseFloat(getTotalInvestment).toFixed(2)) : '0.00' }}
            </div>
        </div>

        <div class="flex flex-col gap-2 pl-10 pr-5">
            <div class="primary-color text-sm">
                Current Value
            </div>
            <div class="primary-color !font-semibold text-base">
                ₹ {{ totalCurrentValue(getHoldingsData) ? ruppesFormat(totalCurrentValue(getHoldingsData)) : '0.00' }}
            </div>
        </div>

        <div class="flex flex-col gap-2 pl-10 pr-5">
            <div class="primary-color text-sm">
                Net P&L
            </div>
            <div class="!font-semibold text-base">
                <span :class="removeComma(totalNetPnl(getHoldingsData)) > 0 ? 'green-color' : removeComma(totalNetPnl(getHoldingsData)) < 0 ? 'red-color' : 'primary-color'">₹ {{ totalNetPnl(getHoldingsData) ? ruppesFormat(totalNetPnl(getHoldingsData)) : '0.00' }} </span>
                <span class="mx-2" :class="removeComma(totalNetPnlChg(getHoldingsData)) > 0 ? 'green-color' : removeComma(totalNetPnlChg(getHoldingsData)) < 0 ? 'red-color' : 'primary-color'">({{ totalNetPnlChg(getHoldingsData) ? totalNetPnlChg(getHoldingsData) : '0.00' }}%)</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import commonjs from "../../mixins/common"
export default {
    mixins: [commonjs],
    computed: {
        ...mapGetters('holdings', ['getHoldingsData','getTotalInvestment', 'getTotalcurrentValue', 'getTotalPnlChange', 'getDaysPnlChange', 'getTotalPnl', 'getDaysPnl'])
    }
}
</script>