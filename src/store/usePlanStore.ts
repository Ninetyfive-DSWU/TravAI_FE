import { create } from "zustand";

interface PlanProps {
  id: number;
  time: string;
  place: string;
  address: string;
  city: string;
  day: string;
  endday: string;
  startday: string;
  move: null | string;
  order: number;
  session_id: string;
}

interface PlanStore {
  nights: number;
  currentDay: number;
  plans: Array<PlanProps>;
  setNights: (nights: number) => void;
  setCurrentDay: (currentDay: number) => void;
  setPlans: (plans: Array<PlanProps>) => void;
}

const usePlanStore = create<PlanStore>((set) => ({
  nights: 0,
  currentDay: 1,
  plans: [],
  setNights: (nights: number) => set({ nights }),
  setCurrentDay: (currentDay: number) => set({ currentDay }),
  setPlans: (plans: Array<PlanProps>) => set({ plans }),
}));

export default usePlanStore;
