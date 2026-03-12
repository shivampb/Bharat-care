import { create } from "zustand";
import type { Procedure, Hospital, Doctor, Accommodation } from "@/lib/types";

interface PlannerState {
  procedure: Procedure | null;
  hospital: Hospital | null;
  doctor: Doctor | null;
  accommodation: Accommodation | null;

  setProcedure: (procedure: Procedure | null) => void;
  setHospital: (hospital: Hospital | null) => void;
  setDoctor: (doctor: Doctor | null) => void;
  setAccommodation: (accommodation: Accommodation | null) => void;

  clearPlanner: () => void;
  isComplete: () => boolean;
}

export const usePlannerStore = create<PlannerState>((set, get) => ({
  procedure: null,
  hospital: null,
  doctor: null,
  accommodation: null,

  setProcedure: (procedure) => set({ procedure }),
  setHospital: (hospital) => set({ hospital }),
  setDoctor: (doctor) => set({ doctor }),
  setAccommodation: (accommodation) => set({ accommodation }),

  clearPlanner: () =>
    set({
      procedure: null,
      hospital: null,
      doctor: null,
      accommodation: null,
    }),

  isComplete: () => {
    const state = get();
    return !!(state.procedure && state.hospital && state.doctor && state.accommodation);
  },
}));
