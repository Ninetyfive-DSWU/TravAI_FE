import { create } from "zustand";
import dayjs from "dayjs";

interface FilterStore {
  destination: string;
  companion: string;
  style: string;
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
  destination: "",
  companion: "",
  style: "",
  startDate: "",
  endDate: "",
  nights: 0,
  setDestination: (destination) =>
    set({ destination: destination[destination.length - 1] || "" }),
  setCompanion: (companion) =>
    set({ companion: companion[companion.length - 1] || "" }),
  setStyle: (style) => set({ style: style[style.length - 1] || "" }),
  setDates: (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const nights = endDate.diff(startDate, "day");
    set({ startDate: start, endDate: end, nights });
  },
  clearOptions: () =>
    set({
      destination: "",
      companion: "",
      style: "",
      startDate: "",
      endDate: "",
      nights: 0,
    }),
}));

export default useFilterStore;
