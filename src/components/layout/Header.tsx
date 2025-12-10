import React from 'react';
import { LayoutGrid, FileText, Settings, HelpCircle, User, Bell } from 'lucide-react';

export function Header() {
    return (
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10 w-full font-sans">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <LayoutGrid className="text-primary-foreground w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-foreground">CodeAuto</span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors text-foreground">
                    <LayoutGrid className="w-4 h-4" />
                    Dashboard
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <FileText className="w-4 h-4" />
                    Workflows
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                </a>
            </nav>

            <div className="flex items-center gap-4 text-muted-foreground">
                <button className="p-2 hover:bg-accent rounded-full">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-accent rounded-full">
                    <HelpCircle className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground">
                    <User className="w-5 h-5" />
                </div>
            </div>
        </header>
    );
}
