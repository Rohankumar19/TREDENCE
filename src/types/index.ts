export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface WorkflowNodeData {
    label: string;
    description?: string;
    // Start Node
    metadata?: Record<string, string>;
    // Task Node
    assignee?: string;
    dueDate?: string;
    customFields?: Record<string, string>;
    // Approval Node
    approverRole?: string;
    autoApproveThreshold?: number;
    // Automated Node
    actionType?: string;
    actionParams?: Record<string, any>;
    // End Node
    endMessage?: string;
    isSummary?: boolean;
}

export type AutomationAction = {
    id: string;
    label: string;
    params: string[];
}
