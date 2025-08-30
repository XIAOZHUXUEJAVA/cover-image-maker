"use client"

import { useCoverHistory } from '@/hooks/useCoverHistory'
import { Button } from '@/components/ui/button'
import { Undo2, Redo2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function HistoryToolbar() {
  const { undo, redo, canUndo, canRedo } = useCoverHistory()
  
  const handleUndo = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    undo()
  }
  
  const handleRedo = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    redo()
  }
  
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
              className="p-2 h-7"
            >
              <Undo2 className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>撤销 (Ctrl+Z)</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
              className="p-2 h-7"
            >
              <Redo2 className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>重做 (Ctrl+Y)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}