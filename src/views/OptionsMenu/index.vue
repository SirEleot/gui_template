<template>
  <div class="options-menu">
    <div class="options-menu__header">
      <div class="navigation">
        <header-navigation-item
          v-for="(item, index) in navItems"
          v-show="showNavElement(item.location)"
          :key="index"
          :item="item"
          :rightTab="rightTab"
        />
      </div>
      <div class="don">
        <div class="don__info">
          <div class="desc">coin (Donate)</div>
          <div class="balance">{{ coins }}</div>
        </div>
        <button class="don__btn" @click="donate">+</button>
      </div>
      <div class="close">
        <div class="close__desc">
          <div class="top">{{loc('mm_main_or')}}</div>
          <div class="bottom">{{loc('mm_main_or_esc')}}</div>
        </div>
        <close-button @close="exit" />
      </div>
    </div>
    <div class="options-menu__main">
      <component :is="rightTab" />
    </div>
    <Dialog  v-if="dialog" :dialog="dialog"/>
    <CaptAttack  v-if="captAttack"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import StatisticsTab from './Tabs/StatisticsTab'
import SettingsTab from './Tabs/SettingsTab'
import OrganizationTab from './Tabs/OrganizationTab'
import ReportsTab from './Tabs/ReportsTab'
import InformationTab from './Tabs/InformationTab'
import HeaderNavigationItem from './common/HeaderNavigationItem'
import CloseButton from './common/CloseButton'
import Dialog from './common/OptionDialog'
import CaptAttack from './common/CaptAttack'

export default {
  name: 'OptionsMenu',

  components: {
    StatisticsTab,
    SettingsTab,
    OrganizationTab,
    ReportsTab,
    InformationTab,
    HeaderNavigationItem,
    CloseButton,
    Dialog,
    CaptAttack
  },

  data: function() {
    return {
      navItems: [
        { title: 'mm_main_nav_t_1', description: 'mm_main_nav_d_1', location: 'StatisticsTab' },
        { title: 'mm_main_nav_t_2', description: 'mm_main_nav_d_2', location: 'OrganizationTab' },
        { title: 'mm_main_nav_t_3', description: 'mm_main_nav_d_3', location: 'InformationTab' },
        { title: 'mm_main_nav_t_4', description: 'mm_main_nav_d_4', location: 'SettingsTab' },
        { title: 'Помощь', description: 'Репорт', location: 'ReportsTab' }
      ]
    }
  },

  computed: {
    ...mapState('optionsMenu', ['currentTab', 'statistics', 'balance', 'fraction', 'captAttack', 'dialog']),
    ...mapState('donate', ['coins']),
    ...mapGetters('localization', ['loc']),
    rightTab: function() {
      return this.currentTab ? this.currentTab : 'StatisticsTab'
    }
  },

  methods: {
    donate: function() {
      window.mp.trigger("mmenu:open:donate");
    },
    showNavElement(el){
      if(el == 'OrganizationTab' && this.fraction.id < 1) return false;
      if(el == 'OrganizationTab' && this.fraction.id < 1) return false;
      return true;
    },
    exit: function() {
      window.mp.trigger("cef:mmenu:close")
    }
  }
}
</script>

<style lang="scss" scoped>
.options-menu {
  width: 100%;
  height: 100%;
  background: center / cover no-repeat url("/img/optionsMenu/bg.png");
  font-family: "Bebas Neue";
  padding: 2rem 5rem 0 5rem;
  position: relative;
  z-index: 10;
  &__header {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .navigation {
      display: flex;
      margin: 0 2.5rem 0 0;
    }
    &-capt-team{
      color: #fff;
    }
    .don {
      display: flex;
      &::before {
        content: "";
        width: 2rem;
        height: 2rem;
        background: center / cover no-repeat url("/img/optionsMenu/money.svg");
        margin: 0 0.75rem 0 0;
      }
      &__info {
        display: flex;
        flex-direction: column;
        letter-spacing: 0.03em;
        margin: 0 1rem 0 0;
        .desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .balance {
          font-size: 1.2rem;
          color: #FFFFFF;
        }
      }
      &__btn {
        border: 0.1rem solid #B6D300;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-family: "Bebas Neue";
        color: #fff;
      }
    }
    .close {
      display: flex;
      margin: 0 0 0 auto;
      &__desc {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        letter-spacing: 0.03em;
        margin: 0 1rem 0 0;
        .top {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .bottom {
          font-size: 1.2rem;
          color: #FFFFFF;
        }
      }
    }
  }
  &__main {
    // padding: 3.55rem 0 0 0;
    height: 100%;
  }
}
</style>
