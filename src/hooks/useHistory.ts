import { useEffect, useCallback } from 'react'
import { useHistoryStore } from '@/lib/store/history-store'
import { useCoverStore } from '@/lib/store/cover-store'

export function useHistory() {
  const { addAction, undo, redo, canUndo, canRedo } = useHistoryStore()
  const coverStore = useCoverStore()
  
  // 撤销操作
  const handleUndo = useCallback(() => {
    const lastAction = undo()
    if (lastAction) {
      // 根据操作类型恢复状态
      const { type, payload } = lastAction
      switch (type) {
        case 'SET_TITLE':
          coverStore.setTitle(payload.oldValue)
          break
        case 'SET_SUBTITLE':
          coverStore.setSubtitle(payload.oldValue)
          break
        case 'SET_TITLE_COLOR':
          coverStore.setTitleColor(payload.oldValue)
          break
        case 'SET_SUBTITLE_COLOR':
          coverStore.setSubtitleColor(payload.oldValue)
          break
        case 'SET_TITLE_SIZE':
          coverStore.setTitleSize(payload.oldValue)
          break
        case 'SET_SUBTITLE_SIZE':
          coverStore.setSubtitleSize(payload.oldValue)
          break
        case 'SET_TEXT_ALIGN':
          coverStore.setTextAlign(payload.oldValue)
          break
        case 'SET_OVERLAY_COLOR':
          coverStore.setOverlayColor(payload.oldValue)
          break
        case 'SET_OVERLAY_OPACITY':
          coverStore.setOverlayOpacity(payload.oldValue)
          break
        case 'SET_IMAGE_URL':
          coverStore.setImageUrl(payload.oldValue)
          break
        case 'SET_ASPECT_RATIO':
          coverStore.setAspectRatio(payload.oldValue)
          break
      }
    }
  }, [undo, coverStore])
  
  // 重做操作
  const handleRedo = useCallback(() => {
    const nextAction = redo()
    if (nextAction) {
      // 根据操作类型重新应用状态
      const { type, payload } = nextAction
      switch (type) {
        case 'SET_TITLE':
          coverStore.setTitle(payload.newValue)
          break
        case 'SET_SUBTITLE':
          coverStore.setSubtitle(payload.newValue)
          break
        case 'SET_TITLE_COLOR':
          coverStore.setTitleColor(payload.newValue)
          break
        case 'SET_SUBTITLE_COLOR':
          coverStore.setSubtitleColor(payload.newValue)
          break
        case 'SET_TITLE_SIZE':
          coverStore.setTitleSize(payload.newValue)
          break
        case 'SET_SUBTITLE_SIZE':
          coverStore.setSubtitleSize(payload.newValue)
          break
        case 'SET_TEXT_ALIGN':
          coverStore.setTextAlign(payload.newValue)
          break
        case 'SET_OVERLAY_COLOR':
          coverStore.setOverlayColor(payload.newValue)
          break
        case 'SET_OVERLAY_OPACITY':
          coverStore.setOverlayOpacity(payload.newValue)
          break
        case 'SET_IMAGE_URL':
          coverStore.setImageUrl(payload.newValue)
          break
        case 'SET_ASPECT_RATIO':
          coverStore.setAspectRatio(payload.newValue)
          break
      }
    }
  }, [redo, coverStore])
  
  return {
    recordAction: addAction,
    undo: handleUndo,
    redo: handleRedo,
    canUndo,
    canRedo
  }
}