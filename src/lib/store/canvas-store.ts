import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CanvasSize {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
  category: "preset" | "custom";
}

export const defaultSizes: CanvasSize[] = [
  {
    id: "wechat",
    name: "",
    width: 900,
    height: 500,
    aspectRatio: "9 / 5",
    category: "preset",
  },
  {
    id: "weibo",
    name: "",
    width: 560,
    height: 260,
    aspectRatio: "56 / 26",
    category: "preset",
  },
  {
    id: "instagram",
    name: "",
    width: 1080,
    height: 1080,
    aspectRatio: "1 / 1",
    category: "preset",
  },
  {
    id: "youtube",
    name: "",
    width: 1280,
    height: 720,
    aspectRatio: "16 / 9",
    category: "preset",
  },
  {
    id: "facebook",
    name: "",
    width: 820,
    height: 312,
    aspectRatio: "205 / 78",
    category: "preset",
  },
  {
    id: "ppt",
    name: "",
    width: 1920,
    height: 1080,
    aspectRatio: "16 / 9",
    category: "preset",
  },
  {
    id: "a4",
    name: "",
    width: 1754,
    height: 1240,
    aspectRatio: "1754 / 1240",
    category: "preset",
  },
  {
    id: "poster",
    name: "",
    width: 1080,
    height: 1920,
    aspectRatio: "9 / 16",
    category: "preset",
  },
];

interface CanvasState {
  currentSize: CanvasSize;
  customSizes: CanvasSize[];

  setCurrentSize: (size: CanvasSize) => void;
  addCustomSize: (size: Omit<CanvasSize, "id" | "category">) => void;
  removeCustomSize: (id: string) => void;
  updateCustomSize: (
    id: string,
    size: Omit<CanvasSize, "id" | "category">
  ) => void;
  getAllSizes: () => CanvasSize[];
}

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set, get) => ({
      currentSize: defaultSizes[0], // 默认微信公众号尺寸
      customSizes: [],

      setCurrentSize: (size) => set({ currentSize: size }),

      addCustomSize: (sizeData) => {
        console.log("addCustomSize called with:", sizeData);
        const id = `custom_${Date.now()}`;
        const newSize: CanvasSize = {
          ...sizeData,
          id,
          category: "custom",
        };

        console.log("Creating new size:", newSize);

        set((state) => {
          const newState = {
            customSizes: [...state.customSizes, newSize],
          };
          console.log("New customSizes:", newState.customSizes);
          return newState;
        });
      },

      removeCustomSize: (id) =>
        set((state) => {
          const newCustomSizes = state.customSizes.filter(
            (size) => size.id !== id
          );

          // 如果删除的是当前选中的尺寸，切换到默认尺寸
          const newCurrentSize =
            state.currentSize.id === id ? defaultSizes[0] : state.currentSize;

          return {
            customSizes: newCustomSizes,
            currentSize: newCurrentSize,
          };
        }),

      updateCustomSize: (id, sizeData) =>
        set((state) => ({
          customSizes: state.customSizes.map((size) =>
            size.id === id
              ? { ...sizeData, id, category: "custom" as const }
              : size
          ),
        })),

      getAllSizes: () => {
        const { customSizes } = get();
        return [...defaultSizes, ...customSizes];
      },
    }),
    {
      name: "canvas-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
