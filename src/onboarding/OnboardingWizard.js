import React, { useState } from "react";
import OnboardingStep1 from "./OnboardingStep1";
import OnboardingStep2 from "./OnboardingStep2";
import OnboardingStep3 from "./OnboardingStep3";
import OnboardingStep4 from "./OnboardingStep4";
import OnboardingStep5 from "./OnboardingStep5";
import OnboardingStep6 from "./OnboardingStep6";
import OnboardingStep7 from "./OnboardingStep7";
import OnboardingStep8 from "./OnboardingStep8";
import OnboardingStep9 from "./OnboardingStep9";
import OnboardingStep10 from "./OnboardingStep10";
import OnboardingStep11 from "./OnboardingStep11";

const steps = [
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
  OnboardingStep6,
  OnboardingStep7,
  OnboardingStep8,
  OnboardingStep9,
  OnboardingStep10,
  OnboardingStep11,
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const StepComponent = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <StepComponent nextStep={nextStep} prevStep={prevStep} />
      <div style={{ marginTop: 20, textAlign: "center" }}>
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
};

export default OnboardingWizard;
