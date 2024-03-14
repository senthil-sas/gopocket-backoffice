import{t as B}from"./tabs-998dc85b.js";import{C as O}from"./frappe-charts.min.esm-7238fb4c.js";import{_ as b,e as o,f as l,g as t,b as s,y as D,j as n,k as c,t as w,T as I,F as y,h as N,u as S,q as L,m as _,l as h}from"./index-864637c1.js";import{F as V,K as A,B as M,H as Y,N as F,r as P,a as U}from"./ChevronUpDownIcon-37b76e37.js";import"./use-resolve-button-type-e886095c.js";import"./use-text-value-dc1e135f.js";import"./use-controllable-09911bc4.js";const z={data(){return{}},methods:{renderChart(){let e={dataPoints:{1657802159:20,1659357359:9,1664368559:18,1665491759:10,1667651759:9,1688473475:57},start:new Date("2022-07-04"),end:new Date};new O("#heatmap",{type:"heatmap",data:e,countLabel:"trade",discreteDomains:1,radius:2,spaceRatio:5,valuesOverPoints:5,height:200,heatmap:{block_size:25},truncateLegends:!0}).draw()}},mounted(){setTimeout(()=>{this.renderChart()},0)}},j={class:"flex justify-start items-center w-screen"},H=t("div",{id:"heatmap"},null,-1),J=[H];function K(e,r,f,x,a,p){return o(),l("div",j,J)}const q=b(z,[["render",K]]),E={components:{Listbox:V,ListboxButton:A,ListboxLabel:M,ListboxOption:Y,ListboxOptions:F,CheckIcon:P,ChevronUpDownIcon:U},data(){return{fiancialYear:"",fiancialYears:[{name:"April 2022 - March 2023",id:0},{name:"April 2021 - March 2022",id:0},{name:"April 2020 - March 2021",id:0}]}},methods:{sendMail(){}}},R={class:"m-4"},G=S("Select Financial Year * "),Q={class:"relative mt-2"},W={class:"block truncate"},X={class:"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"},Z=t("p",{class:"secondary-color text-sm mb-4 max-w-[600px] leading-6"}," Please use the dropdown menu to choose the financial year to download the Tax P&L. ",-1),ee=t("div",null,[t("button",{type:"submit",class:"commonbtn"},"Download")],-1);function te(e,r,f,x,a,p){const d=s("ListboxLabel"),m=s("ChevronUpDownIcon"),u=s("ListboxButton"),T=s("CheckIcon"),k=s("ListboxOption"),$=s("ListboxOptions"),C=s("Listbox");return o(),l("div",null,[t("div",R,[t("form",{class:"gap-10 w-full",onSubmit:r[1]||(r[1]=D(i=>p.sendMail(),["prevent"]))},[n(C,{as:"div",modelValue:a.fiancialYear,"onUpdate:modelValue":r[0]||(r[0]=i=>a.fiancialYear=i),class:"max-w-[350px] mb-4"},{default:c(()=>[n(d,{class:"block text-sm font-medium leading-6 text-gray-900"},{default:c(()=>[G]),_:1}),t("div",Q,[n(u,{class:"min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"},{default:c(()=>[t("span",W,w(a.fiancialYear.name),1),t("span",X,[n(m,{class:"h-5 w-5 text-gray-400","aria-hidden":"true"})])]),_:1}),n(I,{"leave-active-class":"transition ease-in duration-100","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:c(()=>[n($,{class:"absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"},{default:c(()=>[(o(!0),l(y,null,N(a.fiancialYears,i=>(o(),L(k,{as:"template",key:i.id,value:i},{default:c(({active:g,fiancialYear:v})=>[t("li",{class:_([g?"violet-bg text-white":"text-gray-900","relative cursor-pointer select-none py-2 pl-8 pr-4"])},[t("span",{class:_([v?"font-semibold":"font-normal","block truncate"])},w(i.name),3),v?(o(),l("span",{key:0,class:_([g?"text-white":"text-indigo-600","absolute inset-y-0 left-0 flex items-center pl-1.5"])},[n(T,{class:"h-5 w-5","aria-hidden":"true"})],2)):h("",!0)],2)]),_:2},1032,["value"]))),128))]),_:1})]),_:1})])]),_:1},8,["modelValue"]),Z,ee],32)])])}const se=b(E,[["render",te]]),ae={components:{tabs:B,heatmap:q,tax_pnl:se},data(){return{currentTab:0}},methods:{changeTab(e){this.currentTab=e,sessionStorage.setItem("reportsTab",JSON.stringify(e)),this.$store.dispatch("tabs/setActiveTab",{path:this.$route.path,id:e})}},created(){let e=JSON.parse(sessionStorage.getItem("reportsTab"))||0;(e==0||e)&&this.changeTab(e)}},ne={key:0,class:"p-5 w-full"};function oe(e,r,f,x,a,p){const d=s("tabs"),m=s("heatmap"),u=s("tax_pnl");return o(),l(y,null,[n(d,{isBgBlue:!0,page:"reports",onActiveTab:p.changeTab},null,8,["onActiveTab"]),a.currentTab==0||a.currentTab==1?(o(),l("div",ne,[n(m)])):h("",!0),a.currentTab==2?(o(),L(u,{key:1})):h("",!0)],64)}const ue=b(ae,[["render",oe]]);export{ue as default};
