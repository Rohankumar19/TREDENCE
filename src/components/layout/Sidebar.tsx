import React from 'react';
import { Play, ClipboardList, CheckSquare, Zap, StopCircle, GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import { type NodeType } from '../../types';

export function Sidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: NodeType, label: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow-label', label);
        event.dataTransfer.effectAllowed = 'move';
    };

    const DraggableNode = ({ type, label, icon: Icon, color }: { type: NodeType; label: string; icon: any; color: string }) => (
        <div
            className={cn(
                "flex items-center gap-3 p-3 mb-2 bg-card border border-border rounded-lg cursor-grab hover:shadow-md transition-all active:cursor-grabbing",
                "text-sm font-medium text-foreground"
            )}
            onDragStart={(event) => onDragStart(event, type, label)}
            draggable
        >
            <div className={cn("w-8 h-8 rounded-md flex items-center justify-center text-white", color)}>
                <Icon className="w-4 h-4" />
            </div>
            <span>{label}</span>
            <GripVertical className="ml-auto w-4 h-4 text-muted-foreground" />
        </div>
    );

    return (
        <aside className="w-64 bg-background border-r border-border h-[calc(100vh-4rem)] flex flex-col fixed top-16 left-0 z-10 overflow-y-auto">
            <div className="p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Workflow Nodes</h3>

                <DraggableNode type="start" label="Start" icon={Play} color="bg-blue-500" />
                <DraggableNode type="task" label="Task" icon={ClipboardList} color="bg-orange-500" />
                <DraggableNode type="approval" label="Approval" icon={CheckSquare} color="bg-purple-500" />
                <DraggableNode type="automated" label="Automation" icon={Zap} color="bg-green-500" />
                <DraggableNode type="end" label="End" icon={StopCircle} color="bg-red-500" />
            </div>

            <div className="p-4 mt-auto border-t border-border">
                <div className="p-4 bg-accent/20 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Pro Tip</h4>
                    <p className="text-xs text-muted-foreground">
                        Drag nodes to the canvas to build your workflow.
                    </p>
                </div>
            </div>
        </aside>
    );
}
