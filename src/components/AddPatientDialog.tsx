import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicalButton } from "@/components/ui/button-variants";
import { toast } from "sonner";

interface NewPatient {
  id: string;
  name: string;
  ehrId: string;
  lastVisit: string;
  condition: string;
  priority: string;
}

interface AddPatientDialogProps {
  onAdd: (patient: NewPatient) => void;
  existingCount: number;
}

const AddPatientDialog = ({ onAdd, existingCount }: AddPatientDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [ehrId, setEhrId] = useState("");
  const [condition, setCondition] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = () => {
    if (!name.trim() || !ehrId.trim() || !condition.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const newPatient: NewPatient = {
      id: String(existingCount + 1),
      name: name.trim(),
      ehrId: ehrId.trim(),
      lastVisit: today,
      condition: condition.trim(),
      priority,
    };

    onAdd(newPatient);
    toast.success(`${name} added as an authorized patient`);
    setName("");
    setEhrId("");
    setCondition("");
    setPriority("normal");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MedicalButton>
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </MedicalButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Add Authorized Patient
          </DialogTitle>
          <DialogDescription>
            Register a new patient under your authorized care.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="patientName">Full Name *</Label>
            <Input
              id="patientName"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ehrId">EHR ID *</Label>
            <Input
              id="ehrId"
              placeholder="e.g. EHR2024004"
              value={ehrId}
              onChange={(e) => setEhrId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition / Reason *</Label>
            <Input
              id="condition"
              placeholder="e.g. Diabetes Follow-up"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <MedicalButton className="w-full" onClick={handleSubmit}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Patient
          </MedicalButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
