"use client"

import { useState } from 'react'
import { useCanvasStore, type CanvasSize } from '@/lib/store/canvas-store'
import { useCoverStore } from '@/lib/store/cover-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Monitor, FileText, Smartphone } from 'lucide-react'

export function CanvasSizeSelector() {
  const { currentSize, setCurrentSize, addCustomSize, removeCustomSize, getAllSizes } = useCanvasStore()
  const { setAspectRatio } = useCoverStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')
  
  const allSizes = getAllSizes()
  const socialSizes = allSizes.filter(s => s.category === 'social')
  const documentSizes = allSizes.filter(s => s.category === 'document')
  const customSizes = allSizes.filter(s => s.category === 'custom')
  
  const handleSizeChange = (size: CanvasSize) => {
    setCurrentSize(size)
    setAspectRatio(size.aspectRatio)
  }
  
  const handleAddCustomSize = () => {
    if (!customName || !customWidth || !customHeight) return
    
    const width = parseInt(customWidth)
    const height = parseInt(customHeight)
    
    if (width <= 0 || height <= 0) return
    
    const aspectRatio = `${width} / ${height}`
    
    addCustomSize({
      name: customName,
      width,
      height,
      aspectRatio
    })
    
    // 清空表单
    setCustomName('')
    setCustomWidth('')
    setCustomHeight('')
    setIsDialogOpen(false)
  }
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return <Smartphone className="w-4 h-4" />
      case 'document': return <FileText className="w-4 h-4" />
      default: return <Monitor className="w-4 h-4" />
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">画布尺寸</Label>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              自定义
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加自定义尺寸</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">名称</Label>
                <Input
                  id="name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="例如：自定义海报"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">宽度 (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    placeholder="1920"
                  />
                </div>
                <div>
                  <Label htmlFor="height">高度 (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    placeholder="1080"
                  />
                </div>
              </div>
              <Button onClick={handleAddCustomSize} className="w-full">
                添加尺寸
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="text-xs text-muted-foreground">
        当前: {currentSize.name} ({currentSize.width} × {currentSize.height})
      </div>
      
      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="social">社交媒体</TabsTrigger>
          <TabsTrigger value="document">文档</TabsTrigger>
          <TabsTrigger value="custom">自定义</TabsTrigger>
        </TabsList>
        
        <TabsContent value="social" className="space-y-2">
          {socialSizes.map((size) => (
            <Button
              key={size.id}
              variant={currentSize.id === size.id ? "default" : "outline"}
              className="w-full justify-start h-auto p-3"
              onClick={() => handleSizeChange(size)}
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(size.category)}
                <div className="text-left">
                  <div className="font-medium">{size.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {size.width} × {size.height}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </TabsContent>
        
        <TabsContent value="document" className="space-y-2">
          {documentSizes.map((size) => (
            <Button
              key={size.id}
              variant={currentSize.id === size.id ? "default" : "outline"}
              className="w-full justify-start h-auto p-3"
              onClick={() => handleSizeChange(size)}
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(size.category)}
                <div className="text-left">
                  <div className="font-medium">{size.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {size.width} × {size.height}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-2">
          {customSizes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Monitor className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">暂无自定义尺寸</p>
              <p className="text-xs">点击上方"自定义"按钮添加</p>
            </div>
          ) : (
            customSizes.map((size) => (
              <div key={size.id} className="flex items-center gap-2">
                <Button
                  variant={currentSize.id === size.id ? "default" : "outline"}
                  className="flex-1 justify-start h-auto p-3"
                  onClick={() => handleSizeChange(size)}
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(size.category)}
                    <div className="text-left">
                      <div className="font-medium">{size.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {size.width} × {size.height}
                      </div>
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCustomSize(size.id)}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}