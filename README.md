# HR Workflow Designer Prototype

A React + React Flow application for designing and simulating HR automation workflows.

## Features
- **Drag-and-Drop Canvas**: Visually design workflows with custom nodes (Start, Task, Approval, Automation, End).
- **Node Configuration**: Edit properties of each node using a dynamic form panel.
- **Workflow Simulation**: Simulate the execution of the workflow with step-by-step logging.
- **Mock API**: Simulates backend actions and automations.
- **Modern UI**: Clean, premium aesthetic inspired by "CodeAuto", using Tailwind CSS.

## Architecture
- **Framework**: Vite + React + TypeScript
- **State Management**: React Flow's internal state + React Context (Provider)
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
- **Icons**: Lucide React
- **Forms**: React Hook Form

### Folder Structure
- `src/components/canvas`: Custom Node components and the main WorkflowCanvas.
- `src/components/layout`: App shell (Header, Sidebar, PropertiesPanel).
- `src/components/simulation`: SimulationRunner UI.
- `src/lib`: Utilities and Mock API.
- `src/types`: TypeScript definitions.

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173

## Design Decisions
- **Custom Nodes**: Built using a generic `BaseNode` wrapper to ensure visual consistency while allowing specific content for each node type.
- **Properties Panel**: Uses `useReactFlow` and `useNodes` to sync form state directly with the graph data model.
- **Simulation**: Implemented as a client-side BFS traversal mock to demonstrate the "execution" concept without a real backend engine.

## Assumptions
- The "Start" node is the entry point.
- Simulation assumes a happy path execution.
