import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function BatchGenerationForm({ isOpen, onClose, transcripts }) {
  const [documentType, setDocumentType] = useState("summary");
  const [selectedTranscripts, setSelectedTranscripts] = useState([]);

  const handleTranscriptToggle = (date) => {
    setSelectedTranscripts((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const handleSubmit = () => {
    console.log("Generating document:", {
      type: documentType,
      transcripts: selectedTranscripts,
    });
    // Here you would typically call an API to generate the document
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-4 rounded-lg">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">
            What would you like to generate?
          </h2>

          <RadioGroup
            defaultValue="summary"
            onValueChange={setDocumentType}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="summary" id="summary" />
              <Label htmlFor="summary">Summary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="head-to-toe" id="head-to-toe" />
              <Label htmlFor="head-to-toe">Head to Toe Assessment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="darp" id="darp" />
              <Label htmlFor="darp">DARP</Label>
            </div>
          </RadioGroup>

          <div>
            <h3 className="text-base mb-2">
              Select transcripts you want to convert.
            </h3>
            <div className="space-y-2">
              {transcripts.map((transcript, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    variant="outline"
                    id={`transcript-${index}`}
                    onCheckedChange={() =>
                      handleTranscriptToggle(transcript.timestamp)
                    }
                  />
                  <Label htmlFor={`transcript-${index}`} className="text-sm">
                    {transcript.timestamp}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleSubmit}
              className="flex-1 "
            >
              Fill out
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
