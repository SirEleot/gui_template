import keyTags from './keyTags'

export default {
  namespaced: true,

  state: {
    currentTab: null,
    keyTags,
    statistics: {
      level: 37,
      username: 'Charles Gonzales',
      exp: 54,
      phoneNumber: 305393,
      passportNumber: 305393,
      licenses: 'A / B / C / LV',
      bankCount: 76761,
      organization: 'Cityhall',
      rank: 'no',
      work: '',
      maritalStatus: {
        sex: 1,
        secondHalf: ""
      },
      premium: false,
      warns: 0,
      bans: 0,
      registrationDate: 1607024975000,
      // house: 'Эконом плюс',
    },
    property:{
      house: null,
      transport: [
        { id: 0, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 },
        { id: 1, name: 'Sentinel', numbers: 'V25JIN', price: 2000000 },
        { id: 2, name: 'Marvin', numbers: 'C15FIN', price: 5000000 },
        { id: 3, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 },
        { id: 4, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 },
        { id: 5, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 },
        { id: 6, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 },
        { id: 7, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 },
        { id: 8, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 },
        { id: 9, name: 'Sentinel', numbers: 'V25JIN', price: 5000000 }
      ],
      // transport: null,
      business: {
        number: 112,
        type: 1,
        name: 'MyBiz',
        tax: 10,
        taxCount: 240000,
        price: 5000000,
        products: [
          { title: 'product', maxCount: 300000, curCount: 300000, price: 120000 },
          { title: 'product', maxCount: 200000, curCount: 150000, price: 12000 },
          { title: 'product', maxCount: 300000, curCount: 150000, price: 120000 },
          { title: 'product', maxCount: 300000, curCount: 150000, price: 120000 },
          { title: 'product', maxCount: 300000, curCount: 150000, price: 120000 },
          { title: 'product', maxCount: 300000, curCount: 150000, price: 120000 },
          { title: 'product', maxCount: 300000, curCount: 150000, price: 120000 },
          { title: 'product', maxCount: 300000, curCount: 150000, price: 120000 },
          { title: 'product', maxCount: 300000, curCount: 150000, price: 120000 },
        ]
      },
      // business: null,
    },
    balance: 99000,
    settings:{
      noMicro: true,
      hint: false,
      showNames: false,
      showHud: false,
      voiceValue: 0,
      showMiniMap: false,
      muteLowLevel: false,
      muteLowLevelValue: 3,
      showDrift: false,
      showFamilyMembers: false,
      trafficOff: true
    },
    buttons:[
      {text: 'Открыть карту',  key: 27, name: "openMap", lock: true},
      {text: 'Микрофон', key: 66, name: "microphone", lock: false},
      {text: 'Инвентарь', key: 9, name: "inventory", lock: false},
      {text: 'Чат', key: 84, name: "chat", lock: true},
      {text: 'Ремень безопасности', key: 74, name: "belt", lock: false},
      {text: 'Открыть/закрыть транспорт', key: 76, name: "lock", lock: false},
      {text: 'Завести/заглушить транспорт', key: 50, name: "engine", lock: false},
      //{text: 'HUD', tag: 'F5'},
      //{text: 'Меню репоптов для админов', tag: 'F6'},
      //{text: 'Донат шоп/обьявления для weazel news/перезагрузить HUD', tag: 'F7'}
    ],
    reportRaiting: false,
    reports: [],
    fraction:{
      id: 0,
      bank: 0,
      canInvite: false,
      canKick: false,
      isLeader: false,
      canWhithdraw: false,
      canAccess: false,
      lastHour: 0,
      lastDay: 0,
      members: [],
      access:{},
      businesses: [{ ID: 0, TypeName: "Заправка", Mafia: "Yakudza" }]
    },
    dialog:null,
    captAttack: false
  },
  getters:{
    fracMembers(state){
      return state.fraction.members;
    }
  },
  mutations: {
    updateActionKey(state, {key, val}){
      const el = state.buttons.find(b=>b.name == key);
      if(!el) return;
      el.key = val;
      //state.buttons = {...state.buttons};
    },
    setFractionMembers(state, members){
      state.fraction.members = members;
      state.fraction = {...state.fraction};
    },
    setFractionBusinesses(state, biz){
      state.fraction.businesses = biz;
      state.fraction = {...state.fraction};
    },
    setFractionData(state, {id, bank, lastHour, lastDay, canInvite, canKick, canRank, canWhithdraw, canAccess}){
      state.fraction.id = id;
      state.fraction.bank = bank;
      state.fraction.canInvite = canInvite;
      state.fraction.canKick = canKick;
      state.fraction.canRank = canRank;
      state.fraction.canWhithdraw = canWhithdraw;
      state.fraction.canAccess = canAccess;
      state.fraction.lastHour = lastHour;
      state.fraction.lastDay = lastDay;
      state.fraction = {...state.fraction};
      if(id == 0) state.currentTab = null;
    },
    setFractionAccess(state, access){
      state.fraction.access = access;
      state.fraction = {...state.fraction};
    },
    resetFraction(state){
      state.fraction.bank = 0;
      state.fraction.canInvite = false;
      state.fraction.canKick = false;
      state.fraction.isLeader = false;
      state.fraction = {...state.fraction};
    },
    setAttack(state, attack){
      state.captAttack = attack
    },
    setCurrentTab: function(state, payload) {
      state.currentTab = payload
    },
    selectLang(state, tag){
      state.settings.langs.cur = tag;
    },
    setSetting(state, {name, status}){
      state.settings[name] = status;
      window.mp.trigger("mmenu:setting:set", name, status)
    },
    setSettings(state, data){
      state.settings = data;
    },
    addAnswer(state, {id,name,text}) {
      state.reports.push({type: 1, id, name, text, time: Date.now()})
    },
    closeReport(state) {
      state.reportRaiting = true;
      state.reports = [];
      window.mp.triggerServer( "report:player:close");
    },
    sendReport(state, msg) {
      state.reports.push({type: 0, id: 0, name: 'you', text: msg, time: Date.now()})
      window.mp.triggerServer( "report:player:send", msg);
    },
    sendRaiting(state, rait){
      state.reportRaiting = false;
      state.reports = [];
      window.mp.triggerServer( "report:player:raiting", rait);
    },
    setStats(state, data){
      state.statistics = data;
    },
    setProps(state, data){
      if(data.business) data.business.products = [];
      state.property = data;
    },
    setProducts(state, data){
      if(state.property.business) state.property.business.products = data;
      state.property = {...state.property};
    },
    setBalance(state, balance){
      state.balance = balance
    },
    setDialog(state, dialog){
      state.dialog = dialog;
    }
  }
}
