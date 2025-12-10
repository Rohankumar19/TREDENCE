import React, { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const AutomatedNode = memo(({ data, selected }: NodeProps<any>) => {
    return (
        <BaseNode
            label={data.label || 'System Action'}
            icon={Zap}
            color="bg-green-500"
            selected={selected}
        >
            <div className="flex flex-col gap-1">
                <div className="font-medium text-foreground">
                    {data.actionType ? `Action: ${data.actionType}` : 'Select Action...'}
                </div>
                {data.actionParams && (
                    <div className="text-[10px] text-muted-foreground truncate">
                        {JSON.stringify(data.actionParams)}
                    </div>
                )}
            </div>
        </BaseNode>
    );
});

AutomatedNode.displayName = 'AutomatedNode';
