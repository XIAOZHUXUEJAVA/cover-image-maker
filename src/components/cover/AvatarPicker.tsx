"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCoverStore } from "@/lib/store/cover-store";
import { Button } from "@/components/ui/button";

const gallery = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=256&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=256&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
];

export function AvatarPicker() {
  const { setAvatarUrl } = useCoverStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    },
    [setAvatarUrl]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
    noClick: true,
  });

  return (
    <div className="space-y-2" {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex items-center gap-2">
        <Button type="button" variant="secondary" onClick={open}>
          上传头像
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setAvatarUrl(null)}
        >
          清除头像
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {gallery.map((url) => (
          <button
            key={url}
            className="relative h-12 w-12 overflow-hidden rounded-full border"
            onClick={() => setAvatarUrl(url)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="avatar"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

