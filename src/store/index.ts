import { createStore } from "vuex";
import tabs from "./modules/tabs";
import bankDetails from "./modules/bankDetails";
import nominee from "./modules/nominee"
import subAcc from "./modules/subAccount"
import giftStocks from "./modules/giftStocks"
import auth from './modules/ssoLogin'
import profile from './modules/profile'
import segment from './modules/segment'
import tradebook from './modules/tradebook'
import holdings from './modules/holdings'
import positions from './modules/positions'
import reports from './modules/reports'
import funds from './modules/funds'
import popup from './modules/popup'
import ledger from './modules/ledger'
export default createStore({
  state: {
    brokerName: "GoPocket",
    ekycLink: 'https://ekyc.gopocket.in/',
    ssoRedirectionUrl: 'http://web.gopocket.in/',
    myAppCode: 'oJGBKnveAXcHOWG',
    version: "1.0.0",
    months: [
      { month: "Jan", id: "01" },
      { month: "Feb", id: "02" },
      { month: "Mar", id: "03" },
      { month: "Apr", id: "04" },
      { month: "May", id: "05" },
      { month: "Jun", id: "06" },
      { month: "Jul", id: "07" },
      { month: "Aug", id: "08" },
      { month: "Sep", id: "09" },
      { month: "Oct", id: "10" },
      { month: "Nov", id: "11" },
      { month: "Dec", id: "12" },
    ],
    windowWidth: 0,
    windowHeigth: 0,
    loader: false

  },

  mutations: {
    setWindowHeightWidth(state, payload) {
      state.windowWidth = payload.w
      state.windowHeigth = payload.h
    },
    setLoader(state, payload) {
      state.loader = payload
    }
  },

  actions: {},

  getters: {
    getMonths: state => state.months,
    getWindowWidth: state => state.windowWidth,
    getLoader: state => state.loader

  },

  modules: { tabs, bankDetails, nominee, subAcc, giftStocks, auth, profile, segment, ledger, tradebook, holdings, positions, reports, funds, popup },
});
