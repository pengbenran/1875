const state = { 
    City:''
}

const mutations = { 
    SetCity(state,param){
        state.City = param
     }
}

const actions = { 
    SetCity:({commit},param) => {
        commit('SetCity',param)
    }
}


export default {
    namespaced:true,
    state,
    mutations,
    actions
}