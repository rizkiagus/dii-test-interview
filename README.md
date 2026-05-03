# Hospital Information System - Inpatient Module

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-blue?style=for-the-badge&logo=vercel)](https://hospital-form-eight.vercel.app/)

This is a Hospital Information System for Interview Test Data Integrasi Inovasi

## Key Features

### 1. New Patient Registration

- Comprehensive registration form (NIK, Name, Diagnosis, Admission Date, Attending Doctor, Room).
- **Smart Validation:** The NIK (National ID) input is immune to letters and symbols (automatically filtered out) and strictly requires exactly 16 digits.
- Required validation on all fields to ensure complete medical records.

### 2. Active Patient Roster

- **Realistic API Simulation:** Utilizes a Mock API with artificial delay (500ms) to test true loading states.
- **Universal Search:** Search for patients by Full Name or NIK in real-time.
- **Dynamic Sorting:** Sort data by Name (A-Z/Z-A) or Admission Date (Newest/Oldest).
- **Pagination:** Limits data display (5 patients per page) to keep the table clean and readable.
- **State Handling:** Fully equipped with Empty States (when no data is found) and Loading States.

### 3. Seamless Transitions

- Employs Conditional Rendering (Tab System) to navigate between the "Patient List" and "Registration Form" views.
- State data is preserved without requiring a page refresh when switching tabs.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Typography:** Poppins (via Next/Font)

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (version 18.x or later) installed on your machine.

### Installation Steps

**Clone the repository**:

```bash
git clone git@github.com:rizkiagus/dii-test-interview.git
cd dii-test-interview
npm install
# or using yarn: yarn install
# or using pnpm: pnpm install
```
