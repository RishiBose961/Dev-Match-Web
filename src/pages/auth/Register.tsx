import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router";

import PersonalInfo from "@/components/Register/PersonalInfo";
import Details from "@/components/Register/Details";
import Experience from "@/components/Register/Experience";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { isAuthenticated, isLoading } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  // ✅ Delay redirect to allow Step 4 to show
  useEffect(() => {
    if (!isLoading && isAuthenticated && step === 4) {
      const timeout = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000); // wait 2 seconds before redirect

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, isLoading, step]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return (

      <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Complete the steps below to register
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-8">
            <Timeline currentStep={step} />
          </div>

          {step === 1 && <PersonalInfo handleNext={handleNext} />}
          {step === 2 && <Details handleNext={handleNext} />}
          {step === 3 && <Experience handleNext={handleNext} />}
          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Registration Complete!</h3>
              <p className="text-muted-foreground">
                Thank you for registering. You will be redirected shortly.
              </p>
            </div>
          )}
        </CardContent>

        <div className="mt-4 flex justify-center">
          <p>
            Already have an account?
            <Link to="/login" className="text-primary mx-2">
              Login here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

function Timeline({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, name: "Personal Info" },
    { id: 2, name: "Details" },
    { id: 3, name: "Experience" },
    { id: 4, name: "Complete" },
  ];

  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > step.id ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span
              className={`text-sm mt-2 ${
                currentStep >= step.id
                  ? "font-medium text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Progress line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}
