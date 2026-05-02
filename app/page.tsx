"use client";

import { useState } from "react";
import { PatientForm } from "../components/PatientForm";
import { PatientList } from "../components/PatientList";
import { Button } from "../components/ui/button";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"list" | "form">("list");

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header & Navigasi Tabs */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sistem Informasi Rumah Sakit
            </h1>
            <p className="text-gray-500">Modul Rawat Inap</p>
          </div>

          <div className="flex gap-2 bg-white p-1 rounded-lg border shadow-sm">
            <Button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary-foreground text-gray-500 hover:bg-gray-100"
              }`}
            >
              Daftar Pasien
            </Button>
            <Button
              onClick={() => setActiveTab("form")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "form"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary-foreground text-gray-500 hover:bg-gray-100"
              }`}
            >
              + Pasien Baru
            </Button>
          </div>
        </div>

        {activeTab === "list" ? (
          <PatientList />
        ) : (
          <PatientForm onSuccess={() => setActiveTab("list")} />
        )}
      </div>
    </main>
  );
}
