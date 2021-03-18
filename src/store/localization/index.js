import local from './local';

export default {
    namespaced: true,
    state: {
        local,
        //langs:["ge", "ru", "eng"],
        defaultLang: "ru",
        langs:{
          list:[
            {name: 'English', tag: 'en'},
            {name: 'Русский', tag: 'ru'},
            {name: 'Georgian', tag: 'ge'},
            {name: 'Germany', tag: 'gr'}
          ],
          cur: 'ru'
        }
    },
    mutations: {
        setLang(state, lang){
            if(state.langs.list.findIndex(l=>l.tag == lang) == -1) state.langs.cur = state.defaultLang;
            else state.langs.cur = lang
            document.getElementsByTagName("html")[0].lang = state.langs.cur;
        }
    },
    actions: {
       translate({getters}, {id, msg}){
            window.mp.trigger("tag:add:action", id, getters["loc"](msg))
       }
    },
    modules: {
    },
    getters:{
        loc: state => msg =>{
            if(typeof msg !== "string") return msg;
            const array = msg.split('@')
            let key = array[0];
            if(state.local[key] === undefined){
                if(process.env.NODE_ENV == 'development') window.console.log(`Key ${key} don't have value`);
                return key;
            }else{
                let message = state.local[key][state.langs.cur];
                const params = array.slice(1);
                if(params.length > 0){
                    for (let index = 0; index < params.length; index++) {
                        const param = params[index];
                        if(message.indexOf(`{${index}}`) === -1)
                            message += ` ${state.local[param] ? state.local[param][state.langs.cur] : param}`
                        else
                            message = message.replace(`{${index}}`, state.local[param] ? state.local[param][state.langs.cur] : param);
                    }
                }
                return message;
            }
            
        }
    }
}