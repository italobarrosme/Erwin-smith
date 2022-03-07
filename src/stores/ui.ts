import { acceptHMRUpdate, defineStore } from "pinia";

const TIME_TOGGLE = 600;

type State = {
  openMoadals: string[];
  dataChangeComponent: string[];
  isLoading: boolean;
};

export const useUIStore = defineStore("ui", {
  state: (): State => ({
    openMoadals: [],
    isLoading: false,
    dataChangeComponent: [],
  }),
  actions: {
    toggleModal(modal: string) {
      this.openMoadals = this.openMoadals.includes(modal)
        ? this.openMoadals.filter((element) => element !== modal)
        : [...this.openMoadals, modal];
    },
    toggleLoading(loading: boolean) {
      const toggle = loading ?? !this.isLoading;

      if (!toggle) {
        return setTimeout(() => {
          this.isLoading = toggle;
        }, TIME_TOGGLE);
      }
      this.isLoading = toggle;
    },
  },
  getters: {
    isModalOpen: (state) => (modal: string) =>
      state.openMoadals.includes(modal),
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
