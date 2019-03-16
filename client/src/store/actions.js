/* jshint esversion:6 */
export const setIsAuthenticated = ({commit},data) => {
  commit("setIsAuthenticated",data);
};
export const setUser = ({commit},data) => {
  commit("setUser",data);
};
export const setProfile = ({commit},data) => {
  commit("setProfile",data);
};
export const setProfiles = ({commit},data) => {
  commit("setProfiles",data);
};
export const clearCurrentState = ({commit},data) => {
  commit("setUser",{});
  commit("setProfile",{});
  commit("setProfiles",[]);
  commit("setIsAuthenticated",false);
};