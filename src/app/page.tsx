"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Check,
  Smartphone,
  Cpu,
  ShieldCheck,
  Disc3,
  Sliders,
  Layers,
  Sparkles,
  ArrowRight,
  Headphones,
  Music,
} from "lucide-react";
import confetti from "canvas-confetti";
import LightRays from "@/components/LightRays";
import SpiralTornadoCanvas, { SEC2_SCREENSHOTS } from "@/components/SpiralTornadoCanvas";
import { GithubIcon } from "@/components/GithubIcon";
import {
  APP_CONFIG,
  CORE_STATS,
  APP_SCREENSHOTS,
  ARCHITECTURE_LAYERS,
  CAPABILITY_CATEGORIES,
  TEAM_MEMBERS,
  FAQ_ITEMS,
} from "@/data/landingData";

export default function RedesignedLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedArch, setSelectedArch] = useState(ARCHITECTURE_LAYERS[0].id);
  const [selectedCapabilityTab, setSelectedCapabilityTab] = useState(
    CAPABILITY_CATEGORIES[0].id
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [downloadsCount, setDownloadsCount] = useState<string>("100K+");
  const [liveRelease, setLiveRelease] = useState({
    version: APP_CONFIG.version,
    apkSize: APP_CONFIG.apkSize,
    downloadUrl: APP_CONFIG.directDownloadUrl,
    arm64Size: "14.2 MB",
    universalSize: "16.8 MB",
  });
  const [selectedApkVariant, setSelectedApkVariant] = useState<"arm64" | "universal">("arm64");

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch live release info from GitHub API
  useEffect(() => {
    const fetchGitHubRelease = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${APP_CONFIG.githubRepo}/releases/latest`
        );
        if (res.ok) {
          const data = await res.json();
          let dlUrl = APP_CONFIG.directDownloadUrl;
          let universal = "16.8 MB";
          let arm64 = "14.2 MB";

          if (data.assets && data.assets.length > 0) {
            const armAsset = data.assets.find((a: any) =>
              a.name.toLowerCase().includes("arm64")
            );
            const uniAsset = data.assets.find(
              (a: any) =>
                a.name.toLowerCase().includes("universal") ||
                a.name.endsWith(".apk")
            );

            if (armAsset) {
              dlUrl = armAsset.browser_download_url;
              arm64 = `${(armAsset.size / (1024 * 1024)).toFixed(1)} MB`;
            } else if (uniAsset) {
              dlUrl = uniAsset.browser_download_url;
            }

            if (uniAsset) {
              universal = `${(uniAsset.size / (1024 * 1024)).toFixed(1)} MB`;
            }
          }

          setLiveRelease({
            version: data.tag_name || APP_CONFIG.version,
            apkSize: arm64,
            downloadUrl: dlUrl,
            arm64Size: arm64,
            universalSize: universal,
          });
        }
      } catch (err) {
        console.warn("Could not fetch release info from GitHub:", err);
      }
    };
    fetchGitHubRelease();
  }, []);

  // Fetch live downloads count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(
          `https://countapi.mileshilliard.com/api/v1/get/bttune_android_app_installs?_t=${Date.now()}`
        );
        if (res.ok) {
          const data = await res.json();
          if (typeof data.value === "number") {
            const val = data.value;
            if (val >= 1000000) {
              setDownloadsCount(`${(val / 1000000).toFixed(1)}M+`);
            } else if (val >= 1000) {
              setDownloadsCount(`${(val / 1000).toFixed(1)}K+`);
            } else {
              setDownloadsCount(`${val}+`);
            }
          }
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchCount();
  }, []);

  const triggerDownloadCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.8 },
      colors: ["#ffffff", "#3b82f6", "#10b981", "#a855f7"],
    });
  };

  const currentArchLayer =
    ARCHITECTURE_LAYERS.find((a) => a.id === selectedArch) ||
    ARCHITECTURE_LAYERS[0];

  const currentCapabilityGroup =
    CAPABILITY_CATEGORIES.find((c) => c.id === selectedCapabilityTab) ||
    CAPABILITY_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-black text-white font-dmsans selection:bg-white selection:text-black antialiased">
      {/* =========================================================================
          GLOBAL STICKY HEADER
          ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
          scrolled
            ? "bg-black/75 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md">
              <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/bttune_logo.svg"
                  alt="BTTUNE Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-xl text-white">
                BTTUNE
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400">
                Android Music
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full px-5 py-1.5 backdrop-blur-md">
            <a
              href="#hero"
              className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-1 rounded-full transition"
            >
              Overview
            </a>
            <a
              href="#tornado-showcase"
              className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-1 rounded-full transition"
            >
              Screenshots
            </a>
            <a
              href="#architecture"
              className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-1 rounded-full transition"
            >
              Engine
            </a>
            <a
              href="#capabilities"
              className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-1 rounded-full transition"
            >
              Features
            </a>
            <a
              href="#team"
              className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-1 rounded-full transition"
            >
              Team
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-1 rounded-full transition"
            >
              FAQ
            </a>
          </nav>

          {/* Nav Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={APP_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-xs font-semibold text-neutral-300 hover:text-white transition"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              <span>GitHub</span>
            </a>

            <a
              href="#download"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              <span>Get APK</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-5 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-4">
            <div className="flex flex-col gap-2">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 text-sm font-medium text-white"
              >
                Overview
              </a>
              <a
                href="#tornado-showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-neutral-900 text-sm font-medium text-neutral-300"
              >
                Screenshots
              </a>
              <a
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-neutral-900 text-sm font-medium text-neutral-300"
              >
                Engine
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-neutral-900 text-sm font-medium text-neutral-300"
              >
                Features
              </a>
              <a
                href="#team"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-neutral-900 text-sm font-medium text-neutral-300"
              >
                Team
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-neutral-900 text-sm font-medium text-neutral-300"
              >
                FAQ
              </a>
            </div>
            <div className="pt-2 border-t border-neutral-800 flex gap-2">
              <a
                href={APP_CONFIG.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-800 text-sm font-medium text-white"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-sm"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 1 (FIRST SECTION - DARK)
          Text-Only Hero in the Center with React Bits <LightRays /> Background
          ========================================================================= */}
      <section
        id="hero"
        className="relative w-full min-h-[92vh] flex items-center justify-center bg-black overflow-hidden pt-24 pb-16 px-6"
      >
        {/* React Bits LightRays Component as specified */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            glow={0.6}
            haze={0.25}
            followMouse={true}
            mouseInfluence={0.1}
          />
        </div>

        {/* Ambient Vignette & Depth Mask */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none" />

        {/* Text-Only Hero Content (Centered, Big Modern Typography) */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-neutral-300 text-xs font-medium tracking-wide uppercase mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Open Source • Ad-Free YouTube Music for Android</span>
          </div>

          {/* Ultra Display Headline */}
          <h1 className="text-ultra-display font-black text-white tracking-tighter mb-6 max-w-4xl">
            Stream Music Without Limits.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-2xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            A high-performance Android music streaming client engineered with Jetpack Compose, 8D Spatial DSP audio, millisecond syllable lyrics sync, and zero advertisements.
          </p>

          {/* Clean CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#download"
              onClick={triggerDownloadCelebration}
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-extrabold text-base transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download APK Free</span>
            </a>

            <a
              href="#tornado-showcase"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-medium text-base transition-all hover:scale-105"
            >
              <span>Explore Visuals</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </a>
          </div>

          {/* Meta Stats Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">{downloadsCount}</span> Installs
            </div>
            <span>•</span>
            <div>
              <span className="text-white font-bold">100% Ad-Free</span> & No Login Required
            </div>
            <span>•</span>
            <div>
              <span className="text-white font-bold">Studio Audio</span> 320 kbps & 8D DSP
            </div>
            <span>•</span>
            <div>
              <span className="text-white font-bold">Android 8.0+</span> (API 26 to 16)
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 (SECOND SECTION - LIGHT)
          Floating Images: Outward Tornado / Expanding Spiral Animation
          Using Repository Screenshots from public/assets/screenshots/sec2/
          ========================================================================= */}
      <section
        id="tornado-showcase"
        className="relative w-full min-h-[110vh] flex items-center justify-center bg-neutral-100 text-neutral-900 overflow-hidden py-32 px-6"
      >
        {/* Subtle Light Backdrop Grid Accent */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
          aria-hidden="true"
        />

        {/* 
            CRITICAL REQUIREMENT:
            Outward Tornado / Expanding Spiral Animation with Real Screenshots
            Orbiting around stationary centered hero content
        */}
        <SpiralTornadoCanvas />

        {/* 
            STATIONARY CENTERED HERO CONTENT 
            Heading and CTA buttons remain completely stationary while screenshots
            orbit and spiral outwardly around them without obstructing readability.
        */}
        <div className="relative z-20 max-w-3xl mx-auto text-center p-8 sm:p-12 rounded-[40px] bg-white/80 backdrop-blur-xl border border-neutral-200/90 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.12)]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider mb-6">
            <Disc3 className="w-3.5 h-3.5" />
            <span>Interactive App Experience</span>
          </div>

          <h2 className="text-section-title font-black text-neutral-950 tracking-tight mb-4">
            A Living Universe <br />of Pure Sound.
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed mb-8">
            Immerse yourself in dynamic theme generation, millisecond syllable lyrics synchrony, spatial 8D virtual surround, and seamless offline library caching.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#download"
              onClick={triggerDownloadCelebration}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm transition-all shadow-md hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download BTTUNE v6.1.4</span>
            </a>

            <a
              href={APP_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 font-semibold text-sm transition"
            >
              <GithubIcon className="w-4 h-4 text-neutral-800" />
              <span>View Source</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200/80 flex items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
            <span>✓ 14 Real Native App Screens</span>
            <span>•</span>
            <span>✓ Zero Clutter or Web Wrappers</span>
            <span>•</span>
            <span>✓ 100% Kotlin Compose</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CORE CAPABILITIES & AUDIO ENGINE (DARK CONTRAST)
          ========================================================================= */}
      <section id="capabilities" className="py-32 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <Sliders className="w-3.5 h-3.5" />
              <span>Engineered For Audiophiles</span>
            </div>
            <h2 className="text-section-title font-black text-white tracking-tight">
              Powerful Capabilities.
            </h2>
            <p className="text-lg text-neutral-400 mt-4 font-normal">
              Hardware-accelerated audio processing with low battery consumption.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            {CAPABILITY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCapabilityTab(cat.id)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    selectedCapabilityTab === cat.id
                      ? "bg-white text-black shadow-lg scale-105 font-bold"
                      : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Cards for active category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCapabilityGroup.items.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[32px] bg-neutral-950 border border-neutral-800 flex flex-col justify-between hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-neutral-900 text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-5">
                    {item.badge}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500">
                  <span>Engine Capability</span>
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ARCHITECTURE DEEP DIVE
          ========================================================================= */}
      <section id="architecture" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Android Stack</span>
          </div>
          <h2 className="text-section-title font-black text-white tracking-tight">
            High-Performance Core.
          </h2>
          <p className="text-lg text-neutral-400 mt-4 font-normal">
            Declarative Jetpack Compose UI, Kotlin Coroutines, and Google Media3 ExoPlayer.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {ARCHITECTURE_LAYERS.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setSelectedArch(layer.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedArch === layer.id
                  ? "bg-white text-black shadow-lg scale-105 font-bold"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800"
              }`}
            >
              {layer.badge}
            </button>
          ))}
        </div>

        {/* Active Architecture Display */}
        <div className="rounded-[40px] bg-neutral-950 border border-neutral-800 p-8 md:p-14 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                {currentArchLayer.badge}
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                {currentArchLayer.title}
              </h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-normal">
                {currentArchLayer.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {currentArchLayer.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800"
                  >
                    <Check className="w-5 h-5 flex-shrink-0 text-white" />
                    <span className="text-xs font-medium text-neutral-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-[32px] bg-neutral-900 border border-neutral-800 text-center">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6">
                <Layers className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                100% Native Bytecode
              </h4>
              <p className="text-xs text-neutral-400 mb-6 max-w-xs font-normal">
                No web wrappers or Electron bloat. Compiled directly to native ARM bytecode for peak battery efficiency.
              </p>
              <a
                href={APP_CONFIG.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 transition"
              >
                <span>Inspect Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DOWNLOAD ZONE (LIGHT / HIGH IMPACT)
          ========================================================================= */}
      <section id="download" className="py-28 px-6 max-w-5xl mx-auto">
        <div className="rounded-[48px] bg-white text-neutral-950 p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-900 text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5" />
              <span>Official Release Build</span>
            </div>

            <h2 className="text-section-title font-black text-neutral-950 tracking-tight">
              Get BTTUNE Today.
            </h2>
            <p className="text-base md:text-lg text-neutral-600 font-normal">
              Zero advertisements, 100% open source. Download the signed APK directly to your Android device.
            </p>

            {/* Variant Switcher */}
            <div className="p-1 rounded-full bg-neutral-100 border border-neutral-300 inline-flex items-center gap-1 mx-auto">
              <button
                onClick={() => setSelectedApkVariant("arm64")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedApkVariant === "arm64"
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                arm64-v8a (Recommended • {liveRelease.arm64Size})
              </button>
              <button
                onClick={() => setSelectedApkVariant("universal")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedApkVariant === "universal"
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                Universal ({liveRelease.universalSize})
              </button>
            </div>

            {/* Direct Download Button */}
            <div className="pt-4 flex flex-col items-center gap-3">
              <a
                href={liveRelease.downloadUrl}
                onClick={triggerDownloadCelebration}
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-black text-lg shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-6 h-6 stroke-[2.5]" />
                <span>
                  Download APK ({selectedApkVariant === "arm64" ? liveRelease.arm64Size : liveRelease.universalSize})
                </span>
              </a>

              <div className="text-xs text-neutral-500 flex items-center gap-4">
                <span>Version: {liveRelease.version}</span>
                <span>•</span>
                <a
                  href={APP_CONFIG.releasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black underline flex items-center gap-1"
                >
                  GitHub Releases Archive <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 3 Step Installation Flow */}
            <div className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="text-neutral-950 font-bold text-sm mb-1">1. Download APK</div>
                <p className="text-xs text-neutral-600 font-normal">
                  Save the package file on your phone through Chrome or browser.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="text-neutral-950 font-bold text-sm mb-1">2. Allow Install</div>
                <p className="text-xs text-neutral-600 font-normal">
                  Enable &apos;Install unknown apps&apos; in Android Settings when prompted.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="text-neutral-950 font-bold text-sm mb-1">3. Enjoy Music</div>
                <p className="text-xs text-neutral-600 font-normal">
                  Launch BTTUNE, search any track, and enjoy ad-free audio immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TEAM & CONTRIBUTORS
          ========================================================================= */}
      <section id="team" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4">
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Open Source Community</span>
          </div>
          <h2 className="text-section-title font-black text-white tracking-tight">
            Meet The Maintainers.
          </h2>
          <p className="text-lg text-neutral-400 mt-4 font-normal">
            Building privacy-first software with the global open-source community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[36px] bg-neutral-950 border border-neutral-800 flex flex-col justify-between hover:border-white/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 border border-neutral-700">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-xs font-semibold text-neutral-400 mb-4">
                  {member.role}
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800 flex items-center gap-3">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white transition"
                  aria-label={`${member.name} GitHub`}
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white transition"
                  aria-label={`${member.name} Website`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FAQ
          ========================================================================= */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clarifications</span>
          </div>
          <h2 className="text-section-title font-black text-white tracking-tight">
            Frequently Asked Questions.
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-[24px] bg-neutral-950 border border-neutral-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base md:text-lg text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 text-sm text-neutral-400 leading-relaxed font-normal border-t border-neutral-900 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="py-16 bg-neutral-950 border-t border-neutral-800 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/bttune_logo.svg"
              alt="BTTUNE"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <div>
              <div className="font-bold text-white tracking-wide">BTTUNE</div>
              <div className="text-xs text-neutral-500">
                Open-source YouTube Music Client for Android
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <a
              href={APP_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub Source
            </a>
            <a
              href={APP_CONFIG.releasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Releases
            </a>
            <a
              href="https://github.com/biswaadev/bttune-android/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GPL-3.0 License
            </a>
            <a
              href={APP_CONFIG.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Biswajit Tanti
            </a>
          </div>

          <div className="text-xs text-neutral-500">
            Engineered with Next.js, React Bits & DM Sans
          </div>
        </div>
      </footer>
    </div>
  );
}
