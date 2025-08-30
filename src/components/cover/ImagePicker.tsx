"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCoverStore } from "@/lib/store/cover-store";
import { Button } from "@/components/ui/button";

export function ImagePicker() {
  const { setImageUrl } = useCoverStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
    noClick: true,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`flex items-center gap-3 p-3 rounded-lg border-2 border-dashed transition-all duration-200 ${
        isDragActive 
          ? 'border-primary bg-primary/5 scale-[1.02]' 
          : 'border-border hover:border-primary/50 hover:bg-accent/30'
      }`}
    >
      <input {...getInputProps()} />
      <Button 
        type="button" 
        variant="secondary" 
        onClick={open}
        className="shrink-0"
      >
        选择图片
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setImageUrl(null)}
        className="shrink-0"
      >
        清除图片
      </Button>
      <div className="flex-1">
        <span className={`text-sm transition-colors ${
          isDragActive ? 'text-primary font-medium' : 'text-muted-foreground'
        }`}>
          {isDragActive ? '松开鼠标上传图片' : '或拖拽图片到这里'}
        </span>
        <div className="text-xs text-muted-foreground mt-1">
          支持 JPG、PNG、WebP 格式
        </div>
      </div>
    </div>
  );
}

