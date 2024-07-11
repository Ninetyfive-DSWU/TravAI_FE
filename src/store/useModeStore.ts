import { create } from "zustand";

interface ModeProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

const useModeStore = create<ModeProps>((set) => ({
  editMode: false,
  setEditMode: (editMode: boolean) => set({ editMode }),
}));

export default useModeStore;
