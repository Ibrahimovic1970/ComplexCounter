import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

export default function ComplexCounter() {
    const [count, setCount] = useState(0);
    const [lastAction, setLastAction] = useState(null);
    const [history, setHistory] = useState([]);

    // Animasi hitungan
    const variants = {
        up: { y: -20, color: "#2ecc40", scale: 1.2 },
        down: { y: 20, color: "#ff4136", scale: 1.05 },
        reset: { color: "#4677f5", scale: 1 },
        initial: { y: 0, color: "#333", scale: 1 }
    };

    const handle = (type) => {
        let newCount = count;
        if (type === "up") newCount++;
        if (type === "down") newCount--;
        if (type === "reset") newCount = 0;

        setCount(newCount);
        setLastAction(type);
        setHistory([...history, { act: type, val: newCount }]);
    };

    return (
        <div className="counter-card">
            <div className="counter-controls">
                <button className="counter-btn" onClick={() => handle("down")}>−</button>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={count}
                        initial="initial"
                        animate={lastAction || "initial"}
                        exit="initial"
                        variants={variants}
                        transition={{ duration: 0.35 }}
                        className="counter-num"
                    >
                        {count}
                    </motion.span>
                </AnimatePresence>
                <button className="counter-btn" onClick={() => handle("up")}>+</button>
            </div>
            <button className="counter-btn reset" onClick={() => handle("reset")}>Reset</button>

            <div className="counter-history">
                <div>History:</div>
                <ul>
                    {history.length === 0 ? (
                        <li><span className="no-history">No actions yet</span></li>
                    ) : (
                        history.slice(-5).reverse().map((item, i) => (
                            <li key={i}><b>{item.act}</b> → <span>{item.val}</span></li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
