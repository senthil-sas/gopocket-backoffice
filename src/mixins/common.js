import store from '../store/index'
export default {
    methods: {
        formatDate(date) {
            date = new Date(date)
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            if(isNaN(day)) return ''
            return `${day} - ${month} - ${year}`;
        },

        netPnlCalc(data) {
            let uploadedPrc = parseFloat(data['buyPrice'])
            let tradedQty = parseFloat(data['tradedQty'])
            let sellAmount = parseFloat(data['sellAmount'])
            let ltp = parseFloat(data['symbol'][0]['ltp'])
            let netQty = parseFloat(data['netQty'])
            let netPnl = 0
            let realizedPnl = sellAmount - (uploadedPrc * tradedQty);
            let unrealizedPnl = (netQty - tradedQty) * (ltp - uploadedPrc);
            netPnl = realizedPnl + unrealizedPnl;
            data['netPnl'] = netPnl
            return netPnl;
        },

        netChgCalc(data) {
            let netChg = 0;
            if(parseFloat(data["buyPrice"]) != 0) {
                netChg = ((parseFloat(data.symbol[0]['ltp']) - parseFloat(data["buyPrice"])) / parseFloat(data["buyPrice"])) * 100
                netChg = parseFloat(netChg).toFixed(2)
                data['netChg'] = netChg
            } else {
                netChg = '0.00'
            }
            return netChg;
        },

        totalNetPnl(array) {
            if (array?.length != 0) {
                let sum = array?.reduce(function (total, item) {
                    let netPnl = parseFloat(item["buyPrice"]) >= 0 ? (parseFloat(item.symbol[0]["ltp"]) - parseFloat(item["buyPrice"])) * parseFloat(item["netQty"]) : 0
                    return parseFloat(total) + netPnl
                }, 0);
                sum = sum ? parseFloat(sum).toFixed(2) : 0
                return sum;
            }
        },

        totalNetPnlChg(array) {
            if (array?.length != 0) {
                let totalchg = store.state.holdings.totalInvestment == 0 ? 0 : ((Number(this.totalCurrentValue(array)) - store.state.holdings.totalInvestment) / store.state.holdings.totalInvestment) * 100
                totalchg = totalchg == 'Infinity' ? 'NA' : totalchg
                totalchg = totalchg ? parseFloat(totalchg).toFixed(2) : 0
                return totalchg;
            }
        },

        totalCurrentValue(array) {
            if (array?.length != 0) {
                let sum = array?.reduce(function (total, item) {
                    return parseFloat(total) + (parseFloat(item["netQty"]) * parseFloat(item.symbol[0]["ltp"]))
                }, 0);
                sum = sum ? parseFloat(sum).toFixed(2) : 0
                return (sum);
            }
        },

        ruppesFormat(num) {
            var n1, n2;
            num = num + "" || "";
            // works for integer and floating as well
            n1 = num.split(".");
            n2 = n1[1] || null;
            n1 = n1[0]?.toString()?.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
            num = n2 ? n1 + "." + n2 : n1;
            return num;
        },

        removeComma(value) {
            let v = value?.toString().replace(/,/g, ",")
            return parseFloat(v);
        },
    },
  }