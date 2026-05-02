import React, { useEffect, useState } from "react";
import { usePatientStore } from "../store/usePatientStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EmptyState } from "./ui/EmptyState";

type TSortConfig = { key: "name" | "admissionDate"; direction: "asc" | "desc" };

export function PatientList() {
  const { patients, isLoading, fetchPatients } = usePatientStore();

  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<TSortConfig>({
    key: "admissionDate",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (patients.length === 0) fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = (key: "name" | "admissionDate") => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.nik.includes(search),
  );

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase())
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase())
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const paginatedPatients = sortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading && patients.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data pasien...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daftar Pasien Aktif</h2>
        <div className="w-64">
          <Input
            label=""
            placeholder="Cari Nama / NIK..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y">
              <th
                className="p-3 text-sm font-semibold cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Nama{" "}
                {sortConfig.key === "name" ? (
                  sortConfig.direction === "asc" ? (
                    "↑"
                  ) : (
                    "↓"
                  )
                ) : (
                  <span className="opacity-30 group-hover:opacity-100">↕</span>
                )}
              </th>
              <th className="p-3 text-sm font-semibold">NIK</th>
              <th
                className="p-3 text-sm font-semibold cursor-pointer"
                onClick={() => handleSort("admissionDate")}
              >
                Tanggal Masuk{" "}
                {sortConfig.key === "admissionDate" ? (
                  sortConfig.direction === "asc" ? (
                    "↑"
                  ) : (
                    "↓"
                  )
                ) : (
                  <span className="opacity-30 group-hover:opacity-100">↕</span>
                )}
              </th>
              <th className="p-3 text-sm font-semibold">Diagnosa</th>
              <th className="p-3 text-sm font-semibold">Ruangan</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{patient.name}</td>
                  <td className="p-3 text-sm">{patient.nik}</td>
                  <td className="p-3 text-sm">{patient.admissionDate}</td>
                  <td className="p-3 text-sm">{patient.diagnosis}</td>
                  <td className="p-3 text-sm">{patient.room}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-500">
                  <EmptyState
                    title="Belum Ada Data Pasien"
                    description={
                      search
                        ? `Tidak ada pasien yang cocok dengan pencarian "${search}".`
                        : "Daftar pasien masuk masih kosong. Silakan tambahkan pasien baru melalui tombol di kanan atas."
                    }
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
