"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng, toJpeg } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import { useCanvasStore } from "@/lib/store/canvas-store";

export function ExportButtons() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState("");
  const { currentSize } = useCanvasStore();

  async function exportImage(kind: "png" | "jpg") {
    const node = document.getElementById("cover-canvas");
    if (!node) return;
    
    setIsExporting(true);
    setExportProgress("准备导出...");
    
    try {
      // 显示进度提示
      toast.loading("正在生成图片...", { id: "export-progress" });
      setExportProgress("正在渲染图片...");
      
      // 临时保存原始样式
      const originalStyle = {
        width: node.style.width,
        height: node.style.height,
        transform: node.style.transform,
        margin: node.style.margin,
        padding: node.style.padding,
        borderRadius: node.style.borderRadius,
        boxShadow: node.style.boxShadow
      };
      
      // 临时设置为导出尺寸，移除所有装饰性样式
      node.style.width = `${currentSize.width}px`;
      node.style.height = `${currentSize.height}px`;
      node.style.transform = 'none';
      node.style.margin = '0';
      node.style.padding = '0';
      node.style.borderRadius = '0';
      node.style.boxShadow = 'none';
      
      const dataUrl =
        kind === "png"
          ? await toPng(node, { 
              cacheBust: true, 
              pixelRatio: 1,
              width: currentSize.width,
              height: currentSize.height
            })
          : await toJpeg(node, {
              cacheBust: true,
              pixelRatio: 1,
              width: currentSize.width,
              height: currentSize.height,
              quality: 0.92,
            });
      
      // 恢复原始样式
      node.style.width = originalStyle.width;
      node.style.height = originalStyle.height;
      node.style.transform = originalStyle.transform;
      node.style.margin = originalStyle.margin;
      node.style.padding = originalStyle.padding;
      node.style.borderRadius = originalStyle.borderRadius;
      node.style.boxShadow = originalStyle.boxShadow;
      
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