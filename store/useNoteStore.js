import { create } from "zustand";

const useNoteStore = create((set) => ({
  selectedNoteId: null,
  setSelectedNoteId: (id) => set({ selectedNoteId: id }),
  clearSelectedNoteId: () => set({ selectedNoteId: null }),
}));

export default useNoteStore;
