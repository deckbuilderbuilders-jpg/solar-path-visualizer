import { motion, AnimatePresence } from "framer-motion";

interface SolarSceneProps {
  currentStep: number;
}

const SolarScene = ({ currentStep }: SolarSceneProps) => {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" style={{ maxHeight: "70vh" }}>
      {/* Sky */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(205, 75%, 65%)" />
          <stop offset="100%" stopColor="hsl(205, 75%, 82%)" />
        </linearGradient>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(120, 35%, 52%)" />
          <stop offset="100%" stopColor="hsl(120, 40%, 38%)" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(215, 55%, 50%)" />
          <stop offset="100%" stopColor="hsl(215, 60%, 35%)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="350" fill="url(#skyGrad)" />

      {/* Sun */}
      <circle cx="120" cy="80" r="40" fill="hsl(45, 95%, 65%)" opacity="0.9" />
      <circle cx="120" cy="80" r="50" fill="hsl(45, 95%, 65%)" opacity="0.15" />

      {/* Clouds */}
      <g opacity="0.7">
        <ellipse cx="300" cy="70" rx="50" ry="18" fill="white" />
        <ellipse cx="330" cy="60" rx="35" ry="15" fill="white" />
        <ellipse cx="270" cy="65" rx="30" ry="12" fill="white" />
      </g>
      <g opacity="0.5">
        <ellipse cx="600" cy="100" rx="40" ry="14" fill="white" />
        <ellipse cx="625" cy="92" rx="28" ry="12" fill="white" />
      </g>

      {/* Ground */}
      <rect x="0" y="340" width="800" height="160" fill="url(#grassGrad)" />

      {/* Grass texture lines */}
      {Array.from({ length: 30 }).map((_, i) => (
        <line
          key={i}
          x1={20 + i * 26}
          y1={380 + Math.sin(i) * 10}
          x2={20 + i * 26 - 3}
          y2={370 + Math.sin(i) * 10}
          stroke="hsl(120, 45%, 42%)"
          strokeWidth="1.5"
          opacity="0.5"
        />
      ))}

      {/* House */}
      <g>
        {/* Wall */}
        <rect x="580" y="230" width="180" height="120" fill="hsl(35, 30%, 80%)" stroke="hsl(30, 25%, 65%)" strokeWidth="2" />
        {/* Roof */}
        <polygon points="565,230 670,170 775,230" fill="hsl(15, 35%, 35%)" stroke="hsl(15, 30%, 28%)" strokeWidth="2" />
        {/* Door */}
        <rect x="645" y="290" width="35" height="60" fill="hsl(25, 40%, 40%)" rx="2" />
        <circle cx="673" cy="322" r="2.5" fill="hsl(45, 60%, 60%)" />
        {/* Windows */}
        <rect x="600" y="260" width="30" height="30" fill="hsl(205, 50%, 75%)" stroke="hsl(0, 0%, 95%)" strokeWidth="2" rx="1" />
        <line x1="615" y1="260" x2="615" y2="290" stroke="hsl(0, 0%, 95%)" strokeWidth="1.5" />
        <line x1="600" y1="275" x2="630" y2="275" stroke="hsl(0, 0%, 95%)" strokeWidth="1.5" />
        <rect x="700" y="260" width="30" height="30" fill="hsl(205, 50%, 75%)" stroke="hsl(0, 0%, 95%)" strokeWidth="2" rx="1" />
        <line x1="715" y1="260" x2="715" y2="290" stroke="hsl(0, 0%, 95%)" strokeWidth="1.5" />
        <line x1="700" y1="275" x2="730" y2="275" stroke="hsl(0, 0%, 95%)" strokeWidth="1.5" />
        {/* Chimney */}
        <rect x="710" y="180" width="20" height="50" fill="hsl(0, 15%, 45%)" />
      </g>

      {/* Electrical panel on house */}
      {currentStep >= 4 && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <rect x="570" y="280" width="18" height="25" fill="hsl(200, 10%, 50%)" stroke="hsl(200, 10%, 35%)" strokeWidth="1.5" rx="2" />
          <line x1="575" y1="288" x2="583" y2="288" stroke="hsl(120, 50%, 50%)" strokeWidth="1.5" />
          <line x1="575" y1="293" x2="583" y2="293" stroke="hsl(0, 60%, 50%)" strokeWidth="1.5" />
          <line x1="575" y1="298" x2="583" y2="298" stroke="hsl(45, 70%, 55%)" strokeWidth="1.5" />
        </motion.g>
      )}

      {/* Step 1: Posts and Frames */}
      {currentStep >= 1 && (
        <motion.g
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {/* Ground posts */}
          {[100, 200, 300, 400].map((x, i) => (
            <motion.g
              key={`post-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              {/* Post in ground */}
              <rect x={x - 4} y="330" width="8" height="30" fill="hsl(200, 8%, 55%)" stroke="hsl(200, 8%, 40%)" strokeWidth="1" />
              {/* Frame rail */}
              <rect x={x - 3} y="295" width="6" height="40" fill="hsl(200, 8%, 60%)" stroke="hsl(200, 8%, 45%)" strokeWidth="1" />
            </motion.g>
          ))}
          {/* Horizontal frame rails */}
          <motion.rect
            x="95" y="295" width="310" height="4"
            fill="hsl(200, 8%, 60%)" stroke="hsl(200, 8%, 45%)" strokeWidth="0.5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ transformOrigin: "95px 297px" }}
          />
          <motion.rect
            x="95" y="320" width="310" height="4"
            fill="hsl(200, 8%, 60%)" stroke="hsl(200, 8%, 45%)" strokeWidth="0.5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ transformOrigin: "95px 322px" }}
          />
        </motion.g>
      )}

      {/* Step 2: Solar Panels */}
      {currentStep >= 2 && (
        <motion.g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 105 + col * 100;
            const y = 288 + row * 20;
            return (
              <motion.g
                key={`panel-${i}`}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              >
                <rect x={x} y={y} width="90" height="16" fill="url(#panelGrad)" stroke="hsl(200, 8%, 55%)" strokeWidth="1" rx="1" />
                {/* Panel grid lines */}
                <line x1={x + 30} y1={y} x2={x + 30} y2={y + 16} stroke="hsl(215, 40%, 45%)" strokeWidth="0.5" opacity="0.5" />
                <line x1={x + 60} y1={y} x2={x + 60} y2={y + 16} stroke="hsl(215, 40%, 45%)" strokeWidth="0.5" opacity="0.5" />
                <line x1={x} y1={y + 8} x2={x + 90} y2={y + 8} stroke="hsl(215, 40%, 45%)" strokeWidth="0.5" opacity="0.5" />
              </motion.g>
            );
          })}
        </motion.g>
      )}

      {/* Step 3: Wires */}
      {currentStep >= 3 && (
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Wire from panels to house */}
          <motion.path
            d="M 405 310 C 430 310, 450 360, 470 370 C 490 380, 520 370, 540 350 C 555 335, 565 310, 570 295"
            fill="none"
            stroke="hsl(25, 85%, 55%)"
            strokeWidth="3"
            strokeDasharray="6 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {/* Conduit at ground */}
          <motion.rect
            x="450" y="365" width="100" height="6" rx="3"
            fill="hsl(200, 8%, 50%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          />
          {/* Wire label */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <rect x="455" y="385" width="55" height="16" rx="3" fill="hsl(25, 85%, 55%)" opacity="0.15" />
            <text x="482" y="396" textAnchor="middle" fontSize="8" fill="hsl(25, 70%, 40%)" fontWeight="600">AC/DC</text>
          </motion.g>
        </motion.g>
      )}

      {/* Step 4: Connection indicator */}
      {currentStep >= 4 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Inverter box */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <rect x="500" y="300" width="30" height="35" fill="hsl(200, 10%, 85%)" stroke="hsl(200, 10%, 55%)" strokeWidth="1.5" rx="3" />
            <text x="515" y="314" textAnchor="middle" fontSize="6" fill="hsl(200, 10%, 35%)" fontWeight="700">INV</text>
            {/* Status LED */}
            <motion.circle
              cx="515" cy="325"
              r="3"
              fill="hsl(120, 70%, 50%)"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.g>
          {/* Connection line to panel */}
          <line x1="530" y1="317" x2="570" y2="292" stroke="hsl(200, 10%, 50%)" strokeWidth="2" />
        </motion.g>
      )}

      {/* Step 5: Battery */}
      {currentStep >= 5 && (
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Battery unit */}
          <rect x="540" y="335" width="28" height="18" rx="3" fill="hsl(145, 60%, 40%)" stroke="hsl(145, 55%, 30%)" strokeWidth="1.5" />
          <rect x="548" y="331" width="12" height="5" rx="1" fill="hsl(145, 55%, 30%)" />
          {/* Battery level bars */}
          <motion.rect x="545" y="340" width="5" height="8" rx="1" fill="hsl(145, 70%, 55%)"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3 }} style={{ transformOrigin: "bottom" }}
          />
          <motion.rect x="552" y="340" width="5" height="8" rx="1" fill="hsl(145, 70%, 55%)"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5 }} style={{ transformOrigin: "bottom" }}
          />
          <motion.rect x="559" y="340" width="5" height="8" rx="1" fill="hsl(145, 70%, 55%)"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.7 }} style={{ transformOrigin: "bottom" }}
          />
          {/* Wire from battery to inverter */}
          <line x1="540" y1="342" x2="530" y2="330" stroke="hsl(145, 50%, 35%)" strokeWidth="2" />
          {/* Label */}
          <text x="554" y="365" textAnchor="middle" fontSize="7" fill="hsl(145, 50%, 30%)" fontWeight="600">10kWh</text>
        </motion.g>
      )}

      {/* Energy flow animation when complete */}
      {currentStep >= 4 && (
        <motion.g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`energy-${i}`}
              r="3"
              fill="hsl(45, 95%, 60%)"
              opacity="0.8"
              initial={{ offsetDistance: "0%" }}
              animate={{
                cx: [200, 405, 515, 570],
                cy: [300, 310, 317, 292],
              }}
              transition={{
                duration: 3,
                delay: i * 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.g>
      )}
    </svg>
  );
};

export default SolarScene;
