export const state = () => ({
  loggedInUserRole: null,
})

export const mutations = {
  HANDLE_LOGGED_IN_USER_ROLE(state, loggedInUserRole) {
    state.loggedInUserRole = loggedInUserRole;
  }
}
