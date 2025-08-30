import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TextAlign = "left" | "center" | "right";

export type Preset = {
  name: string;
  overlayColor?: string;
  overlayOpacity?: number;
  titleColor?: string;
  subtitleColor?: string;
  textAlign?: TextAlign;
  padding?: number;
  titleSize?: number;
  subtitleSize?: number;
  textMaxWidth?: number;
  fontFamily?: string;
};

type CoverState = {
  title: string;
  subtitle: string;
  imageUrl: string | null;
  textAlign: TextAlign;
  verticalAlign: "top" | "center" | "bottom";
  padding: number;
  titleSize: number;
  subtitleSize: number;
  titleColor: string;
  subtitleColor: string;
  overlayColor: string;
  overlayOpacity: number; // 0-1
  fontFamily: string;
  aspectRatio: string; // CSS aspect-ratio value, e.g. "16 / 9"
  imageScale: number; // 100-200
  imagePosX: number; // -100..100 (% offset from center)
  imagePosY: number; // -100..100
  textMaxWidth: number; // 40..100 (%)
  autoContrast: boolean;
  showGuides: boolean;
  avatarUrl: string | null;
  showAvatar: boolean;
  avatarSize: number;
  avatarOffsetX: number; // px
  avatarOffsetY: number; // px

  setTitle: (v: string) => void;
  setSubtitle: (v: string) => void;
  setImageUrl: (v: string | null) => void;
  setTextAlign: (v: TextAlign) => void;
  setVerticalAlign: (v: "top" | "center" | "bottom") => void;
  setPadding: (v: number) => void;
  setTitleSize: (v: number) => void;
  setSubtitleSize: (v: number) => void;
  setTitleColor: (v: string) => void;
  setSubtitleColor: (v: string) => void;
  setOverlayColor: (v: string) => void;
  setOverlayOpacity: (v: number) => void;
  setFontFamily: (v: string) => void;
  setAspectRatio: (v: string) => void;
  setImageScale: (v: number) => void;
  setImagePosX: (v: number) => void;
  setImagePosY: (v: number) => void;
  setTextMaxWidth: (v: number) => void;
  setAutoContrast: (v: boolean) => void;
  setShowGuides: (v: boolean) => void;
  setAvatarUrl: (v: string | null) => void;
  setShowAvatar: (v: boolean) => void;
  setAvatarSize: (v: number) => void;
  setAvatarOffsetX: (v: number) => void;
  setAvatarOffsetY: (v: number) => void;
  applyPreset: (p: Preset) => void;
  reset: () => void;
};

const initialState = {
  title: "",
  subtitle: "",
  imageUrl: null as string | null,
  textAlign: "center" as TextAlign,
  verticalAlign: "center" as const,
  padding: 48,
  titleSize: 56,
  subtitleSize: 24,
  titleColor: "#ffffff",
  subtitleColor: "#e5e5e5",
  overlayColor: "#000000",
  overlayOpacity: 0.35,
  fontFamily: "var(--font-geist-sans)",
  aspectRatio: "16 / 9",
  imageScale: 100,
  imagePosX: 0,
  imagePosY: 0,
  textMaxWidth: 62,
  autoContrast: false,
  showGuides: false,
  avatarUrl: null as string | null,
  showAvatar: false,
  avatarSize: 72,
  avatarOffsetX: 0,
  avatarOffsetY: 0,
};

export const useCoverStore = create<CoverState>()(
  persist(
    (set) => ({
      ...initialState,

      setTitle: (v) => set({ title: v }),
      setSubtitle: (v) => set({ subtitle: v }),
      setImageUrl: (v) => set({ imageUrl: v }),
      setTextAlign: (v) => set({ textAlign: v }),
      setVerticalAlign: (v) => set({ verticalAlign: v }),
      setPadding: (v) => set({ padding: v }),
      setTitleSize: (v) => set({ titleSize: v }),
      setSubtitleSize: (v) => set({ subtitleSize: v }),
      setTitleColor: (v) => set({ titleColor: v }),
      setSubtitleColor: (v) => set({ subtitleColor: v }),
      setOverlayColor: (v) => set({ overlayColor: v }),
      setOverlayOpacity: (v) => set({ overlayOpacity: v }),
      setFontFamily: (v) => set({ fontFamily: v }),
      setAspectRatio: (v) => set({ aspectRatio: v }),
      setImageScale: (v) => set({ imageScale: v }),
      setImagePosX: (v) => set({ imagePosX: v }),
      setImagePosY: (v) => set({ imagePosY: v }),
      setTextMaxWidth: (v) => set({ textMaxWidth: v }),
      setAutoContrast: (v) => set({ autoContrast: v }),
      setShowGuides: (v) => set({ showGuides: v }),
      setAvatarUrl: (v) => set({ avatarUrl: v }),
      setShowAvatar: (v) => set({ showAvatar: v }),
      setAvatarSize: (v) => set({ avatarSize: v }),
      setAvatarOffsetX: (v) => set({ avatarOffsetX: v }),
      setAvatarOffsetY: (v) => set({ avatarOffsetY: v }),
      applyPreset: (p) =>
        set((s) => ({
          overlayColor: p.overlayColor ?? s.overlayColor,
          overlayOpacity: p.overlayOpacity ?? s.overlayOpacity,
          titleColor: p.titleColor ?? s.titleColor,
          subtitleColor: p.subtitleColor ?? s.subtitleColor,
          textAlign: p.textAlign ?? s.textAlign,
          padding: p.padding ?? s.padding,
          titleSize: p.titleSize ?? s.titleSize,
          subtitleSize: p.subtitleSize ?? s.subtitleSize,
          textMaxWidth: p.textMaxWidth ?? s.textMaxWidth,
          fontFamily: p.fontFamily ?? s.fontFamily,
        })),
      reset: () => set(() => ({ ...initialState })),
    }),
    {
      name: "cover-settings-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        // persist main design controls
        title: s.title,
        subtitle: s.subtitle,
        textAlign: s.textAlign,
        verticalAlign: s.verticalAlign,
        padding: s.padding,
        titleSize: s.titleSize,
        subtitleSize: s.subtitleSize,
        titleColor: s.titleColor,
        subtitleColor: s.subtitleColor,
        overlayColor: s.overlayColor,
        overlayOpacity: s.overlayOpacity,
        fontFamily: s.fontFamily,
        aspectRatio: s.aspectRatio,
        imageScale: s.imageScale,
        imagePosX: s.imagePosX,
        imagePosY: s.imagePosY,
        textMaxWidth: s.textMaxWidth,
        autoContrast: s.autoContrast,
        showGuides: s.showGuides,
        avatarUrl: s.avatarUrl,
        showAvatar: s.showAvatar,
        avatarSize: s.avatarSize,
        avatarOffsetX: s.avatarOffsetX,
        avatarOffsetY: s.avatarOffsetY,
      }),
    }
  )
);
