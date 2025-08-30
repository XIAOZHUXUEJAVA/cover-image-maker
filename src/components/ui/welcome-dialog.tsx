"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sparkles, ArrowRight } from "lucide-react"

export function WelcomeDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 检查是否是首次访问
    const hasVisited = localStorage.getItem('cover-maker-visited')
    if (!hasVisited) {
      setOpen(true)
      localStorage.setItem('cover-maker-visited', 'true')
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl">
            欢迎使用 Cover Maker
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed mt-4">
            一个<strong className="text-foreground">简单易用</strong>的封面制作工具
            <br />
            <br />
            无需复杂操作，只需几步即可制作出简易的文章封面：
            <br />
            输入标题 → 选择背景 → 调整样式 → 导出图片
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button 
            onClick={() => setOpen(false)}
            className="w-full gap-2"
          >
            开始制作
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setOpen(false)}
            className="w-full text-sm"
          >
            跳过介绍
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}