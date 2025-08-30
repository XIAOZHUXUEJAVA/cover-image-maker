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
          {/* Usage Guide */}
          <Card className="p-4 rounded-2xl border border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              {/* <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div> */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-blue-900 mb-2">快速上手指南</h3>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• <strong>添加内容：</strong>在右侧&ldquo;内容&rdquo;标签页输入标题和副标题</p>
                  <p>• <strong>选择背景：</strong>点击&ldquo;选择图片&rdquo;或拖拽图片到下方区域</p>
                  <p>• <strong>调整样式：</strong>使用&ldquo;样式&rdquo;和&ldquo;布局&rdquo;标签页自定义外观</p>
                  <p>• <strong>导出封面：</strong>完成后点击下方&ldquo;下载 PNG&rdquo;或&ldquo;下载 JPG&rdquo;</p>
                </div>
              </div>
            </div>
          </Card>

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
