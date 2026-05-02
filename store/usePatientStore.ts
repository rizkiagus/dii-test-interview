import { create } from "zustand";
import { TPatient, TPatientFormData } from "@/types/patient";

interface TPatientState {
  patients: TPatient[];
  isLoading: boolean;
  fetchPatients: () => Promise<void>;
  addPatient: (data: TPatientFormData) => Promise<void>;
}

const MOCK_PATIENTS: TPatient[] = [
  {
    id: "1",
    nik: "3201010101010001",
    name: "Budi Santoso",
    diagnosis: "Demam Berdarah",
    admissionDate: "2026-05-01",
    doctor: "Dr. Andi",
    room: "Melati 1",
  },
  {
    id: "2",
    nik: "3201010101010002",
    name: "Siti Aminah",
    diagnosis: "Tifus",
    admissionDate: "2026-05-02",
    doctor: "Dr. Budi",
    room: "Mawar 2",
  },
  {
    id: "3",
    nik: "3201010101010003",
    name: "Agus Pratama",
    diagnosis: "Appendicitis",
    admissionDate: "2026-04-28",
    doctor: "Dr. Cipto",
    room: "Anggrek 3",
  },
];

export const usePatientStore = create<TPatientState>((set) => ({
  patients: [],
  isLoading: false,

  fetchPatients: async () => {
    set({ isLoading: true });
    // Simulasi API Delay 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ patients: MOCK_PATIENTS, isLoading: false });
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
