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
import reekyc from './modules/Re-ekyc'
import Documents from "./modules/documents"
import boReports from "./modules/boReports"
export default createStore({
  state: {
    brokerName: "RMONEY",
    ekycLink: 'https://e-kyc.rmoneyindia.com/e-kyc/?selected=NQ==',
    ssoRedirectionUrl: 'https://weblive.rmoneyindia.net/',
    myAppCode: 'TleoyPuHYUmhUsw',
    appSecret: 'yuhtdrWmUvdWlisrXBvlHslotbpoiuRzAwpoTgKQiuyrbEOuQnnLyGHHZZqeltAEownvrOOlsgdfUUvqwYYjm',
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
    loader: false,
    currenttab: "0",
    redirectionAppCode: "UgtsKytrlEXjsyQau"
  },

  mutations: {
    setWindowHeightWidth(state:any, payload:any) {
      state.windowWidth = payload.w
      state.windowHeigth = payload.h
    },
    setLoader(state:any, payload:any) {
      state.loader = payload
    },
    setcurrenttab(state:any, payload:any) {
      state.currenttab = payload
    },
  },

  actions: {
    ekycReirection({ state, dispatch, rootGetters }:any, action:string) {
      const userId = rootGetters["auth/getUserId"]
      const appcode = state.redirectionAppCode
      // // const redirectionUrl = 'https://e-kyc.rmoneyindia.com/account/?_gl=1*8b6een*_gcl_au*MTI3MjE1ODE5Ny4xNzU5MTI5MzYy*_ga*MjUxMTIyMzUyLjE3NTkxMjkzNjI.*_ga_JKBNJZVCSY*czE3NTkxNDUzMjMkbzIkZzEkdDE3NTkxNDU0NDkkajQxJGwwJGgw'
      // const redirectionUrl = `https://e-kyc-rmoneyindia-stg.app/account/user/validateCode?authCode=${authcode}&userId=${userId}&appname=RMoney&appcode=${appcode}&action=mobile/email/account`
      // window.open(redirectionUrl, '_blank');
      const json = {
        "userId": userId,
        "vendor": appcode,
        "action" : action
      }
      dispatch("auth/ssoRedirection", json)
    },

    addFunds() {
      const redirectUrl = "https://weblive.rmoneyindia.net/funds"
      window.open(redirectUrl, "_blank")
    },
    appcodeBasedRedirection({ state, dispatch, rootGetters, commmit }:any, appcode:string) {
      const userId = rootGetters["auth/getUserId"]
      // // const redirectionUrl = 'https://e-kyc.rmoneyindia.com/account/?_gl=1*8b6een*_gcl_au*MTI3MjE1ODE5Ny4xNzU5MTI5MzYy*_ga*MjUxMTIyMzUyLjE3NTkxMjkzNjI.*_ga_JKBNJZVCSY*czE3NTkxNDUzMjMkbzIkZzEkdDE3NTkxNDU0NDkkajQxJGwwJGgw'
      // const redirectionUrl = `https://e-kyc-rmoneyindia-stg.app/account/user/validateCode?authCode=${authcode}&userId=${userId}&appname=RMoney&appcode=${appcode}&action=mobile/email/account`
      // window.open(redirectionUrl, '_blank');
      state.redirectionAppCode = appcode 
      const json = {
        "userId": userId,
        "vendor": appcode,
      }
      dispatch("auth/ssoRedirection", json)
    },
  },

  getters: {
    getMonths: (state:any) => state.months,
    getWindowWidth: (state:any) => state.windowWidth,
    getLoader: (state:any) => state.loader,
    getcurrenttab: (state:any) => state.currenttab,
    getRedirectionAppCode: (state:any) => state.redirectionAppCode
  },

  modules: { tabs, bankDetails, nominee, reekyc, Documents, subAcc, giftStocks, auth, profile, segment, ledger, tradebook, holdings, positions, reports, funds, popup, boReports },
});
