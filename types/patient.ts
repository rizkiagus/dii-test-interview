export type TPatient = {
  id: string;
  nik: string;
  name: string;
  diagnosis: string;
  admissionDate: string;
  doctor: string;
  room: string;
};

export type TPatientFormData = Omit<TPatient, "id">;
