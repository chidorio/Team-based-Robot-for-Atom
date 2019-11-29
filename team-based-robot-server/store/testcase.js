export const state = () => ({
  testcases: { list: [] },
})

export const mutations = {
  // set testcases into store
  setTestcases (state, data) {
    console.log("In setTestcase Mutation", data)
    state.testcases = {
      ...data,
      list: [...data.testcases],
    }
    console.log("After set state = ", state.testcases)
    delete state.testcases.data
    console.log("[store->testcase->mutation] :\n", state.testcases.list)
  },
}
// get testcases from database then [setTestcases]
export const actions = {
  async fetchTestcases ({ commit, dispatch }, { page = 1, limit = 10 } = {}) {
    try {
      console.log(`/api/testcase/list?page=${page}&limit=${limit}`)
      const { data } = await this.$axios.$get(`/api/testcase/list?page=${page}&limit=${limit}`)
      console.log("[store->testcase->action] :\n", data)
      commit("setTestcases", data)
    } catch (error) {
      throw error
    }
  },
  // delete testcases in database then [fetchTestcases]
  async deleteTestcases ({ dispatch }, params) {
    try {
      const tc_id_list = params
      const { data } = await this.$axios.$post("/api/testcase/list", tc_id_list)
      dispatch("fetchTestcases")
      return data
    } catch (error) {
      throw error
    }
  },
}
// get testcases from store
export const getters = {
  getTestcases (state) {
    return state.testcases
  },
}