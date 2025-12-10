import { type Node, type Edge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { type AutomationAction } from '../types';

// Mock Automations Data
const MOCK_AUTOMATIONS: AutomationAction[] = [
    { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
    { id: 'generate_doc', label: 'Generate Document', params: ['template_id', 'recipient'] },
    { id: 'slack_notify', label: 'Slack Notification', params: ['channel', 'message'] },
    { id: 'approval_request', label: 'Approval Request', params: ['approver_role'] },
];

export const fetchAutomations = async (): Promise<AutomationAction[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_AUTOMATIONS), 500);
    });
};

export interface SimulationLog {
    stepId: string;
    nodeId: string;
    nodeLabel: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    message: string;
    timestamp: string;
}

export const simulateWorkflow = async (nodes: Node[], edges: Edge[]): Promise<SimulationLog[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const logs: SimulationLog[] = [];

            // 1. Find Start Node
            const startNode = nodes.find((n) => n.type === 'start');
            if (!startNode) {
                logs.push({
                    stepId: uuidv4(),
                    nodeId: 'error',
                    nodeLabel: 'System',
                    status: 'failed',
                    message: 'No Start Node found in workflow.',
                    timestamp: new Date().toISOString()
                });
                return resolve(logs);
            }

            // Simple BFS/Traversal Simulation
            let queue: Node[] = [startNode];
            let visited = new Set<string>();

            // Max steps to prevent infinite loops in prototype
            let steps = 0;
            const MAX_STEPS = 20;

            while (queue.length > 0 && steps < MAX_STEPS) {
                const currentNode = queue.shift()!;
                if (visited.has(currentNode.id)) continue;
                visited.add(currentNode.id);
                steps++;

                // Log execution
                logs.push({
                    stepId: uuidv4(),
                    nodeId: currentNode.id,
                    nodeLabel: currentNode.data.label as string || currentNode.type || 'Node',
                    status: 'completed',
                    message: `Executed ${currentNode.type} step successfully.`,
                    timestamp: new Date().toISOString()
                });

                // Find connected outgoing nodes
                const outgoingEdges = edges.filter((e) => e.source === currentNode.id);
                const nextNodes = outgoingEdges
                    .map((e) => nodes.find((n) => n.id === e.target))
                    .filter((n): n is Node => !!n);

                queue.push(...nextNodes);

                if (currentNode.type === 'end') {
                    break; // Stop at end node
                }
            }

            if (steps >= MAX_STEPS) {
                logs.push({
                    stepId: uuidv4(),
                    nodeId: 'limit',
                    nodeLabel: 'System',
                    status: 'failed',
                    message: 'Simulation step limit reached (potential infinite loop).',
                    timestamp: new Date().toISOString()
                });
            }

            resolve(logs);
        }, 1000); // Simulate network delay
    });
};
