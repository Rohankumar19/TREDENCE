import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '../../../lib/utils';
import { type LucideIcon } from 'lucide-react';

interface BaseNodeProps {
    label: string;
    icon: LucideIcon;
    color: string;
    children?: React.ReactNode;
    selected?: boolean;
}

export const BaseNode = memo(({ label, icon: Icon, color, children, selected }: BaseNodeProps) => {
    return (
        <div className={cn(
            "min-w-[200px] bg-card text-card-foreground rounded-lg border border-border shadow-sm transition-all duration-200",
            selected && "ring-2 ring-primary border-primary shadow-md"
        )}>
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border-b border-border bg-muted/30 rounded-t-lg">
                <div className={cn("w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0 shadow-sm", color)}>
                    <Icon className="w-4 h-4" />
                </div>
                <div className="font-semibold text-sm truncate pr-2">{label}</div>
            </div>

            {/* Body */}
            <div className="p-3 text-xs text-muted-foreground">
                {children || <span className="italic">No details configured</span>}
            </div>

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !-left-1.5 !bg-muted-foreground hover:!bg-primary transition-colors !border-background"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !-right-1.5 !bg-muted-foreground hover:!bg-primary transition-colors !border-background"
            />
        </div>
    );
});

BaseNode.displayName = 'BaseNode';
