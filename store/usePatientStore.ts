import { create } from "zustand";
import { TPatient, TPatientFormData } from "@/types/patient";

interface TPatientState {
  patients: TPatient[];
  isLoading: boolean;
  fetchPatients: () => Promise<void>;
  addPatient: (data: TPatientFormData) => Promise<void>;
}

export const usePatientStore = create<TPatientState>((set) => ({
  patients: [],
  isLoading: false,

  fetchPatients: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ patients: [], isLoading: false });
  },

  addPatient: async (data: TPatientFormData) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newPatient: TPatient = {
      ...data,
      id: Math.random().toString(36).substring(7), // Generate random ID
    };

    set((state) => ({
      patients: [newPatient, ...state.patients],
      isLoading: false,
    }));
  },
}));
