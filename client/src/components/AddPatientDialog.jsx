"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

export default function AddPatientDialog({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [healthNumber, setHealthNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && healthNumber.trim()) {
      onAdd({
        id: Date.now().toString(),
        name,
        healthNumber: `Alberta Health #: ${healthNumber}`,
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="bg-white text-gray-900 w-[340px] p-4">
        <DialogHeader>
          <DialogTitle className="font-handwriting text-xl">
            Add New Patient
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm">
              Patient Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-300 bg-white text-gray-900 text-sm"
              placeholder="Enter patient name"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="healthNumber" className="block text-sm">
              Alberta Health Number
            </label>
            <Input
              id="healthNumber"
              value={healthNumber}
              onChange={(e) => setHealthNumber(e.target.value)}
              className="border-gray-300 bg-white text-gray-900 text-sm"
              placeholder="xxx-xxx"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-300 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Add Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
