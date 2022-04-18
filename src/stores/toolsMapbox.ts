import { acceptHMRUpdate, defineStore } from "pinia";

type State = {
  searchAddress: any;
};

export const useToolsMapbox = defineStore("toolsMapbox", {
  state: (): State => ({
    searchAddress: "",
  }),
  actions: {
    setResultSearchAddress(payload: string) {
      this.searchAddress = payload;
    },
  },
  getters: {
    getResultSearchAddress: (state) => state.searchAddress,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useToolsMapbox, import.meta.hot));
