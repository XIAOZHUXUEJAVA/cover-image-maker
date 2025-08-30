import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CanvasSize {
  id: string
  name: string
  width: number
  height: number
  aspectRatio: string
  category: 'social' | 'document' | 'custom'
}

export const defaultSizes: CanvasSize[] = [
  // 社交媒体
  { id: 'wechat', name: '微信公众号', width: 900, height: 500, aspectRatio: '9 / 5', category: 'social' },
  { id: 'weibo', name: '微博封面', width: 560, height: 260, aspectRatio: '56 / 26', category: 'social' },
  { id: 'instagram', name: 'Instagram', width: 1080, height: 1080, aspectRatio: '1 / 1', category: 'social' },
  { id: 'youtube', name: 'YouTube缩略图', width: 1280, height: 720, aspectRatio: '16 / 9', category: 'social' },
  { id: 'facebook', name: 'Facebook封面', width: 820, height: 312, aspectRatio: '205 / 78', category: 'social' },
  
  // 文档
  { id: 'ppt', name: 'PPT封面', width: 1920, height: 1080, aspectRatio: '16 / 9', category: 'document' },
  { id: 'a4', name: 'A4横版', width: 1754, height: 1240, aspectRatio: '1754 / 1240', category: 'document' },
  { id: 'poster', name: '海报', width: 1080, height: 1920, aspectRatio: '9 / 16', category: 'document' },
]

interface CanvasState {
  currentSize: CanvasSize
  customSizes: CanvasSize[]
  
  setCurrentSize: (size: CanvasSize) => void
  addCustomSize: (size: Omit<CanvasSize, 'id' | 'category'>) => void
  removeCustomSize: (id: string) => void
  updateCustomSize: (id: string, size: Omit<CanvasSize, 'id' | 'category'>) => void
  getAllSizes: () => CanvasSize[]
}

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set, get) => ({
      currentSize: defaultSizes[0], // 默认微信公众号尺寸
      customSizes: [],
      
      setCurrentSize: (size) => set({ currentSize: size }),
      
      addCustomSize: (sizeData) => {
        const id = `custom_${Date.now()}`
        const newSize: CanvasSize = {
          ...sizeData,
          id,
          category: 'custom'
        }
        
        set((state) => ({
          customSizes: [...state.customSizes, newSize]
        }))
      },
      
      removeCustomSize: (id) => set((state) => ({
        customSizes: state.customSizes.filter(size => size.id !== id)
      })),
      
      updateCustomSize: (id, sizeData) => set((state) => ({
        customSizes: state.customSizes.map(size => 
          size.id === id 
            ? { ...sizeData, id, category: 'custom' as const }
            : size
        )
      })),
      
      getAllSizes: () => {
        const { customSizes } = get()
        return [...defaultSizes, ...customSizes]
      }
    }),
    {
      name: 'canvas-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
)