import { create } from 'zustand'

export interface HistoryAction {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
  timestamp: number
}

interface HistoryState {
  past: HistoryAction[]
  future: HistoryAction[]
  canUndo: boolean
  canRedo: boolean
  
  addAction: (action: HistoryAction) => void
  undo: () => HistoryAction | null
  redo: () => HistoryAction | null
  clear: () => void
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,
  
  addAction: (action) => set((state) => ({
    past: [...state.past, action].slice(-50), // 保留最近50个操作
    future: [], // 新操作清空重做历史
    canUndo: true,
    canRedo: false,
  })),
  
  undo: () => {
    const { past, future } = get()
    if (past.length === 0) return null
    
    const lastAction = past[past.length - 1]
    const newPast = past.slice(0, -1)
    
    set({
      past: newPast,
      future: [lastAction, ...future],
      canUndo: newPast.length > 0,
      canRedo: true,
    })
    
    return lastAction
  },
  
  redo: () => {
    const { past, future } = get()
    if (future.length === 0) return null
    
    const nextAction = future[0]
    const newFuture = future.slice(1)
    
    set({
      past: [...past, nextAction],
      future: newFuture,
      canUndo: true,
      canRedo: newFuture.length > 0,
    })
    
    return nextAction
  },
  
  clear: () => set({
    past: [],
    future: [],
    canUndo: false,
    canRedo: false,
  }),
}))