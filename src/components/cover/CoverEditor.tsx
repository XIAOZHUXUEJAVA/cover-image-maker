"use client";
import { ControlsPanel } from "@/components/cover/ControlsPanel";
import { CoverCanvas } from "@/components/cover/CoverCanvas";
import { ImagePicker } from "@/components/cover/ImagePicker";
import { ExportButtons } from "@/components/cover/ExportButtons";
import { KeyboardHandler } from "@/components/cover/KeyboardHandler";
import { Button } from "@/components/ui/button";
import { useCoverStore } from "@/lib/store/cover-store";
import { useCoverHistory } from "@/hooks/useCoverHistory";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { UsageGuide } from "@/components/ui/usage-guide";
import { WelcomeDialog } from "@/components/ui/welcome-dialog";

export function CoverEditor() {
  const { reset } = useCoverStore();
  const { theme, setTheme } = useTheme();
  const { undo, redo, canUndo, canRedo } = useCoverHistory();

  // 全局键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 避免在输入框中触发
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          undo();
        }
      } else if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
                 ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z')) {
        e.preventDefault();
        if (canRedo) {
          redo();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <WelcomeDialog />
      {/* Header with glassmorphism effect */}
      <div className="sticky top-0 z-30 border-b border-border/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Cover Maker
            </span>
          </div>
          <div className="flex items-center gap-3">
            <UsageGuide />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-lg transition-all duration-200 hover:bg-accent/50 hover:scale-105"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />
              ) : (
                <Moon className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />
              )}
            </Button>
            <Button 
              onClick={reset}
              className="h-9 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:from-orange-600 hover:to-red-600 border-0"
            >
              清除
            </Button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="container mx-auto grid grid-cols-1 gap-6 p-4 lg:gap-8 lg:p-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        {/* Left column - Preview and actions */}
        <div className="space-y-6">
          {/* Preview canvas */}
          <Card className="p-4 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-soft transition-all duration-300 hover:shadow-gentle">
            <div className="w-full overflow-auto">
              <CoverCanvas />
            </div>
          </Card>
          
          {/* Actions panel */}
          <Card className="p-5 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-soft transition-all duration-300 hover:shadow-gentle">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ImagePicker />
              <ExportButtons />
            </div>
          </Card>
        </div>
        
        {/* Right column - Controls */}
        <div className="lg:sticky lg:top-20 h-fit">
          <Card className="p-4 lg:p-5 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-soft transition-all duration-300 hover:shadow-gentle max-h-[calc(100vh-6rem)] overflow-auto">
            <ControlsPanel />
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 pb-8 mt-8">
        <Separator className="bg-border/20" />
        {/* <div className="flex items-center justify-between py-4 text-sm text-muted-foreground/60">
          <span>© {new Date().getFullYear()} Cover Maker</span>
          <Link href="/editor" className="hover:text-foreground/80 transition-colors duration-200">
            回到顶部
          </Link>
        </div> */}
      </div>
    </div>
  );
}
