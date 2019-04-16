const state = {
      SearchData:[]
}

const mutations = {
      Set_SearchData(state,param){
        state.SearchData = param
      }
}

const actions = {
    Set_SearchData:({commit},param) => {
        commit('Set_SearchData',param)
    }
}

export default {
    state,
    mutations,
    actions
}