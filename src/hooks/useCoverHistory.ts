import { useCallback, useRef, useEffect, useState } from 'react'
import { useCoverStore } from '@/lib/store/cover-store'

interface HistoryState {
  title: string
  subtitle: string
  titleColor: string
  subtitleColor: string
  titleSize: number
  subtitleSize: number
  textAlign: string
  overlayColor: string
  overlayOpacity: number
  aspectRatio: string
}

export function useCoverHistory() {
  const store = useCoverStore()
  const [history, setHistory] = useState<HistoryState[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const isUndoRedoRef = useRef(false)
  
  // 获取当前状态
  const getCurrentState = useCallback((): HistoryState => ({
    title: store.title,
    subtitle: store.subtitle,
    titleColor: store.titleColor,
    subtitleColor: store.subtitleColor,
    titleSize: store.titleSize,
    subtitleSize: store.subtitleSize,
    textAlign: store.textAlign,
    overlayColor: store.overlayColor,
    overlayOpacity: store.overlayOpacity,
    aspectRatio: store.aspectRatio,
  }), [store])
  
  // 初始化历史记录
  useEffect(() => {
    if (history.length === 0) {
      const initialState = getCurrentState()
      setHistory([initialState])
      setCurrentIndex(0)
    }
  }, [getCurrentState, history.length])
  
  // 监听状态变化，自动保存历史记录
  useEffect(() => {
    if (isUndoRedoRef.current || history.length === 0) {
      isUndoRedoRef.current = false
      return
    }
    
    const currentState = getCurrentState()
    
    // 检查是否有实际变化
    const lastState = history[currentIndex]
    if (lastState && JSON.stringify(currentState) === JSON.stringify(lastState)) {
      return
    }
    
    // 移除当前位置之后的历史记录
    const newHistory = history.slice(0, currentIndex + 1)
    
    // 添加新状态
    newHistory.push(currentState)
    
    // 限制历史记录数量
    if (newHistory.length > 50) {
      const trimmedHistory = newHistory.slice(-50)
      setHistory(trimmedHistory)
      setCurrentIndex(trimmedHistory.length - 1)
    } else {
      setHistory(newHistory)
      setCurrentIndex(newHistory.length - 1)
    }
  }, [store.title, store.subtitle, store.titleColor, store.subtitleColor, 
      store.titleSize, store.subtitleSize, store.textAlign, 
      store.overlayColor, store.overlayOpacity, store.aspectRatio, 
      getCurrentState, history, currentIndex])
  
  // 撤销
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoRef.current = true
      const newIndex = currentIndex - 1
      const prevState = history[newIndex]
      
      // 恢复状态
      store.setTitle(prevState.title)
      store.setSubtitle(prevState.subtitle)
      store.setTitleColor(prevState.titleColor)
      store.setSubtitleColor(prevState.subtitleColor)
      store.setTitleSize(prevState.titleSize)
      store.setSubtitleSize(prevState.subtitleSize)
      store.setTextAlign(prevState.textAlign as any)
      store.setOverlayColor(prevState.overlayColor)
      store.setOverlayOpacity(prevState.overlayOpacity)
      store.setAspectRatio(prevState.aspectRatio)
      
      setCurrentIndex(newIndex)
    }
  }, [store, currentIndex, history])
  
  // 重做
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoRef.current = true
      const newIndex = currentIndex + 1
      const nextState = history[newIndex]
      
      // 恢复状态
      store.setTitle(nextState.title)
      store.setSubtitle(nextState.subtitle)
      store.setTitleColor(nextState.titleColor)
      store.setSubtitleColor(nextState.subtitleColor)
      store.setTitleSize(nextState.titleSize)
      store.setSubtitleSize(nextState.subtitleSize)
      store.setTextAlign(nextState.textAlign as any)
      store.setOverlayColor(nextState.overlayColor)
      store.setOverlayOpacity(nextState.overlayOpacity)
      store.setAspectRatio(nextState.aspectRatio)
      
      setCurrentIndex(newIndex)
    }
  }, [store, currentIndex, history])
  
  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1
  
  return {
    undo,
    redo,
    canUndo,
    canRedo
  }
}