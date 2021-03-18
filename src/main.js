import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import Vuebar from 'vuebar'
Vue.use(Vuebar)

Vue.use(VueVirtualScroller)

Vue.config.productionTip = false;

if(window.mp == undefined){
  window.mp = {
    trigger(...args){
      window.console.log(`Event name: ${args[0]}`)
      let params = "";
      for (let index = 1; index < args.length; index++) {
        params += `${args[index]},`;        
      }
      window.console.log(`Params: ${params}`);
    },
    invoke(...args){
      window.console.log(`Event name: ${args[0]}`)
      let params = "";
      for (let index = 1; index < args.length; index++) {
        params += `${args[index]},`;        
      }
      window.console.log(`Params: ${params}`);
    }
  }
}

window.mp.triggerServer = (...args)=>{
  window.mp.trigger('efwd', ...args);
};

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

if(window.mp.events)
{
	let api = {"chat:push": window.chatAPI.push, "chat:clear": window.chatAPI.clear, "chat:activate": window.chatAPI.activate, "chat:show": window.chatAPI.show}; 

	for(let fn in api)
	{
		window.mp.events.add(fn, api[fn]);
	}
}

Number.prototype.toLocaleString