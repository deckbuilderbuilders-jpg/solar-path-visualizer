import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import SolarScene from "@/components/SolarScene";
import CostSidebar from "@/components/CostSidebar";
import { STEPS } from "@/components/CostSidebar";
import TutorialOverlay from "@/components/TutorialOverlay";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const handleStart = () => {
    setShowTutorial(false);
    setCurrentStep(1);
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const reset = () => {
    setCurrentStep(0);
    setShowTutorial(true);
  };

  const activeStep = STEPS.find((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between bg-card">
        <div>
          <h1 className="text-lg font-bold text-foreground">Solar Installation Guide</h1>
          <p className="text-xs text-muted-foreground">Ground-Mount System — Interactive Walkthrough</p>
        </div>
        {currentStep > 0 && (
          <div className="flex items-center gap-1">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step.id <= currentStep ? "bg-primary" : "bg-step-pending"
                }`}
              />
            ))}
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Scene area */}
        <div className="flex-1 relative flex flex-col">
          <AnimatePresence>
            {showTutorial && <TutorialOverlay onStart={handleStart} />}
          </AnimatePresence>

          <div className="flex-1 flex items-center justify-center p-4">
            <SolarScene currentStep={currentStep} />
          </div>

          {/* Step title + navigation */}
          {currentStep > 0 && (
            <div className="px-6 pb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-3"
                >
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Step {currentStep} of 5
                  </span>
                  <h2 className="text-xl font-bold text-foreground">{activeStep?.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xl">{activeStep?.description}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  disabled={currentStep <= 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                {currentStep < 5 ? (
                  <button
                    onClick={next}
                    className="flex items-center gap-1 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={reset}
                    className="flex items-center gap-1 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <RotateCcw size={16} /> Start Over
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Cost sidebar */}
        <aside className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border bg-card p-5">
          <CostSidebar currentStep={currentStep} />
        </aside>
      </div>
    </div>
  );
};

export default Index;
