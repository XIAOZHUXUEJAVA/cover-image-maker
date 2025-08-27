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
    <div {...getRootProps()} className="flex items-center gap-2">
      <input {...getInputProps()} />
      <Button type="button" variant="secondary" onClick={open}>
        选择图片
      </Button>
      <span className="text-sm text-muted-foreground">
        或拖拽图片到这里{isDragActive ? "…" : ""}
      </span>
    </div>
  );
}

