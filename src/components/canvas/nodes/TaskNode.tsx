import React, { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { ClipboardList } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const TaskNode = memo(({ data, selected }: NodeProps<any>) => {
    return (
        <BaseNode
            label={data.label || 'Human Task'}
            icon={ClipboardList}
            color="bg-orange-500"
            selected={selected}
        >
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Assignee:</span>
                    <span className="font-medium text-foreground">{data.assignee || 'Unassigned'}</span>
                </div>
                {data.dueDate && (
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Due:</span>
                        <span className="text-foreground">{data.dueDate}</span>
                    </div>
                )}
            </div>
        </BaseNode>
    );
});

TaskNode.displayName = 'TaskNode';
