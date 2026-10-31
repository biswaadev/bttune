import {
  Sparkles,
  Volume2,
  Mic2,
  CloudOff,
  Palette,
  ShieldCheck,
  Radio,
  Sliders,
  Cpu,
  Layers,
  Zap,
  Flame,
  LayoutGrid,
  Download,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Smartphone,
  Headphones,
  Music4,
  RefreshCw,
  FolderHeart,
} from "lucide-react";

export const APP_CONFIG = {
  name: "BTTUNE",
  tagline: "Sound Beyond Limits.",
  subtext:
    "An open-source, zero-ad YouTube Music client engineered with Android Material 3, 8D Spatial DSP, real-time synchronized syllable lyrics, and persistent offline audio caching.",
  version: "v6.1.4",
  releaseDate: "Latest Build",
  apkSize: "14.5 MB",
  minAndroid: "Android 8.0+ (API 26)",
  githubRepo: "biswaadev/bttune-android",
  repoUrl: "https://github.com/biswaadev/bttune-android",
  releasesUrl: "https://github.com/biswaadev/bttune-android/releases",
  directDownloadUrl: "https://github.com/biswaadev/bttune-android/releases/latest",
  author: "Biswajit Tanti",
  authorUrl: "https://biswadev.vercel.app/",
  contributor: "bitzzdev",
  contributorUrl: "https://bitz.is-a.dev",
};

export const CORE_STATS = [
  { label: "Community Downloads", value: "100K+", icon: Download, highlight: "#d0bcff" },
  { label: "Audio Bitrate", value: "320 kbps", icon: Headphones, highlight: "#80ebd2" },
  { label: "Telemetry & Ads", value: "Zero (0%)", icon: ShieldCheck, highlight: "#efb8c8" },
  { label: "Architecture", value: "100% Kotlin", icon: Cpu, highlight: "#ffb74d" },
];

export const APP_SCREENSHOTS = [
  {
    src: "/assets/screenshots/hero-screen.jpg",
    title: "Pure Dynamic Player",
    subtitle: "Adaptive dynamic color theme generated in real-time from album art palettes.",
    category: "Now Playing",
  },
  {
    src: "/assets/screenshots/previewalbum.jpg",
    title: "Syllable Synced Lyrics",
    subtitle: "Word-by-word karaoke highlighting with millisecond time synchrony.",
    category: "Lyrics Engine",
  },
  {
    src: "/assets/screenshots/quality.jpg",
    title: "Studio DSP & Spatializer",
    subtitle: "8D surround virtualization, parametric equalizer, and bass boost curve control.",
    category: "Audio Engine",
  },
  {
    src: "/assets/screenshots/widget_preview.png",
    title: "Material 3 Interactive Widgets",
    subtitle: "Glance API powered home screen music widgets with dynamic fluid corners.",
    category: "Home Integration",
  },
  {
    src: "/assets/screenshots/screen-4.jpg",
    title: "Smart Offline Vault",
    subtitle: "Seamless local storage caching with automated album metadata enrichment.",
    category: "Offline Audio",
  },
  {
    src: "/assets/screenshots/screen-3.jpg",
    title: "Curated Explore & Charts",
    subtitle: "Streamlined search, artists discovery, and trending genres with no clutter.",
    category: "Explore",
  },
];

export const ARCHITECTURE_LAYERS = [
  {
    id: "ui",
    badge: "Presentation Layer",
    title: "100% Jetpack Compose & M3 Dynamic Tonal Palette",
    desc: "Built purely declaratively without any legacy XML views. Leverages Material 3 Expressive motion curves, dynamic Monet color theming derived from album cover tones, and haptic feedback.",
    features: [
      "Dynamic color extraction using Palette API",
      "Edge-to-edge immersive navigation and gestures",
      "Glance AppWidget with dynamic responsive shapes",
      "Adaptive dark & OLED deep black modes",
    ],
    color: "#d0bcff",
  },
  {
    id: "audio",
    badge: "Audio DSP Core",
    title: "Media3 ExoPlayer & 8D Spatial Audio Pipeline",
    desc: "Low-latency Android Media3 / ExoPlayer playback engine chained with custom DSP audio effect processors including binaural 8D virtualization, 10-band equalizer, and loudness maximizer.",
    features: [
      "Lossless Opus & AAC up to 320kbps streaming",
      "8D spatial binaural simulation and reverb presets",
      "Seamless gapless playback with crossfade",
      "Equalizer with custom sound profiles",
    ],
    color: "#80ebd2",
  },
  {
    id: "offline",
    badge: "Storage & Cache",
    title: "Room Database & Chunked Audio Cache",
    desc: "Intelligent background download worker using WorkManager and OkHttp streaming. Caches metadata in Room database with full-text search capability.",
    features: [
      "One-tap offline caching for offline travel & low data",
      "Encrypted keystore for saved playlists",
      "Custom audio tags and embedded cover artwork extraction",
      "Background download resumes on network reconnection",
    ],
    color: "#efb8c8",
  },
  {
    id: "lyrics",
    badge: "Real-time Sync",
    title: "Syllable-Level LRC & KRC Synchronizer",
    desc: "High-precision word-by-word highlighted lyrics stream with karaoke preview mode, translation support, and fallback online lyrics providers.",
    features: [
      "Millisecond word synchrony for karaoke experience",
      "Custom font scaling and lyric offsets",
      "Instant offline lyrics cache storage",
      "Background synchronized mini-player lyric ticker",
    ],
    color: "#ffb74d",
  },
];

