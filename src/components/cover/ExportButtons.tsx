"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng, toJpeg } from "html-to-image";
import { Download, Loader2 } from "lucide-react";

export function ExportButtons() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState("");

  async function exportImage(kind: "png" | "jpg") {
    const node = document.getElementById("cover-canvas");
    if (!node) return;
    
    setIsExporting(true);
    setExportProgress("准备导出...");
    
    try {
      // 显示进度提示
      toast.loading("正在生成图片...", { id: "export-progress" });
      setExportProgress("正在渲染图片...");
      
      const dataUrl =
        kind === "png"
          ? await toPng(node, { cacheBust: true, pixelRatio: 2 })
          : await toJpeg(node, {
              cacheBust: true,
              pixelRatio: 2,
              quality: 0.92,
            });
      
      setExportProgress("正在下载...");
      toast.loading("正在下载文件...", { id: "export-progress" });
      
      const link = document.createElement("a");
      link.download = `cover.${kind === "png" ? "png" : "jpg"}`;
      link.href = dataUrl;
      link.click();
      
      // 成功提示
      toast.success(`${kind.toUpperCase()} 文件已下载完成！`, { id: "export-progress" });
      setExportProgress("");
    } catch (e) {
      console.error("Export failed:", e);
      toast.error("导出失败，请重试", { id: "export-progress" });
      setExportProgress("");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Button 
          onClick={() => exportImage("png")}
          disabled={isExporting}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              导出中...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              下载 PNG
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => exportImage("jpg")}
          disabled={isExporting}
          className="hover:bg-accent disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              导出中...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              下载 JPG
            </>
          )}
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        {isExporting ? (
          <span className="text-primary font-medium">{exportProgress}</span>
        ) : (
          "高清 2x 分辨率"
        )}
      </div>
    </div>
  );
}