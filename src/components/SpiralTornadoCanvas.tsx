"use client";

import React from "react";
import Image from "next/image";
import "./SpiralTornado.css";

export interface TornadoScreenshot {
  src: string;
  alt: string;
  startAngle: number; // degrees
  innerRadius: number; // px
  midRadius: number; // px
  outerRadius: number; // px
  duration: number; // seconds
  delay: number; // seconds
  direction: "cw" | "ccw";
  tilt: number; // degrees
  width: number;
  height: number;
}

// 14 Real Screenshots from public/assets/screenshots/sec2/
export const SEC2_SCREENSHOTS: TornadoScreenshot[] = [
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102502.png",
    alt: "BTTUNE Now Playing Track with Synced Lyrics",
    startAngle: 0,
    innerRadius: 260,
    midRadius: 420,
    outerRadius: 600,
    duration: 32,
    delay: 0,
    direction: "cw",
    tilt: -4,
    width: 170,
    height: 350,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102707.png",
    alt: "BTTUNE 8D Surround Audio DSP",
    startAngle: 55,
    innerRadius: 300,
    midRadius: 460,
    outerRadius: 660,
    duration: 36,
    delay: -5,
    direction: "cw",
    tilt: 5,
    width: 180,
    height: 370,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102823.png",
    alt: "BTTUNE Dynamic Waveform Equalizer",
    startAngle: 110,
    innerRadius: 280,
    midRadius: 440,
    outerRadius: 620,
    duration: 30,
    delay: -10,
    direction: "cw",
    tilt: -3,
    width: 165,
    height: 340,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102911.png",
    alt: "BTTUNE Full Dynamic Lyrics Mode",
    startAngle: 160,
    innerRadius: 320,
    midRadius: 490,
    outerRadius: 690,
    duration: 38,
    delay: -14,
    direction: "cw",
    tilt: 6,
    width: 175,
    height: 360,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-103748.png",
    alt: "BTTUNE Library & Local Audio Caching",
    startAngle: 210,
    innerRadius: 270,
    midRadius: 430,
    outerRadius: 610,
    duration: 34,
    delay: -4,
    direction: "cw",
    tilt: -5,
    width: 160,
    height: 330,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-105132.png",
    alt: "BTTUNE Artist Discography & Albums",
    startAngle: 260,
    innerRadius: 310,
    midRadius: 470,
    outerRadius: 650,
    duration: 35,
    delay: -18,
    direction: "cw",
    tilt: 4,
    width: 170,
    height: 350,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-110622.png",
    alt: "BTTUNE Trending Music Charts",
    startAngle: 315,
    innerRadius: 290,
    midRadius: 450,
    outerRadius: 630,
    duration: 31,
    delay: -8,
    direction: "cw",
    tilt: -3,
    width: 165,
    height: 340,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-111436.png",
    alt: "BTTUNE Offline Songs Vault",
    startAngle: 30,
    innerRadius: 340,
    midRadius: 520,
    outerRadius: 720,
    duration: 42,
    delay: -12,
    direction: "ccw",
    tilt: 5,
    width: 180,
    height: 370,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-111551.png",
    alt: "BTTUNE Audio Output & Spatializer Device Switcher",
    startAngle: 85,
    innerRadius: 330,
    midRadius: 500,
    outerRadius: 710,
    duration: 40,
    delay: -22,
    direction: "ccw",
    tilt: -6,
    width: 170,
    height: 350,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-111920.png",
    alt: "BTTUNE Playlists Management",
    startAngle: 145,
    innerRadius: 350,
    midRadius: 540,
    outerRadius: 740,
    duration: 44,
    delay: -7,
    direction: "ccw",
    tilt: 4,
    width: 165,
    height: 340,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-122413.png",
    alt: "BTTUNE Material 3 Home Screen UI",
    startAngle: 195,
    innerRadius: 360,
    midRadius: 550,
    outerRadius: 760,
    duration: 45,
    delay: -16,
    direction: "ccw",
    tilt: -4,
    width: 185,
    height: 380,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-122752.png",
    alt: "BTTUNE Dynamic Sleep Timer & Audio Controls",
    startAngle: 250,
    innerRadius: 330,
    midRadius: 510,
    outerRadius: 700,
    duration: 39,
    delay: -25,
    direction: "ccw",
    tilt: 5,
    width: 160,
    height: 330,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-124909.png",
    alt: "BTTUNE Smart Search with Instant Auto-Suggest",
    startAngle: 295,
    innerRadius: 340,
    midRadius: 530,
    outerRadius: 730,
    duration: 41,
    delay: -3,
    direction: "ccw",
    tilt: -5,
    width: 175,
    height: 360,
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-125213.png",
    alt: "BTTUNE Dark Theme Settings & Audio Bitrate",
    startAngle: 345,
    innerRadius: 350,
    midRadius: 535,
    outerRadius: 750,
    duration: 43,
    delay: -19,
    direction: "ccw",
    tilt: 3,
    width: 170,
    height: 350,
  },
];

export default function SpiralTornadoCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center -z-0">
      {/* Center Anchor Point */}
      <div className="relative w-0 h-0 flex items-center justify-center">
        {SEC2_SCREENSHOTS.map((item, idx) => {
          const orbitClass =
            item.direction === "cw" ? "tornado-orbit-cw" : "tornado-orbit-ccw";

          const orbitStyle = {
            "--orbit-start-angle": `${item.startAngle}deg`,
            "--orbit-r-inner": `${item.innerRadius}px`,
            "--orbit-r-mid": `${item.midRadius}px`,
            "--orbit-r-outer": `${item.outerRadius}px`,
            "--orbit-duration": `${item.duration}s`,
            "--orbit-delay": `${item.delay}s`,
            position: "absolute" as const,
            top: 0,
            left: 0,
            transformOrigin: "0 0",
          } as React.CSSProperties;

          const tiltStyle = {
            "--base-tilt": `${item.tilt}deg`,
            width: `${item.width}px`,
            height: `${item.height}px`,
          } as React.CSSProperties;

          return (
            <div key={idx} style={orbitStyle} className={orbitClass}>
              <div
                style={tiltStyle}
                className="tornado-item-tilt relative rounded-[26px] p-1.5 bg-white/70 dark:bg-white/10 backdrop-blur-md border border-neutral-300/60 dark:border-white/20 shadow-2xl overflow-hidden transition-transform duration-300 pointer-events-auto hover:scale-110 hover:z-30 cursor-pointer"
              >
                <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-neutral-900">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-cover object-top"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
