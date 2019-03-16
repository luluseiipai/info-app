/* jshint esversion:6 */
export const setIsAuthenticated = (state,data) => {
  state.isAuthenticated = data;
};
export const setUser = (state,data) => {
  state.user = data;
};
export const setProfile = (state,data) => {
  state.profile = data;
};
export const setProfiles = (state,data) => {
  state.profiles = data;
};