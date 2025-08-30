"use client";
import { useRef } from "react";
import { useCoverStore } from "@/lib/store/cover-store";

export function CoverCanvas() {
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    title,
    subtitle,
    imageUrl,
    textAlign,
    verticalAlign,
    titleSize,
    subtitleSize,
    padding,
    titleColor,
    subtitleColor,
    overlayColor,
    overlayOpacity,
    fontFamily,
    aspectRatio,
    imageScale,
    imagePosX,
    imagePosY,
    textMaxWidth,
    autoContrast,
    showGuides,
    showAvatar,
    avatarUrl,
    avatarSize,
    avatarOffsetX,
    avatarOffsetY,
  } = useCoverStore();

  return (
    <div className="w-full flex items-center justify-center">
      <div
        id="cover-canvas"
        ref={ref}
        className="relative w-full max-w-4xl overflow-hidden rounded-md bg-muted"
        style={{ fontFamily, aspectRatio }}
      >
        {imageUrl ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: `${50 + (imagePosX ?? 0)}% ${
                50 + (imagePosY ?? 0)
              }%`,
              backgroundSize: `${Math.max(110, imageScale ?? 100)}% auto`,
            }}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-muted-foreground">
            {/* 选择一张背景图片 */}
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
        />

        <div
          className="absolute inset-0 flex"
          style={{
            padding,
            justifyContent: verticalAlignToCss(
              verticalAlign
            ) as React.CSSProperties["justifyContent"],
          }}
        >
          <div className="w-full">
            <div
              style={{
                maxWidth: `${textMaxWidth ?? 80}%`,
                marginInline: "auto",
                textAlign: textAlign as React.CSSProperties["textAlign"],
              }}
            >
              <h1
                className="tracking-tight"
                style={{
                  fontSize: titleSize,
                  color: autoContrast
                    ? pickAutoColor(overlayColor, overlayOpacity)
                    : titleColor,
                  lineHeight: 1.15,
                }}
              >
                {title || "输入标题"}
              </h1>

              {subtitle ? (
                <p
                  className="mt-3"
                  style={{
                    fontSize: subtitleSize,
                    color: autoContrast
                      ? pickAutoColor(overlayColor, overlayOpacity, true)
                      : subtitleColor,
                    lineHeight: 1.3,
                  }}
                >
                  {subtitle}
                </p>
              ) : null}

              {showAvatar ? (
                <div className="mt-5 flex justify-center">
                  <div
                    className="relative overflow-hidden rounded-full border border-white/70 shadow-sm"
                    style={{
                      width: avatarSize,
                      height: avatarSize,
                      transform: `translate(${avatarOffsetX}px, ${avatarOffsetY}px)`,
                    }}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="avatar"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-xs text-white/70">
                        头像
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {showGuides ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-6 border border-white/20 rounded" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function verticalAlignToCss(v: "top" | "center" | "bottom") {
  if (v === "top") return "flex-start";
  if (v === "bottom") return "flex-end";
  return "center";
}

function pickAutoColor(
  overlayHex: string,
  overlayOpacity: number,
  isSubtle = false
) {
  const { l } = oklchFromHex(overlayHex);
  const effectiveDarkness = (1 - l) * overlayOpacity;
  const white = isSubtle ? "#e5e5e5" : "#ffffff";
  const black = isSubtle ? "#333333" : "#111111";
  return effectiveDarkness > 0.15 ? white : black;
}

function oklchFromHex(hex: string) {
  const { r, g, b } = rgbFromHex(hex);
  const srgb = [r / 255, g / 255, b / 255].map((v) =>
    v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  const y = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  return { l: y };
}

function rgbFromHex(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
