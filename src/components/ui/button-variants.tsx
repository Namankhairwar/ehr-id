import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface MedicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emergency' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const MedicalButton = forwardRef<HTMLButtonElement, MedicalButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "medical-button",
      secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
      emergency: "emergency-access",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <Button
        className={cn(
          "font-medium rounded-lg transition-all duration-200",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MedicalButton.displayName = "MedicalButton";

export { MedicalButton };