import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

export interface StepData {
  id: number;
  title: string;
  description: string;
  items: { name: string; cost: number }[];
}

export const STEPS: StepData[] = [
  {
    id: 1,
    title: "Posts & Frames",
    description: "Steel posts are driven into the ground and mounting frames are installed to support the panels at the optimal angle.",
    items: [
      { name: "Ground-mount posts (x8)", cost: 1200 },
      { name: "Aluminum racking frame", cost: 1800 },
      { name: "Installation labor", cost: 500 },
    ],
  },
  {
    id: 2,
    title: "Solar Panels",
    description: "High-efficiency monocrystalline panels are secured to the racking system, positioned for maximum sun exposure.",
    items: [
      { name: "400W panels (x6)", cost: 7200 },
      { name: "Panel mounting hardware", cost: 400 },
      { name: "Installation labor", cost: 800 },
    ],
  },
  {
    id: 3,
    title: "Wiring & Conduit",
    description: "Electrical wiring connects the panels to the inverter and main panel. Conduit protects the cables underground.",
    items: [
      { name: "DC wiring & connectors", cost: 600 },
      { name: "Underground conduit", cost: 450 },
      { name: "AC wiring to panel", cost: 350 },
      { name: "Electrician labor", cost: 600 },
    ],
  },
  {
    id: 4,
    title: "System Connection",
    description: "The inverter converts DC power to AC. The system is connected to your home's electrical panel and the utility grid.",
    items: [
      { name: "Hybrid inverter", cost: 2200 },
      { name: "Meter & monitoring", cost: 350 },
      { name: "Permits & inspection", cost: 450 },
    ],
  },
  {
    id: 5,
    title: "Battery Storage",
    description: "A battery backup stores excess energy for use at night or during outages, maximizing your energy independence.",
    items: [
      { name: "10kWh LiFePO4 battery", cost: 6500 },
      { name: "Battery enclosure", cost: 400 },
      { name: "Installation & config", cost: 600 },
    ],
  },
];

interface CostSidebarProps {
  currentStep: number;
}

const CostSidebar = ({ currentStep }: CostSidebarProps) => {
  const completedSteps = STEPS.filter((s) => s.id <= currentStep);
  const totalCost = completedSteps.reduce(
    (sum, step) => sum + step.items.reduce((s, item) => s + item.cost, 0),
    0
  );

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-foreground mb-1">Cost Breakdown</h2>
      <p className="text-xs text-muted-foreground mb-4">Click through each step to see costs</p>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;
          const isPending = step.id > currentStep;
          const stepTotal = step.items.reduce((s, item) => s + item.cost, 0);

          return (
            <motion.div
              key={step.id}
              layout
              className={`rounded-lg border p-3 transition-colors ${
                isActive
                  ? "border-primary bg-primary/5"
                  : isDone
                  ? "border-step-done/30 bg-step-done/5"
                  : "border-border bg-card opacity-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDone
                      ? "bg-step-done text-primary-foreground"
                      : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-step-pending text-muted-foreground"
                  }`}
                >
                  {isDone ? <Check size={12} /> : step.id}
                </div>
                <span className={`text-sm font-semibold ${isPending ? "text-muted-foreground" : "text-foreground"}`}>
                  {step.title}
                </span>
                <span className="ml-auto text-sm font-bold text-foreground">
                  {isPending ? "—" : `$${stepTotal.toLocaleString()}`}
                </span>
              </div>

              <AnimatePresence>
                {(isActive || isDone) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {isActive && (
                      <p className="text-xs text-muted-foreground mb-2 mt-1">{step.description}</p>
                    )}
                    <div className="space-y-1">
                      {step.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span className="text-foreground font-medium">${item.cost.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-foreground">Total Investment</span>
          <motion.span
            key={totalCost}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold text-primary"
          >
            ${totalCost.toLocaleString()}
          </motion.span>
        </div>
        {currentStep >= 5 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mt-1"
          >
            Est. payback period: 6-8 years · 25+ year panel warranty
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CostSidebar;
