import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const OtpVerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as any)?.phone || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto focus next
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) {
      alert("Please enter complete OTP");
      return;
    }

    alert("OTP Verified Successfully!");
    localStorage.setItem("user", JSON.stringify({ phone }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8 shadow-xl text-center space-y-6">

        {/* Nepal Emblem */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg"
          alt="Nepal Emblem"
          className="w-20 h-20 mx-auto"
        />

        <h1 className="text-2xl font-bold text-foreground mt-2">Verify OTP</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit OTP sent to <span className="font-medium">{phone}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex justify-between gap-2">
            {otp.map((value, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold"
                maxLength={1}
              />
            ))}
          </div>

          <Button type="submit" className="w-full">Verify OTP</Button>
        </form>

        <p className="text-xs text-muted-foreground mt-2">
          Didn't receive OTP? <button className="text-primary underline" onClick={() => alert("OTP resent!")}>Resend OTP</button>
        </p>
      </Card>
    </div>
  );
};

export default OtpVerifyPage;
