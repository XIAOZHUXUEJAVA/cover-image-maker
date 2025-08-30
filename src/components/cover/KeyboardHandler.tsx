"use client";
import { useEffect } from 'react';
import { useCoverHistory } from '@/hooks/useCoverHistory';

interface KeyboardHandlerProps {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

export function KeyboardHandler({ canvasRef }: KeyboardHandlerProps) {
  const { undo, redo, canUndo, canRedo } = useCoverHistory();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 只在画布获得焦点时处理键盘事件
      if (canvasRef?.current && document.activeElement === canvasRef.current) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          if (canUndo) {
            undo();
          }
        } else if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
                   ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z')) {
          e.preventDefault();
          if (canRedo) {
            redo();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo, canvasRef]);

  return null;
}