import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  className?: string;
}

export const OTPInput = ({ length = 6, onComplete, className }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (otp.every(digit => digit !== "")) {
      onComplete(otp.join(""));
    }
  }, [otp, onComplete]);

  return (
    <div className={cn("flex space-x-2 justify-center", className)}>
      {otp.map((data, index) => (
        <input
          className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold border-input focus:border-primary focus:outline-none transition-colors"
          type="text"
          name="otp"
          maxLength={1}
          key={index}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};