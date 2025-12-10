import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { Play, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { simulateWorkflow, type SimulationLog } from '../../lib/api';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function SimulationPanel() {
    const { getNodes, getEdges } = useReactFlow();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<SimulationLog[]>([]);

    const runSimulation = async () => {
        setLoading(true);
        setLogs([]);
        setIsOpen(true);

        try {
            const nodes = getNodes();
            const edges = getEdges();
            const results = await simulateWorkflow(nodes, edges);
            setLogs(results);
        } catch (error) {
            console.error("Simulation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={runSimulation}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all font-medium"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Simulate Workflow
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-64 right-80 z-40 bg-background border-t border-border shadow-2xl max-h-[400px] flex flex-col"
                    >
                        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Play className="w-4 h-4 text-green-500" />
                                Execution Log
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:underline">
                                Close
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {loading && (
                                <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Running simulation...
                                </div>
                            )}

                            {!loading && logs.length === 0 && (
                                <div className="text-center text-muted-foreground py-4">
                                    No logs generated.
                                </div>
                            )}

                            {logs.map((log, index) => (
                                <motion.div
                                    key={log.stepId}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={cn(
                                        "flex items-start gap-3 p-3 rounded-lg border text-sm",
                                        log.status === 'failed' ? "bg-red-50 border-red-200" : "bg-card border-border"
                                    )}
                                >
                                    <div className="mt-0.5">
                                        {log.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                        {log.status === 'failed' && <XCircle className="w-4 h-4 text-red-500" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold">{log.nodeLabel}</span>
                                            <span className="text-[10px] text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-muted-foreground">{log.message}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
