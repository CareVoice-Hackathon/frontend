import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AddPatientDialog from "@/components/AddPatientDialog";
import { Link } from "react-router-dom";

export default function Landing() {
  const [patients, setPatients] = useState([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("/sandbox-api/patients");
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = (patient) => {
    setPatients((prev) => [...prev, { ...patient, id: prev.length + 1 }]);
    setIsAddingPatient(false);
  };

  return (
    <div className="w-[375px] h-[667px] rounded-3xl border border-gray-200 bg-zinc-50 p-4 text-gray-900 overflow-hidden flex flex-col">
      <div className="mb-4">
        <h1 className="font-handwriting text-4xl">Welcome, Loryn</h1>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-handwriting text-2xl">Your Patients</h2>
        <Button
          variant="outline"
          className="border-gray-400 text-gray-800 hover:bg-gray-100 text-sm px-2 py-1 h-6"
          onClick={() => setIsAddingPatient(true)}
        >
          Add Patient
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto pl-4">
        {isLoading ? (
          <p className="text-gray-600">Loading patients...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            {patients.map((patient) => (
              <Link
                to={`/patient/${encodeURIComponent(patient.id)}`}
                key={patient.id}
                className="group block cursor-pointer"
              >
                <div className="font-handwriting text-xl">{patient.name}</div>
                <div className="ml-2 text-xs text-gray-500">
                  AHN: {patient.AHN}
                </div>
                <div className="h-0.5 w-0 bg-zinc-500 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          to={`/record`}
          className="border border-zinc-700 rounded-md px-2 py-1"
        >
          Record Conversation
        </Link>
      </div>

      {isAddingPatient && (
        <AddPatientDialog
          onAdd={handleAddPatient}
          onCancel={() => setIsAddingPatient(false)}
        />
      )}
    </div>
  );
}
