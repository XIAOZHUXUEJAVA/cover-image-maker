import { useCallback, useRef, useEffect, useState } from 'react'
import { useCoverStore } from '@/lib/store/cover-store'

interface HistoryState {
  title: string
  subtitle: string
  imageUrl: string | null
  textAlign: 'left' | 'center' | 'right'
  verticalAlign: 'top' | 'center' | 'bottom'
  padding: number
  titleSize: number
  subtitleSize: number
  titleColor: string
  subtitleColor: string
  overlayColor: string
  overlayOpacity: number
  fontFamily: string
  aspectRatio: string
  imageScale: number
  imagePosX: number
  imagePosY: number
  textMaxWidth: number
  autoContrast: boolean
  showGuides: boolean
  avatarUrl: string | null
  showAvatar: boolean
  avatarSize: number
  avatarOffsetX: number
  avatarOffsetY: number
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
    imageUrl: store.imageUrl,
    textAlign: store.textAlign,
    verticalAlign: store.verticalAlign,
    padding: store.padding,
    titleSize: store.titleSize,
    subtitleSize: store.subtitleSize,
    titleColor: store.titleColor,
    subtitleColor: store.subtitleColor,
    overlayColor: store.overlayColor,
    overlayOpacity: store.overlayOpacity,
    fontFamily: store.fontFamily,
    aspectRatio: store.aspectRatio,
    imageScale: store.imageScale,
    imagePosX: store.imagePosX,
    imagePosY: store.imagePosY,
    textMaxWidth: store.textMaxWidth,
    autoContrast: store.autoContrast,
    showGuides: store.showGuides,
    avatarUrl: store.avatarUrl,
    showAvatar: store.showAvatar,
    avatarSize: store.avatarSize,
    avatarOffsetX: store.avatarOffsetX,
    avatarOffsetY: store.avatarOffsetY,
  }), [store])
  
  // 应用状态
  const applyState = useCallback((state: HistoryState) => {
    store.setTitle(state.title)
    store.setSubtitle(state.subtitle)
    store.setImageUrl(state.imageUrl)
    store.setTextAlign(state.textAlign)
    store.setVerticalAlign(state.verticalAlign)
    store.setPadding(state.padding)
    store.setTitleSize(state.titleSize)
    store.setSubtitleSize(state.subtitleSize)
    store.setTitleColor(state.titleColor)
    store.setSubtitleColor(state.subtitleColor)
    store.setOverlayColor(state.overlayColor)
    store.setOverlayOpacity(state.overlayOpacity)
    store.setFontFamily(state.fontFamily)
    store.setAspectRatio(state.aspectRatio)
    store.setImageScale(state.imageScale)
    store.setImagePosX(state.imagePosX)
    store.setImagePosY(state.imagePosY)
    store.setTextMaxWidth(state.textMaxWidth)
    store.setAutoContrast(state.autoContrast)
    store.setShowGuides(state.showGuides)
    store.setAvatarUrl(state.avatarUrl)
    store.setShowAvatar(state.showAvatar)
    store.setAvatarSize(state.avatarSize)
    store.setAvatarOffsetX(state.avatarOffsetX)
    store.setAvatarOffsetY(state.avatarOffsetY)
  }, [store])
  
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
  }, [store.title, store.subtitle, store.imageUrl, store.textAlign, store.verticalAlign,
      store.padding, store.titleSize, store.subtitleSize, store.titleColor, store.subtitleColor,
      store.overlayColor, store.overlayOpacity, store.aspectRatio,
      store.imageScale, store.imagePosX, store.imagePosY, store.textMaxWidth,
      store.autoContrast, store.showGuides, store.avatarUrl, store.showAvatar,
      store.avatarSize, store.avatarOffsetX, store.avatarOffsetY, store.fontFamily,
      getCurrentState, history, currentIndex])
  
  // 撤销
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoRef.current = true
      const newIndex = currentIndex - 1
      const prevState = history[newIndex]
      
      applyState(prevState)
      setCurrentIndex(newIndex)
    }
  }, [applyState, currentIndex, history])
  
  // 重做
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoRef.current = true
      const newIndex = currentIndex + 1
      const nextState = history[newIndex]
      
      applyState(nextState)
      setCurrentIndex(newIndex)
    }
  }, [applyState, currentIndex, history])
  
  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1
  
  return {
    undo,
    redo,
    canUndo,
    canRedo
  }
}