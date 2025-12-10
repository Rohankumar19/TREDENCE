import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const StartNode = memo(({ data, selected }: NodeProps<any>) => {
    return (
        <div className="relative">
            <BaseNode
                label={data.label || 'Start Workflow'}
                icon={Play}
                color="bg-blue-500"
                selected={selected}
            >
                <div className="flex flex-col gap-1">
                    <span className="font-medium">Trigger: Manual</span>
                    {data.metadata && Object.keys(data.metadata).length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                            {Object.keys(data.metadata).length} meta fields
                        </span>
                    )}
                </div>
            </BaseNode>
            {/* Override handle - Start node only has Source */}
            <Handle type="target" position={Position.Left} className="!hidden" />
        </div>
    );
});

StartNode.displayName = 'StartNode';
