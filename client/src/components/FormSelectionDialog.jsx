import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/Label";

export default function FormSelectionDialog({ onClose }) {
  const [selectedForm, setSelectedForm] = useState("head-to-toe");

  const handleFillOut = () => {
    console.log("Selected form:", selectedForm);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white text-gray-900 w-[340px] p-4">
        <div className="mb-4">
          <h2 className="text-lg mb-4">Which Form do you want to fill out?</h2>
          <RadioGroup
            value={selectedForm}
            onValueChange={setSelectedForm}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="head-to-toe" id="head-to-toe" />
              <Label htmlFor="head-to-toe">Head to Toe Assessment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="darp" id="darp" />
              <Label htmlFor="darp">DARP</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-sm"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleFillOut}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            Fill out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
