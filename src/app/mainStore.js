import {create} from 'zustand'

const mainStore = (set) => ({
  userInput: "",

  setUserInput: (usInp) => {
    set((state) => ({
      userInput: usInp
    }));
  }
});


const userMainStore = create(mainStore);
export default userMainStore;

