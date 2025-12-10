import React from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { PropertiesPanel } from './components/layout/PropertiesPanel';
import { SimulationPanel } from './components/simulation/SimulationPanel';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <ReactFlowProvider>
        <main className="pt-16 pl-64 h-screen flex">
          {/* Canvas Area */}
          <div className="flex-1 h-full bg-slate-50 relative">
            <WorkflowCanvas />
          </div>

          {/* Properties Panel (Right Sidebar) */}
          <PropertiesPanel />
          <Sidebar />
          <SimulationPanel />
        </main>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
