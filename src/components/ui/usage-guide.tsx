"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  HelpCircle,
  Keyboard,
  Settings,
  Layout,
  Palette,
  Image,
  Monitor,
} from "lucide-react";

export function UsageGuide() {
  const [open, setOpen] = useState(false);

  const shortcuts = [
    {
      category: "快捷键",
      icon: <Keyboard className="w-4 h-4" />,
      items: [
        { keys: ["Ctrl", "Z"], description: "撤销操作" },
        { keys: ["Ctrl", "Y"], description: "重做操作" },
      ],
    },
  ];

  const controlsGuide = [
    {
      category: "画布设置",
      icon: <Monitor className="w-4 h-4" />,
      items: [
        {
          name: "画布尺寸",
          description: "设置封面的宽度和高度，支持常见尺寸预设",
        },
        { name: "画布比例", description: "选择16:9、1:1、4:3、3:4等常用比例" },
      ],
    },
    {
      category: "内容设置",
      icon: <Settings className="w-4 h-4" />,
      items: [
        { name: "标题", description: "设置封面的主标题文字，最多50个字符" },
        {
          name: "副标题",
          description: "设置封面的副标题或描述文字，最多100个字符",
        },
        { name: "标题字号", description: "调整主标题的字体大小，范围24-120px" },
        {
          name: "副标题字号",
          description: "调整副标题的字体大小，范围12-64px",
        },
        {
          name: "标题颜色",
          description: "设置主标题的文字颜色，支持颜色选择器和预设颜色",
        },
        {
          name: "副标题颜色",
          description: "设置副标题的文字颜色，支持颜色选择器和预设颜色",
        },
        {
          name: "字体",
          description: "选择字体样式：Geist Sans、Geist Mono或System UI",
        },
      ],
    },
    {
      category: "样式设置",
      icon: <Palette className="w-4 h-4" />,
      items: [
        { name: "遮罩颜色", description: "设置背景图片上的遮罩颜色" },
        { name: "遮罩不透明度", description: "调整遮罩的透明度，范围0-90%" },
        {
          name: "风格预设",
          description: "快速应用预设风格：简约、清新、商务、科技、温暖、优雅",
        },
        {
          name: "自动对比色",
          description: "根据背景自动调整文字颜色以确保可读性",
        },
        { name: "显示安全边距", description: "显示内容安全区域参考线" },
      ],
    },
    {
      category: "布局设置",
      icon: <Layout className="w-4 h-4" />,
      items: [
        {
          name: "对齐方式",
          description: "设置文字的水平对齐：左对齐、居中、右对齐",
        },
        {
          name: "垂直位置",
          description: "设置文字的垂直位置：顶部、居中、底部",
        },
        {
          name: "内边距",
          description: "调整文字与画布边缘的距离，范围8-160px",
        },
        {
          name: "文本最大宽度",
          description: "限制文字的最大宽度占比，范围30-100%",
        },
      ],
    },
    {
      category: "背景设置",
      icon: <Image className="w-4 h-4" />,
      items: [
        {
          name: "背景缩放",
          description: "调整背景图片的缩放比例，范围50-300%",
        },
        {
          name: "水平偏移",
          description: "调整背景图片的水平位置，范围-200%到200%",
        },
        {
          name: "垂直偏移",
          description: "调整背景图片的垂直位置，范围-200%到200%",
        },
        { name: "示例图库", description: "选择预设的高质量背景图片" },
        { name: "显示头像", description: "开启/关闭头像显示功能" },
        { name: "头像大小", description: "调整头像的尺寸，范围32-144px" },
        { name: "头像位移", description: "调整头像的水平和垂直位置" },
      ],
    },
  ];

  const quickActions = [
    { name: "选择风格", description: "在快速操作栏选择预设风格快速应用样式" },
    { name: "重置", description: "点击重置按钮清空所有设置回到初始状态" },
    {
      name: "撤销/重做",
      description: "使用历史工具栏或快捷键进行操作撤销和重做",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          使用说明
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            封面制作器使用说明
          </DialogTitle>
          <DialogDescription>
            详细的功能介绍和操作说明，帮助您快速上手
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 快捷键说明 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              快捷键
            </h3>
            <div className="grid gap-4">
              {shortcuts.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex gap-1">
                          {item.keys.map((key, keyIndex) => (
                            <Badge
                              key={keyIndex}
                              variant="secondary"
                              className="text-xs px-2 py-0.5"
                            >
                              {key}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-muted-foreground ml-2">
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 右侧控制面板详细说明 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              右侧控制面板功能详解
            </h3>
            <div className="space-y-6">
              {controlsGuide.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2 text-sm border-l-2 border-primary pl-2">
                    {category.icon}
                    {category.category}
                  </h4>
                  <div className="grid gap-3 md:grid-cols-1">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-3 border rounded-lg space-y-1"
                      >
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 快速操作说明 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速操作</h3>
            <div className="grid gap-3">
              {quickActions.map((action, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-1">
                  <div className="font-medium text-sm">{action.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 使用流程 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">推荐使用流程</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <strong>设置画布：</strong>
                  在&ldquo;画布&rdquo;标签页选择合适的尺寸和比例
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <strong>添加内容：</strong>
                  在&ldquo;内容&rdquo;标签页输入标题和副标题，调整字体大小和颜色
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <strong>选择背景：</strong>
                  在&ldquo;背景&rdquo;标签页上传图片或选择示例图片，调整位置和缩放
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <strong>调整样式：</strong>
                  在&ldquo;样式&rdquo;标签页设置遮罩效果，或直接选择风格预设
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <strong>优化布局：</strong>
                  在&ldquo;布局&rdquo;标签页调整文字对齐和位置
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <strong>导出封面：</strong>完成后点击下方的&ldquo;下载
                  PNG&rdquo;或&ldquo;下载 JPG&rdquo;按钮
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)}>知道了</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
