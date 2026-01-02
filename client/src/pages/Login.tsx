import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 10) {
      setPhone(val);
      setError("");
    }
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    navigate("/otp-verify", { state: { phone } });
  };

  const handleNagarikLogin = () => {
    alert("Mock Nagarik App login successful!");
    localStorage.setItem("user", JSON.stringify({ name: "Nagarik User" }));
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

        <h1 className="text-2xl font-bold text-foreground mt-2">Civic Plan Nepal</h1>
        <p className="text-sm text-muted-foreground">
          E-Governance Platform for Monitoring Local Development Projects
        </p>

        {/* Phone Login Form */}
        <form onSubmit={handlePhoneLogin} className="space-y-4 mt-4">
          {error && (
            <div className="flex items-center gap-2 text-red-600 justify-center">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="text-left">
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="9841xxxxxx"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-1">Send OTP</Button>
        </form>

        <div className="flex items-center gap-2 justify-center text-muted-foreground mt-2">
          <span>OR</span>
        </div>

        <Button
          onClick={handleNagarikLogin}
          variant="outline"
          className="flex items-center justify-center gap-2 w-full mt-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/c/cd/Logo_of_Nagarik_App.png"
            alt="Nagarik App"
            className="w-6 h-6"
          />
          Login with Nagarik App
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          By logging in, you agree to the Terms & Conditions of Civic Plan Nepal.
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
