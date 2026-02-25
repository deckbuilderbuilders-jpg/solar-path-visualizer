import { motion } from "framer-motion";
import { ArrowRight, Sun } from "lucide-react";

interface TutorialOverlayProps {
  onStart: () => void;
}

const TutorialOverlay = ({ onStart }: TutorialOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm rounded-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="bg-card rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-border text-center"
      >
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sun className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Ground-Mount Solar Installation
        </h2>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          Walk through each step of a solar installation — from posts in the ground to a fully connected system. 
          See exactly what goes into each phase and how much it costs.
        </p>
        <div className="space-y-2 text-left mb-6">
          {["Use the Next button to advance through 5 installation steps",
            "Watch the scene build up as components are added",
            "Review the cost breakdown for each step on the right"
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                {i + 1}
              </span>
              {tip}
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground rounded-lg py-3 px-6 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Start Walkthrough
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TutorialOverlay;
