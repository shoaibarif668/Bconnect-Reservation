export const state = () => ({
  isUserLoggedIn: false,
})

export const mutations = {
  HANDLE_IS_USER_LOGGED_IN(state, isUserLoggedIn) {
    state.isUserLoggedIn = isUserLoggedIn;
  }
}
