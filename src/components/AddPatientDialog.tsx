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
import { supabase } from "@/integrations/supabase/client";

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
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !age.trim() || !condition.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Pateint")
        .insert({ P_Name: name.trim(), P_Age: parseInt(age) })
        .select()
        .single();

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const newPatient: NewPatient = {
        id: String(data.EHRId),
        name: data.P_Name,
        ehrId: `EHR${data.EHRId}`,
        lastVisit: today,
        condition: condition.trim(),
        priority,
      };

      onAdd(newPatient);
      toast.success(`${name} added and saved to database (EHR ID: ${data.EHRId})`);
      setName("");
      setAge("");
      setCondition("");
      setPriority("normal");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save patient");
    } finally {
      setLoading(false);
    }
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
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              placeholder="e.g. 35"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
