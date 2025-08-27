"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng, toJpeg } from "html-to-image";

export function ExportButtons() {
  async function exportImage(kind: "png" | "jpg") {
    const node = document.getElementById("cover-canvas");
    if (!node) return;
    try {
      const dataUrl =
        kind === "png"
          ? await toPng(node, { cacheBust: true, pixelRatio: 2 })
          : await toJpeg(node, {
              cacheBust: true,
              pixelRatio: 2,
              quality: 0.92,
            });
      const link = document.createElement("a");
      link.download = `cover.${kind === "png" ? "png" : "jpg"}`;
      link.href = dataUrl;
      link.click();
      toast.success("已导出");
    } catch (e) {
      toast.error("导出失败");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => exportImage("png")}>下载 PNG</Button>
      <Button variant="outline" onClick={() => exportImage("jpg")}>
        下载 JPG
      </Button>
    </div>
  );
}

