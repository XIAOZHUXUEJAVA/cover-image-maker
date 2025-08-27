"use client";
import { ControlsPanel } from "@/components/cover/ControlsPanel";
import { CoverCanvas } from "@/components/cover/CoverCanvas";
import { ImagePicker } from "@/components/cover/ImagePicker";
import { ExportButtons } from "@/components/cover/ExportButtons";
import { Button } from "@/components/ui/button";
import { useCoverStore } from "@/lib/store/cover-store";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export function CoverEditor() {
  const { reset } = useCoverStore();
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Cover Maker</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" onClick={reset}>
              清除
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-6 p-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Card className="p-4 shadow-sm">
            <CoverCanvas />
          </Card>
          <Card className="p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ImagePicker />
              <ExportButtons />
            </div>
          </Card>
        </div>
        <div className="lg:sticky lg:top-16 h-fit">
          <Card className="p-4 shadow-sm">
            <ControlsPanel />
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-6">
        <Separator />
        {/* <div className="flex items-center justify-between py-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Cover Maker</span>
          <Link href="/editor" className="hover:underline">
            回到顶部
          </Link>
        </div> */}
      </div>
    </div>
  );
}
