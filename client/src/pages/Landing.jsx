import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddPatientDialog from "@/components/AddPatientDialog";
import { useNavigate, Link } from "react-router-dom";

export default function Landing() {
  const [patients, setPatients] = useState([
    { id: "1", name: "Patient A", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "2", name: "Patient B", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "3", name: "Patient D", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "1", name: "Patient A", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "2", name: "Patient B", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "3", name: "Patient D", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "1", name: "Patient A", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "2", name: "Patient B", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "3", name: "Patient D", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "1", name: "Patient A", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "2", name: "Patient B", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "3", name: "Patient D", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "1", name: "Patient A", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "2", name: "Patient B", healthNumber: "Alberta Health #: xxx-xxx" },
    { id: "3", name: "Patient D", healthNumber: "Alberta Health #: xxx-xxx" },
  ]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

  const handleAddPatient = (patient) => {
    setPatients([...patients, patient]);
    setIsAddingPatient(false);
  };

  return (
    <div className="w-[375px] h-[667px] rounded-3xl border border-gray-200  bg-zinc-50  p-4 text-gray-900 overflow-hidden flex flex-col">
      <div className="mb-4  flex flex-row items-end">
        <h1 className="mb-1 font-handwriting text-4xl">Welcome Loryn</h1>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <h2 className="font-handwriting text-2xl ">Your patients</h2>
        <Button
          variant="outline"
          className="border-gray-400 text-gray-800 hover:bg-gray-100 text-sm px-2 py-1 h-6"
          onClick={() => setIsAddingPatient(true)}
        >
          Add Patient
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto pl-4">
        <div className="space-y-4">
          {patients.map((patient) => (
            <Link
              to={`/patient/${encodeURIComponent(patient.id)}`}
              key={patient.id}
              className="group cursor-pointer"
            >
              <div className="mb-1 font-handwriting text-xl">
                {patient.name}
              </div>
              <div className="text-xs text-gray-500">
                {patient.healthNumber}
              </div>
              <div className="mt-1 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full border-gray-400 py-2 text-base font-medium text-gray-800 "
        >
          Record Conversation
        </Button>
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
