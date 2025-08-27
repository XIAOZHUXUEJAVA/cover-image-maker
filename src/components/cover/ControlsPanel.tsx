"use client";
import { useCoverStore } from "@/lib/store/cover-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Select is already imported above with its subcomponents
import { Separator } from "@/components/ui/separator";
import { AvatarPicker } from "@/components/cover/AvatarPicker";

const fonts = [
  { label: "Geist Sans", value: "var(--font-geist-sans)" },
  { label: "Geist Mono", value: "var(--font-geist-mono)" },
  {
    label: "System UI",
    value: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
  },
];

export function ControlsPanel() {
  const state = useCoverStore();

  return (
    <Tabs defaultValue="text" className="space-y-6">
      <TabsList>
        <TabsTrigger value="text">文字</TabsTrigger>
        <TabsTrigger value="layout">布局</TabsTrigger>
        <TabsTrigger value="style">风格</TabsTrigger>
        <TabsTrigger value="canvas">画布</TabsTrigger>
        <TabsTrigger value="bg">背景</TabsTrigger>
      </TabsList>

      <TabsContent value="text" className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="title">标题</Label>
          <Input
            id="title"
            value={state.title}
            onChange={(e) => state.setTitle(e.target.value)}
            placeholder="输入文章标题"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="subtitle">副标题</Label>
          <Input
            id="subtitle"
            value={state.subtitle}
            onChange={(e) => state.setSubtitle(e.target.value)}
            placeholder="可选：副标题"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="flex items-center justify-between">
              <Label>标题字号</Label>
              <span className="text-xs text-muted-foreground">
                {state.titleSize}px
              </span>
            </div>
            <Slider
              value={[state.titleSize]}
              min={24}
              max={120}
              step={1}
              onValueChange={([v]) => state.setTitleSize(v)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label>副标题字号</Label>
              <span className="text-xs text-muted-foreground">
                {state.subtitleSize}px
              </span>
            </div>
            <Slider
              value={[state.subtitleSize]}
              min={12}
              max={64}
              step={1}
              onValueChange={([v]) => state.setSubtitleSize(v)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label>标题颜色</Label>
            <Input
              type="color"
              value={state.titleColor}
              onChange={(e) => state.setTitleColor(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label>副标题颜色</Label>
            <Input
              type="color"
              value={state.subtitleColor}
              onChange={(e) => state.setSubtitleColor(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label>字体</Label>
          <Select
            value={state.fontFamily}
            onValueChange={(v) => state.setFontFamily(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择字体" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </TabsContent>

      <TabsContent value="layout" className="space-y-6">
        <div className="space-y-3">
          <Label>对齐</Label>
          <Select
            value={state.textAlign}
            onValueChange={(v) =>
              state.setTextAlign(v as "left" | "center" | "right")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">左对齐</SelectItem>
              <SelectItem value="center">居中</SelectItem>
              <SelectItem value="right">右对齐</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label>垂直位置</Label>
          <Select
            value={state.verticalAlign}
            onValueChange={(v) =>
              state.setVerticalAlign(v as "top" | "center" | "bottom")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">顶部</SelectItem>
              <SelectItem value="center">居中</SelectItem>
              <SelectItem value="bottom">底部</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>内边距</Label>
            <span className="text-xs text-muted-foreground">
              {state.padding}px
            </span>
          </div>
          <Slider
            value={[state.padding]}
            min={8}
            max={160}
            step={2}
            onValueChange={([v]) => state.setPadding(v)}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>文本最大宽度</Label>
            <span className="text-xs text-muted-foreground">
              {state.textMaxWidth}%
            </span>
          </div>
          <Slider
            value={[state.textMaxWidth]}
            min={30}
            max={100}
            step={1}
            onValueChange={([v]) => state.setTextMaxWidth(v)}
          />
        </div>
      </TabsContent>

      <TabsContent value="style" className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label>遮罩颜色</Label>
            <Input
              type="color"
              value={state.overlayColor}
              onChange={(e) => state.setOverlayColor(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label>遮罩不透明度</Label>
            <Slider
              value={[Math.round(state.overlayOpacity * 100)]}
              min={0}
              max={90}
              step={1}
              onValueChange={([v]) => state.setOverlayOpacity(v / 100)}
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label>快速风格</Label>
          <div className="grid grid-cols-3 gap-3">
            {quickPresets.map((p) => (
              <button
                key={p.name}
                className="h-10 rounded-lg border text-sm"
                onClick={() => state.applyPreset(p)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={state.autoContrast}
              onChange={(e) => state.setAutoContrast(e.target.checked)}
            />
            自动对比色
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={state.showGuides}
              onChange={(e) => state.setShowGuides(e.target.checked)}
            />
            显示安全边距
          </label>
        </div>
      </TabsContent>

      <TabsContent value="canvas" className="space-y-6">
        <div className="space-y-2">
          <Label>画布比例</Label>
          <Select
            value={state.aspectRatio}
            onValueChange={(v) => state.setAspectRatio(v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16 / 9">16:9</SelectItem>
              <SelectItem value="1 / 1">1:1</SelectItem>
              <SelectItem value="4 / 3">4:3</SelectItem>
              <SelectItem value="3 / 4">3:4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>

      <TabsContent value="bg" className="space-y-6">
        <div className="grid grid-cols-3 gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>缩放</Label>
              <span className="text-xs text-muted-foreground">
                {state.imageScale}%
              </span>
            </div>
            <Slider
              value={[state.imageScale]}
              min={50}
              max={300}
              step={1}
              onValueChange={([v]) => state.setImageScale(v)}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>水平偏移</Label>
              <span className="text-xs text-muted-foreground">
                {state.imagePosX}%
              </span>
            </div>
            <Slider
              value={[state.imagePosX]}
              min={-200}
              max={200}
              step={1}
              onValueChange={([v]) => state.setImagePosX(v)}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>垂直偏移</Label>
              <span className="text-xs text-muted-foreground">
                {state.imagePosY}%
              </span>
            </div>
            <Slider
              value={[state.imagePosY]}
              min={-200}
              max={200}
              step={1}
              onValueChange={([v]) => state.setImagePosY(v)}
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label>示例图库</Label>
          <div className="grid grid-cols-4 gap-3">
            {sampleImages.map((url) => (
              <button
                key={url}
                className="relative h-16 w-full overflow-hidden rounded-lg border"
                onClick={() => state.setImageUrl(url)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="sample"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>显示头像</Label>
            <input
              type="checkbox"
              checked={state.showAvatar}
              onChange={(e) => state.setShowAvatar(e.target.checked)}
            />
          </div>
          {state.showAvatar ? (
            <>
              <div className="space-y-3">
                <Label>头像大小</Label>
                <Slider
                  value={[state.avatarSize]}
                  min={32}
                  max={144}
                  step={2}
                  onValueChange={([v]) => state.setAvatarSize(v)}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <Label>头像水平位移 (px)</Label>
                  <Slider
                    value={[state.avatarOffsetX]}
                    min={-200}
                    max={200}
                    step={1}
                    onValueChange={([v]) => state.setAvatarOffsetX(v)}
                  />
                </div>
                <div className="space-y-3">
                  <Label>头像垂直位移 (px)</Label>
                  <Slider
                    value={[state.avatarOffsetY]}
                    min={-200}
                    max={200}
                    step={1}
                    onValueChange={([v]) => state.setAvatarOffsetY(v)}
                  />
                </div>
              </div>
              <AvatarPicker />
            </>
          ) : null}
        </div>
      </TabsContent>
    </Tabs>
  );
}

import type { Preset } from "@/lib/store/cover-store";

const quickPresets = [
  {
    name: "Notion Minimal",
    overlayColor: "#FFFFFF",
    overlayOpacity: 0.12,
    titleColor: "#111111",
    subtitleColor: "#4B5563",
    textAlign: "center" as const,
    padding: 56,
    titleSize: 56,
    subtitleSize: 22,
    textMaxWidth: 62,
  },
  {
    name: "Dribbble Pastel",
    overlayColor: "#F3E8FF",
    overlayOpacity: 0.24,
    titleColor: "#1F2937",
    subtitleColor: "#6B7280",
    textAlign: "center" as const,
    padding: 56,
    titleSize: 54,
    subtitleSize: 22,
    textMaxWidth: 62,
  },
  {
    name: "Behance Editorial",
    overlayColor: "#000000",
    overlayOpacity: 0.35,
    titleColor: "#FFFFFF",
    subtitleColor: "#E5E7EB",
    textAlign: "left" as const,
    padding: 64,
    titleSize: 64,
    subtitleSize: 24,
    textMaxWidth: 58,
  },
] satisfies Preset[];

const sampleImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1200&auto=format&fit=crop",
];
