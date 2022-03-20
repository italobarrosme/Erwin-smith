import { acceptHMRUpdate, defineStore } from "pinia";

const TIME_ALTERNATE = 600;

type State = {
  choseModals: string[];
  toggleLoading: boolean;
  toggleSideBarDetails: boolean;
  toggleSideBarTools: boolean;
};

export const useUIStore = defineStore("ui", {
  state: (): State => ({
    choseModals: [],
    toggleLoading: false,
    toggleSideBarDetails: false,
    toggleSideBarTools: false,
  }),
  actions: {
    alternateModal(modal: string) {
      this.choseModals = this.choseModals.includes(modal)
        ? this.choseModals.filter((element) => element !== modal)
        : [...this.choseModals, modal];
    },
    alternateLoading(loading: boolean) {
      const alternate = loading ?? !this.isLoading;

      if (!alternate) {
        return setTimeout(() => {
          this.toggleLoading = alternate;
        }, TIME_ALTERNATE);
      }
      this.toggleLoading = alternate;
    },
    alternateSideBarDetails(sideBar: boolean) {
      this.toggleSideBarDetails = sideBar;
    },
    alternateSideBarTools(sideBar: boolean) {
      this.toggleSideBarTools = sideBar;
    },
  },
  getters: {
    isModal: (state) => (modal: string) => state.choseModals.includes(modal),
    isLoading: (state) => state.toggleLoading,
    isSideBarDetails: (state) => state.toggleSideBarDetails,
    isSideBarTools: (state) => state.toggleSideBarTools,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
