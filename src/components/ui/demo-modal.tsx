import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MedicalButton } from "@/components/ui/button-variants";
import { X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  content?: string;
}

export const DemoModal = ({ isOpen, onClose, title, description, content }: DemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="medical-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-foreground">{title}</DialogTitle>
            <button
              onClick={onClose}
              className="hover:bg-muted rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <DialogDescription className="text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {content ? (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-foreground">{content}</p>
            </div>
          ) : (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                This is a demo feature. In a real application, this would lead to the actual {title.toLowerCase()} page or functionality.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <MedicalButton onClick={onClose} variant="outline">
            Close
          </MedicalButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};