export const CAPABILITY_CATEGORIES = [
  {
    id: "playback",
    title: "Core Playback",
    icon: Volume2,
    items: [
      {
        title: "Zero Advertisements",
        desc: "No video banners, no audio ads, no sponsor roll, and no tracking analytics.",
        badge: "Pure Audio",
      },
      {
        title: "Background Streaming",
        desc: "Play seamlessly while screen is locked, switching apps, or using split-screen mode.",
        badge: "MediaSession",
      },
      {
        title: "Gapless Audio & Crossfade",
        desc: "Ultra-smooth transitions between album tracks with customizable crossfade time.",
        badge: "DSP",
      },
      {
        title: "Audio Normalization",
        desc: "Automated loudness normalization to eliminate volume jumps across tracks.",
        badge: "Studio",
      },
    ],
  },
  {
    id: "lyrics-tab",
    title: "Lyrics & Visuals",
    icon: Mic2,
    items: [
      {
        title: "Word-by-Word Highlight",
        desc: "Watch the words illuminate with precision rhythm matching the singer's vocal cadence.",
        badge: "Synced",
      },
      {
        title: "Dynamic Canvas Background",
        desc: "Fluid animated gradient meshes based on the album art colors.",
        badge: "Visuals",
      },
      {
        title: "Live Translation",
        desc: "Instant multi-language translation for international music catalogs.",
        badge: "Global",
      },
      {
        title: "Dual-Line Widget",
        desc: "Compact floating or desktop widget with live synchronized lyric preview.",
        badge: "Glance",
      },
    ],
  },
  {
    id: "dsp-tab",
    title: "Spatial & Equalizer",
    icon: Sliders,
    items: [
      {
        title: "8D Virtual Surround",
        desc: "Pans sound around your head in 360-degree acoustic orbits using HRTF simulation.",
        badge: "Spatializer",
      },
      {
        title: "10-Band Pro Equalizer",
        desc: "Craft your precise curve with presets for Bass Boost, Vocal Warmth, Rock, and EDM.",
        badge: "Pro Audio",
      },
      {
        title: "Reverb & Room Ambience",
        desc: "Simulate listening in an intimate studio, auditorium, or large concert stadium.",
        badge: "Ambience",
      },
      {
        title: "Audio Pitch & Speed Control",
        desc: "Adjust speed from 0.5x to 2.0x or transpose pitch in real-time without artifacts.",
        badge: "Pitch",
      },
    ],
  },
  {
    id: "privacy-tab",
    title: "Open Source & Privacy",
    icon: ShieldCheck,
    items: [
      {
        title: "Zero Google Login Mandatory",
        desc: "Enjoy the full music universe without signing in or linking your Google account.",
        badge: "Incognito",
      },
      {
        title: "Local Database Only",
        desc: "Playlists, history, and favorites remain 100% locally on your smartphone.",
        badge: "SQLite / Room",
      },
      {
        title: "Audit-Ready Source Code",
        desc: "Transparently inspected and compiled by developers worldwide on GitHub.",
        badge: "GPL-3.0",
      },
      {
        title: "No Firebase or Telemetry Trackers",
        desc: "Stripped of all surveillance SDKs, crash trackers, and analytics payloads.",
        badge: "Clean",
      },
    ],
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Biswajit Tanti",
    role: "Lead Android Architect & Core Maintainer",
    avatar: "https://github.com/biswaadev.png",
    bio: "Passionate Android Developer focused on modern Kotlin, Jetpack Compose, audio DSP architectures, and responsive Material 3 experiences.",
    github: "https://github.com/biswaadev",
    website: "https://biswadev.vercel.app/",
  },
  {
    name: "bitzzdev",
    role: "Infrastructure & Audio Pipeline Contributor",
    avatar: "https://github.com/bitzzdev.png",
    bio: "Systems and modern mobile developer contributing to client optimizations, network efficiency, and automated release builds.",
    github: "https://github.com/bitzzdev",
    website: "https://bitz.is-a.dev",
  },
  {
    name: "Trisan Tanti",
    role: "UI/UX & Quality Assurance Specialist",
    avatar: "https://github.com/biswaadev.png",
    bio: "Focusing on Material 3 interaction ergonomics, animation polish, haptics feedback, and testing across diverse Android OEM devices.",
    github: "https://github.com/biswaadev",
    website: "https://github.com/biswaadev/bttune-android",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Is BTTUNE completely free and without ads?",
    a: "Yes! BTTUNE is 100% free, fully open-source, and contains zero commercial advertisements, zero telemetry trackers, and zero paywalls. You do not need any subscription.",
  },
  {
    q: "Do I need a Google account or YouTube Music subscription?",
    a: "No! BTTUNE is built to function fully without any account required. You can search, play, stream, and save local playlists immediately without logging in.",
  },
  {
    q: "Can I download songs to listen offline without internet?",
    a: "Yes! BTTUNE features an offline caching engine. You can save full albums, playlists, or individual tracks straight into your phone's local storage for offline playback.",
  },
  {
    q: "What Android versions and hardware architectures are supported?",
    a: "BTTUNE supports Android 8.0 (API 26) through the newest Android 15 & 16. It is compiled for arm64-v8a, armeabi-v7a, and x86_64, with universal APKs also provided.",
  },
  {
    q: "How does the 8D Spatial Audio Virtualizer work?",
    a: "It processes stereo audio channels using Head-Related Transfer Function (HRTF) algorithms and dynamic LFO phase modulators to recreate the acoustic feeling of sound orbiting around your head in 3D space.",
  },
  {
    q: "Is BTTUNE safe to install on my Android device?",
    a: "100% safe! All source code is openly hosted on GitHub under an open-source license. The APKs are compiled automatically via GitHub Actions pipelines with verifiable SHA-256 hashes.",
  },
];
