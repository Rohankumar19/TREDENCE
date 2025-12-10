import React, { memo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { CheckSquare } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const ApprovalNode = memo(({ data, selected }: NodeProps<any>) => {
    return (
        <BaseNode
            label={data.label || 'Manager Approval'}
            icon={CheckSquare}
            color="bg-purple-500"
            selected={selected}
        >
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Approver:</span>
                    <span className="font-medium text-foreground">{data.approverRole || 'Manager'}</span>
                </div>
                {data.autoApproveThreshold && (
                    <div className="text-[10px] text-muted-foreground mt-1">
                        Auto-approve &lt; ${data.autoApproveThreshold}
                    </div>
                )}
            </div>
        </BaseNode>
    );
});

ApprovalNode.displayName = 'ApprovalNode';
