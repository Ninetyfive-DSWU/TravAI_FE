import { create } from "zustand";
import dayjs from "dayjs";

interface FilterStore {
  destination: string[];
  companion: string[];
  style: string[];
  startDate: string;
  endDate: string;
  nights: number;
  setDestination: (destination: string[]) => void;
  setCompanion: (companion: string[]) => void;
  setStyle: (style: string[]) => void;
  setDates: (start: string, end: string) => void;
  clearOptions: () => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  destination: [],
  companion: [],
  style: [],
  startDate: "",
  endDate: "",
  nights: 0,
  setDestination: (destination) => set({ destination }),
  setCompanion: (companion) => set({ companion }),
  setStyle: (style) => set({ style }),
  setDates: (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const nights = endDate.diff(startDate, "day");
    set({ startDate: start, endDate: end, nights });
  },
  clearOptions: () =>
    set({
      destination: [],
      companion: [],
      style: [],
      startDate: "",
      endDate: "",
      nights: 0,
    }),
}));

export default useFilterStore;
