import React, { useEffect } from 'react';
import { useReactFlow, type Node, useNodes } from '@xyflow/react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { type NodeType } from '../../types';

export function PropertiesPanel() {
    const { setNodes } = useReactFlow();
    const nodes = useNodes();
    // Find the single selected node
    const selectedNode = nodes.find((n) => n.selected);

    if (!selectedNode) {
        return (
            <div className="w-80 bg-background border-l border-border h-full p-4 overflow-y-auto hidden lg:block">
                <h3 className="font-semibold mb-4">Properties</h3>
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground text-sm text-center bg-accent/10 rounded-lg p-4">
                    <p>Select a node on the canvas to configure it.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-80 bg-background border-l border-border h-full flex flex-col hidden lg:flex">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
                <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    {selectedNode.type} Node
                </span>
                <button
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setNodes((nds) => nds.map(n => ({ ...n, selected: false })))}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <NodeForm key={selectedNode.id} node={selectedNode} setNodes={setNodes} />
            </div>
        </div>
    );
}

function NodeForm({ node, setNodes }: { node: Node; setNodes: (payload: any) => void }) {
    const { register, watch } = useForm({
        defaultValues: {
            label: node.data.label,
            ...node.data
        } as any
    });

    const formValues = watch();

    // Sync form changes to node data immediately (or debounced)
    useEffect(() => {
        setNodes((nds: Node[]) => nds.map((n) => {
            if (n.id === node.id) {
                return {
                    ...n,
                    data: { ...n.data, ...formValues }
                };
            }
            return n;
        }));
    }, [JSON.stringify(formValues), node.id, setNodes]);

    const type = node.type as NodeType;

    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
                <label className="text-sm font-medium">Label</label>
                <input
                    {...register('label')}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
            </div>

            {type === 'task' && (
                <>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Assignee</label>
                        <input
                            {...register('assignee')}
                            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="e.g. John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Due Date</label>
                        <input
                            type="date"
                            {...register('dueDate')}
                            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                </>
            )}

            {type === 'approval' && (
                <>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Approver Role</label>
                        <select
                            {...register('approverRole')}
                            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="Manager">Manager</option>
                            <option value="HRBP">HRBP</option>
                            <option value="Director">Director</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Auto-approve Threshold ($)</label>
                        <input
                            type="number"
                            {...register('autoApproveThreshold')}
                            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                </>
            )}

            {type === 'automated' && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">Action Type</label>
                    <select
                        {...register('actionType')}
                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="">Select action...</option>
                        <option value="send_email">Send Email</option>
                        <option value="generate_pdf">Generate PDF</option>
                        <option value="slack_notify">Slack Notification</option>
                    </select>
                </div>
            )}

            {type === 'start' && (
                <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-md">
                    Start nodes are the entry point of the workflow. Manual trigger is assumed directly.
                </div>
            )}

            {type === 'end' && (
                <div className="space-y-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register('isSummary')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label className="text-sm font-medium">Show Summary Screen</label>
                </div>
            )}
        </form>
    );
}
