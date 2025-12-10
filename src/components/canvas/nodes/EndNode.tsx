import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { StopCircle } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const EndNode = memo(({ data, selected }: NodeProps<any>) => {
    return (
        <div className="relative">
            <BaseNode
                label={data.label || 'End Workflow'}
                icon={StopCircle}
                color="bg-red-500"
                selected={selected}
            >
                <div className="text-center text-muted-foreground">
                    Workflow Completes
                </div>
            </BaseNode>
            {/* Override handle - End node only has Target */}
            <Handle type="source" position={Position.Right} className="!hidden" />
        </div>
    );
});

EndNode.displayName = 'EndNode';
