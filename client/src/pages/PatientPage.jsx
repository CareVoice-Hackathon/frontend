import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BatchGenerationForm from "@/components/batch-generation-form";
import { useState } from "react";

export default function PatientPage({ patientId }) {
  const documents = [
    { id: 1, type: "DARP", timestamp: "2025/01/02 14:01" },
    { id: 2, type: "Head to Toe Assessment", timestamp: "2025/01/02 14:01" },
    { id: 3, type: "Summary", timestamp: "2025/01/02 14:01" },
    { id: 4, type: "Transcript", timestamp: "2025/01/02 14:01" },
    { id: 5, type: "Transcript", timestamp: "2025/01/02 14:01" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transcripts = documents.filter((doc) => doc.type === "Transcript");

  // Function to determine the route based on document type
  const getDocumentRoute = (type, id) => {
    const typeMap = {
      DARP: "darp",
      "Head to Toe Assessment": "head-to-toe",
      Summary: "summary",
      Transcription: "transcript",
    };
    const route = typeMap[type] || "document"; // Fallback to generic document route
    return `/${route}/${encodeURIComponent(id)}`;
  };

  return (
    <div className="w-[375px] h-[667px] rounded-3xl border border-gray-200 bg-zinc-50 p-4 overflow-hidden flex flex-col">
      <div className="mb-6">
        <h1 className="font-handwriting text-4xl">Patient A</h1>
      </div>

      <div className="flex flex-col">
        <h2 className="font-handwriting text-2xl mb-4 self-center">
          Documents
        </h2>
        <div className="space-y-4 pl-2">
          {documents.map((doc) => (
            <Link
              to={getDocumentRoute(doc.type, doc.id)}
              key={doc.id}
              className="flex justify-between items-baseline"
            >
              <span className="font-handwriting text-xl">{doc.type}</span>
              <span className="text-sm text-gray-400">{doc.timestamp}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-3 mt-auto ">
        <Button
          variant="outline"
          className="w-full rounded-md py-3 text-base"
          onClick={() => setIsModalOpen(true)}
        >
          Summarize or Generate Form
        </Button>
      </div>

      <BatchGenerationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transcripts={transcripts}
      />
    </div>
  );
}
