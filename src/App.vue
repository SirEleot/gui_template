<template>
  <div id="app" :class="{development: isDev}">     
    <component :is="currentPage"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OptionsMenu from './views/OptionsMenu'
import GameMetal from './views/GameMetal'

export default {
  name: 'App',
  computed:{
    ...mapState(['currentPage', 'showDevTool', 'isSmartphone', 'devPage', 'inventoryEnable', 'background', 'loadScreen']),
    ...mapState('inventory',['checkInventory']),
    deathScreen(){
      return this.$store.state.deathScreen.active;
    },
    appWidthUnit: function () {
      const appWidth = document.getElementById('app').offsetWidth / 100;
      const widthUnit = Math.ceil(appWidth) + 'px';
      return widthUnit;
    },
    hudShow(){
      return this.$store.state.hud.hudShow;
    },
    isDev(){
      return process.env.NODE_ENV == 'development';
    },
    dialogMenuShow: function() {
      return this.$store.state.dialogMenu.show
    }
  },
  methods:{
    setData(fnc, data){
      this.$store.commit(fnc, data)
    },
    dispatch(fnc, data){
      this.$store.dispatch(fnc, data)
    },
    openFamily(isRequest, name="", money=0){      
      this.setData('setFamilyData', {isRequest, name, money})
    },
    close(){
      this.setData("setPage", "")
    }
  },
  components: {
    OptionsMenu,
    GameMetal
  },
  mounted(){
    window.setData = this.setData;
    window.dispatch = this.dispatch;
    window.close=this.close;
    window.openFamily = this.openFamily;
    const htmlTag = document.getElementsByTagName('html')[0];
    htmlTag.style.fontSize = this.appWidthUnit;
    if(this.isDev){
      this.setData("setPage", this.devPage)
      this.$store.commit('setLoadScreen', false)
      // this.$store.commit('inventory/updateCheckInventory', {
      //     equip:[
      //         [[0,-1],[0,-1],[0,-1],[0,-1],[0,-1],[0,-1],[0,-1],[0,-1],[0,-1],[0,-1]],
      //         [[0,-1],[0,-1],[0,-1],[0,-1]]
      //     ],
      //     items:[[23,1,1,0],[13, 1, 2, 1],[76, 1, 13, 0],[18, 15, 5, 1],[5, 1, 7, 0, 2, 5000]]
      // });
    }
  }
}
</script>

<style lang="scss" src="./styles/app.scss"/>
