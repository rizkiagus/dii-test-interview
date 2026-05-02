import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TPatientFormData } from "@/types/patient";
import { usePatientStore } from "@/store/usePatientStore";

type TPatientFormProps = {
  onSuccess: () => void;
};

export function PatientForm({ onSuccess }: TPatientFormProps) {
  const addPatient = usePatientStore((state) => state.addPatient);
  const isLoading = usePatientStore((state) => state.isLoading);

  const [formData, setFormData] = useState<TPatientFormData>({
    nik: "",
    name: "",
    diagnosis: "",
    admissionDate: "",
    doctor: "",
    room: "",
  });
  const [errors, setErrors] = useState<Partial<TPatientFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Jika input yang sedang diketik adalah NIK
    if (name === "nik") {
      // Regex \D akan membuang semua karakter yang BUKAN angka (0-9)
      finalValue = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [e.target.name]: finalValue });
    setErrors({ ...errors, [e.target.name]: undefined }); // Clear error on typing
  };

  const validate = (): boolean => {
    const newErrors: Partial<TPatientFormData> = {};
    if (!formData.nik) newErrors.nik = "NIK wajib diisi";
    else if (!/^\d{16}$/.test(formData.nik))
      newErrors.nik = "NIK harus 16 digit angka";

    if (!formData.name) newErrors.name = "Nama wajib diisi";
    if (!formData.diagnosis) newErrors.diagnosis = "Diagnosa wajib diisi";
    if (!formData.admissionDate)
      newErrors.admissionDate = "Tanggal masuk wajib diisi";
    if (!formData.doctor)
      newErrors.doctor = "Dokter Penanggung Jawab wajib diisi";
    if (!formData.room) newErrors.room = "Ruangan wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await addPatient(formData);
    setFormData({
      nik: "",
      name: "",
      diagnosis: "",
      admissionDate: "",
      doctor: "",
      room: "",
    });
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border"
    >
      <h2 className="text-xl font-bold mb-4">Pendaftaran Rawat Inap</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Input
          label="NIK"
          name="nik"
          value={formData.nik}
          onChange={handleChange}
          error={errors.nik}
          placeholder="16 Digit Angka"
          maxLength={16}
        />
        <Input
          label="Nama Lengkap"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Masukan nama lengkap"
          error={errors.name}
        />
        <Input
          label="Diagnosa Masuk"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Masukan penyakit"
          error={errors.diagnosis}
        />
        <Input
          label="Tanggal Masuk"
          name="admissionDate"
          type="date"
          value={formData.admissionDate}
          onChange={handleChange}
          error={errors.admissionDate}
        />
        <Input
          label="Dokter Penanggung Jawab"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Masukan nama dokter"
          error={errors.doctor}
        />
        <Input
          label="Ruangan"
          name="room"
          value={formData.room}
          onChange={handleChange}
          placeholder="Masukan nama ruangan"
          error={errors.room}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={isLoading} isLoading={isLoading}>
          Daftarkan Pasien
        </Button>
      </div>
    </form>
  );
}
