"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Disc3,
  Layers,
  Cpu,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Check,
  ExternalLink,
  Smartphone,
  Star,
  Play,
  Share2,
  Sliders,
  Flame,
  Volume2,
  Mic2,
  Music,
} from "lucide-react";
import confetti from "canvas-confetti";
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

  // Handle scroll state for dynamic sticky M3 app bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
        // Fallback default
      }
    };
    fetchCount();
  }, []);

  const triggerDownloadCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#d0bcff", "#80ebd2", "#efb8c8", "#ffb74d"],
    });
  };

  const currentArchLayer =
    ARCHITECTURE_LAYERS.find((a) => a.id === selectedArch) ||
    ARCHITECTURE_LAYERS[0];

  const currentCapabilityGroup =
    CAPABILITY_CATEGORIES.find((c) => c.id === selectedCapabilityTab) ||
    CAPABILITY_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-[#0e0e13] text-[#e4e1eb] relative font-google selection:bg-[#d0bcff] selection:text-[#381e72]">
      {/* Dynamic Ambient Background Blur Pods */}
      <div
        className="fixed top-[-10%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-[#4f378b]/20 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed top-[45%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[#005047]/20 blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[-10%] left-[20%] w-[60vw] h-[50vw] rounded-full bg-[#633b48]/15 blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 1. M3 TOP APP BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3 ${
          scrolled
            ? "bg-[#1b1a21]/80 backdrop-blur-xl border-b border-[#464550]/40 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#381e72] to-[#d0bcff] p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md">
              <div className="w-full h-full rounded-[14px] bg-[#141319] flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/bttune_logo.svg"
                  alt="BTTUNE Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 drop-shadow"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-xl text-white group-hover:text-[#d0bcff] transition-colors">
                BTTUNE
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#80ebd2]">
                Android M3
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Pill Style) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1b1a21]/60 border border-[#464550]/40 rounded-full px-4 py-1.5 backdrop-blur-md">
            <a
              href="#overview"
              className="text-sm font-medium text-[#c8c5d2] hover:text-white px-3 py-1 rounded-full transition hover:bg-[#2e2c36]/60"
            >
              Overview
            </a>
            <a
              href="#screenshots"
              className="text-sm font-medium text-[#c8c5d2] hover:text-white px-3 py-1 rounded-full transition hover:bg-[#2e2c36]/60"
            >
              Screenshots
            </a>
            <a
              href="#architecture"
              className="text-sm font-medium text-[#c8c5d2] hover:text-white px-3 py-1 rounded-full transition hover:bg-[#2e2c36]/60"
            >
              Architecture
            </a>
            <a
              href="#capabilities"
              className="text-sm font-medium text-[#c8c5d2] hover:text-white px-3 py-1 rounded-full transition hover:bg-[#2e2c36]/60"
            >
              Capabilities
            </a>
            <a
              href="#team"
              className="text-sm font-medium text-[#c8c5d2] hover:text-white px-3 py-1 rounded-full transition hover:bg-[#2e2c36]/60"
            >
              Team
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-[#c8c5d2] hover:text-white px-3 py-1 rounded-full transition hover:bg-[#2e2c36]/60"
            >
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={APP_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#464550]/60 bg-[#141319]/80 hover:bg-[#24222b] text-xs font-semibold text-[#c8c5d2] hover:text-white transition"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4 text-[#d0bcff]" />
              <span>GitHub</span>
            </a>

            <a
              href="#download"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d0bcff] hover:bg-[#eaddff] text-[#381e72] text-sm font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              <span>Get APK</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl bg-[#1b1a21] border border-[#464550] text-[#c8c5d2]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-5 rounded-3xl bg-[#1b1a21] border border-[#464550] shadow-2xl space-y-4 animate-in fade-in slide-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl bg-[#24222b] text-sm font-medium text-white"
              >
                Overview
              </a>
              <a
                href="#screenshots"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#24222b] text-sm font-medium text-[#c8c5d2]"
              >
                Screenshots
              </a>
              <a
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#24222b] text-sm font-medium text-[#c8c5d2]"
              >
                Architecture
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#24222b] text-sm font-medium text-[#c8c5d2]"
              >
                Capabilities
              </a>
              <a
                href="#team"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#24222b] text-sm font-medium text-[#c8c5d2]"
              >
                Team
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#24222b] text-sm font-medium text-[#c8c5d2]"
              >
                FAQ
              </a>
            </div>
            <div className="pt-2 border-t border-[#464550]/40 flex gap-2">
              <a
                href={APP_CONFIG.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#464550] text-sm font-medium text-white"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#d0bcff] text-[#381e72] font-bold text-sm"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. BOLD M3 HERO SECTION */}
      <section
        id="overview"
        className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Dynamic Header Badge Stack */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#381e72]/70 border border-[#d0bcff]/40 text-[#d0bcff] text-xs font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d0bcff]" />
            <span>Material 3 Expressive UI</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b1a21] border border-[#80ebd2]/40 text-[#80ebd2] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Ad-Free & Open Source</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1a21] border border-[#464550] text-xs text-[#c8c5d2]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>{downloadsCount} Active Users</span>
          </div>
        </div>

        {/* 600px Display Font Hero Title */}
        <div className="space-y-6">
          <h1 className="text-giant-display font-black text-white tracking-tighter max-w-5xl">
            Pure Sound. <br />
            <span className="bg-gradient-to-r from-[#d0bcff] via-[#80ebd2] to-[#efb8c8] bg-clip-text text-transparent">
              Zero Distractions.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-[#c8c5d2] max-w-3xl leading-relaxed font-google-text">
            {APP_CONFIG.subtext}
          </p>

          {/* Action Row with Asymmetric M3 Shape Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#download"
              onClick={triggerDownloadCelebration}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 m3-asymmetric-card bg-[#d0bcff] hover:bg-[#eaddff] text-[#381e72] font-black text-lg shadow-xl hover:shadow-[#d0bcff]/20 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              <Download className="w-6 h-6 stroke-[2.5]" />
              <span>Download Free APK</span>
            </a>

            <a
              href={APP_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 m3-asymmetric-reverse bg-[#1b1a21] hover:bg-[#24222b] border border-[#464550] text-[#e4e1eb] font-bold text-base transition-all hover:-translate-y-1 active:translate-y-0"
            >
              <GithubIcon className="w-5 h-5 text-[#d0bcff]" />
              <span>Explore GitHub Repo</span>
              <ExternalLink className="w-4 h-4 text-[#918f9c]" />
            </a>
          </div>

          {/* Device & Spec Metadata */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#918f9c] font-medium">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#80ebd2]" />
              <span>Android 8.0+ (Oreo to Android 16)</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#464550]" />
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#ffb74d]" />
              <span>Optimized arm64-v8a & universal</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#464550]" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#efb8c8]" />
              <span>Latest: {liveRelease.version}</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Feature Cards (M3 Bento Grid) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
          {CORE_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-[#141319]/90 border border-[#464550]/40 backdrop-blur-md relative overflow-hidden group hover:border-[#918f9c]/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${stat.highlight}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.highlight }} />
                </div>
                <div
                  className="text-3xl font-extrabold tracking-tight mb-1"
                  style={{ color: stat.highlight }}
                >
                  {idx === 0 ? downloadsCount : stat.value}
                </div>
                <div className="text-sm font-semibold text-[#c8c5d2]">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. M3 SCREENSHOTS CAROUSEL SHOWCASE */}
      <section id="screenshots" className="py-24 bg-[#141319] border-y border-[#464550]/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#24222b] text-[#80ebd2] text-xs font-bold uppercase tracking-wider mb-3">
                <Disc3 className="w-3.5 h-3.5" />
                <span>Interface Experience</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Designed for Your Eyes & Ears
              </h2>
            </div>
            <p className="text-[#c8c5d2] max-w-md font-google-text text-base">
              Immerse yourself in dynamic M3 Monet theming that adjusts naturally to match the colors of whatever track is playing.
            </p>
          </div>

          {/* Screenshot Showcase Grid with High Corner Radius M3 Containers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APP_SCREENSHOTS.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-[36px] bg-[#1b1a21] border border-[#464550]/40 p-4 transition-all duration-300 hover:border-[#d0bcff]/50 hover:shadow-2xl hover:shadow-[#381e72]/30 flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[9/16] rounded-[26px] overflow-hidden bg-black/40 mb-4 border border-[#464550]/30">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-[#d0bcff] uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#d0bcff] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#c8c5d2] font-google-text leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURE & JETPACK COMPOSE DEEP DIVE */}
      <section id="architecture" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#381e72]/40 text-[#d0bcff] text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Android Stack</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Engineered With Precision
          </h2>
          <p className="text-lg text-[#c8c5d2] mt-4 font-google-text">
            Explore how modern Android Jetpack Compose, Kotlin Coroutines, and Google Media3 work together in BTTUNE.
          </p>
        </div>

        {/* Tab Selector with Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-10">
          {ARCHITECTURE_LAYERS.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setSelectedArch(layer.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedArch === layer.id
                  ? "bg-[#d0bcff] text-[#381e72] shadow-lg scale-105"
                  : "bg-[#1b1a21] text-[#c8c5d2] hover:bg-[#24222b] hover:text-white border border-[#464550]/40"
              }`}
            >
              {layer.badge}
            </button>
          ))}
        </div>

        {/* Active Architecture Detail Display */}
        <div className="rounded-[40px] bg-[#141319] border border-[#464550]/50 p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-25"
            style={{ backgroundColor: currentArchLayer.color }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{
                  color: currentArchLayer.color,
                  borderColor: `${currentArchLayer.color}60`,
                  backgroundColor: `${currentArchLayer.color}15`,
                }}
              >
                {currentArchLayer.badge}
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                {currentArchLayer.title}
              </h3>
              <p className="text-[#c8c5d2] text-base md:text-lg leading-relaxed font-google-text">
                {currentArchLayer.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {currentArchLayer.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1b1a21] border border-[#464550]/40"
                  >
                    <Check
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: currentArchLayer.color }}
                    />
                    <span className="text-xs font-medium text-white">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-[32px] bg-[#1b1a21] border border-[#464550]/50 text-center">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-inner"
                style={{ backgroundColor: `${currentArchLayer.color}25` }}
              >
                <Layers
                  className="w-10 h-10"
                  style={{ color: currentArchLayer.color }}
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Pure Android Native Architecture
              </h4>
              <p className="text-xs text-[#918f9c] mb-6 max-w-xs font-google-text">
                No web wrappers or Electron bloat. Compiled directly to native ARM bytecode for peak battery efficiency.
              </p>
              <a
                href={APP_CONFIG.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#24222b] hover:bg-[#2e2c36] border border-[#464550] transition"
              >
                <span>Inspect Source Code</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAPABILITIES & AUDIO ENGINE FEATURES */}
      <section id="capabilities" className="py-24 bg-[#141319] border-t border-[#464550]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#005047]/40 text-[#80ebd2] text-xs font-bold uppercase tracking-wider mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>Unmatched Audio Freedom</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Powerful Capabilities
            </h2>
            <p className="text-lg text-[#c8c5d2] mt-4 font-google-text">
              Engineered with pro audio capabilities previously reserved for paid desktop software.
            </p>
          </div>

          {/* Capability Category Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {CAPABILITY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCapabilityTab(cat.id)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                    selectedCapabilityTab === cat.id
                      ? "bg-[#80ebd2] text-[#003831] shadow-lg scale-105"
                      : "bg-[#1b1a21] text-[#c8c5d2] hover:bg-[#24222b] hover:text-white border border-[#464550]/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Cards for Active Capability */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCapabilityGroup.items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[30px] bg-[#1b1a21] border border-[#464550]/40 flex flex-col justify-between hover:border-[#80ebd2]/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#24222b] text-[11px] font-bold text-[#80ebd2] uppercase tracking-wider mb-4">
                    {item.badge}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-[#c8c5d2] leading-relaxed font-google-text">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-[#464550]/20 flex items-center justify-between text-[11px] text-[#918f9c]">
                  <span>Engine Feature</span>
                  <Check className="w-4 h-4 text-[#80ebd2]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DOWNLOAD ZONE & APK VARIANT SELECTOR */}
      <section id="download" className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative rounded-[48px] bg-gradient-to-b from-[#1b1a21] to-[#141319] border border-[#d0bcff]/40 p-8 md:p-14 text-center overflow-hidden shadow-2xl">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#381e72]/40 blur-[110px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d0bcff]/15 border border-[#d0bcff]/30 text-[#d0bcff] text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5" />
              <span>Official Release Build</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Get BTTUNE Free
            </h2>
            <p className="text-base md:text-lg text-[#c8c5d2] font-google-text">
              Zero advertisements, 100% open source. Download the signed APK directly to your Android device.
            </p>

            {/* Architecture Variant Chooser */}
            <div className="p-1.5 rounded-full bg-[#24222b] border border-[#464550] inline-flex items-center gap-1 mx-auto">
              <button
                onClick={() => setSelectedApkVariant("arm64")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedApkVariant === "arm64"
                    ? "bg-[#d0bcff] text-[#381e72]"
                    : "text-[#c8c5d2] hover:text-white"
                }`}
              >
                arm64-v8a (Recommended • {liveRelease.arm64Size})
              </button>
              <button
                onClick={() => setSelectedApkVariant("universal")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedApkVariant === "universal"
                    ? "bg-[#d0bcff] text-[#381e72]"
                    : "text-[#c8c5d2] hover:text-white"
                }`}
              >
                Universal ({liveRelease.universalSize})
              </button>
            </div>

            {/* Main Download Button */}
            <div className="pt-4 flex flex-col items-center gap-3">
              <a
                href={liveRelease.downloadUrl}
                onClick={triggerDownloadCelebration}
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-[24px] bg-[#d0bcff] hover:bg-[#eaddff] text-[#381e72] font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <Download className="w-6 h-6 stroke-[2.5]" />
                <span>
                  Download APK ({selectedApkVariant === "arm64" ? liveRelease.arm64Size : liveRelease.universalSize})
                </span>
              </a>

              <div className="text-xs text-[#918f9c] flex items-center gap-4">
                <span>Release: {liveRelease.version}</span>
                <span>•</span>
                <a
                  href={APP_CONFIG.releasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d0bcff] underline flex items-center gap-1"
                >
                  GitHub Releases Archive <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick 3-step installation guide */}
            <div className="mt-12 pt-8 border-t border-[#464550]/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-[#1b1a21] border border-[#464550]/30">
                <div className="text-[#d0bcff] font-bold text-sm mb-1">1. Download</div>
                <p className="text-xs text-[#c8c5d2] font-google-text">
                  Save the .apk file on your smartphone via Chrome or browser.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#1b1a21] border border-[#464550]/30">
                <div className="text-[#80ebd2] font-bold text-sm mb-1">2. Allow Install</div>
                <p className="text-xs text-[#c8c5d2] font-google-text">
                  Enable &apos;Install unknown apps&apos; in Android Settings when prompted.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#1b1a21] border border-[#464550]/30">
                <div className="text-[#efb8c8] font-bold text-sm mb-1">3. Enjoy Music</div>
                <p className="text-xs text-[#c8c5d2] font-google-text">
                  Launch BTTUNE, search any song, and enjoy ad-free audio instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OPEN SOURCE CREATOR TEAM */}
      <section id="team" className="py-24 bg-[#141319] border-t border-[#464550]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#efb8c8]/20 text-[#efb8c8] text-xs font-bold uppercase tracking-wider mb-3">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Open Source Contributors</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Meet The Maintainers
            </h2>
            <p className="text-lg text-[#c8c5d2] mt-4 font-google-text">
              Building privacy-first software with the global open-source community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[36px] bg-[#1b1a21] border border-[#464550]/40 flex flex-col justify-between hover:border-[#efb8c8]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 border-2 border-[#464550]">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <div className="text-xs font-bold text-[#d0bcff] mb-4">
                    {member.role}
                  </div>
                  <p className="text-xs text-[#c8c5d2] leading-relaxed font-google-text">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#464550]/30 flex items-center gap-3">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#24222b] hover:bg-[#2e2c36] text-white transition"
                    aria-label={`${member.name} GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#24222b] hover:bg-[#2e2c36] text-white transition"
                    aria-label={`${member.name} Website`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffb74d]/20 text-[#ffb74d] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Answers & Clarifications</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-[24px] bg-[#1b1a21] border border-[#464550]/40 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base md:text-lg text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d0bcff] transition-transform duration-200 flex-shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 text-sm text-[#c8c5d2] leading-relaxed font-google-text border-t border-[#464550]/20 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. M3 FOOTER */}
      <footer className="py-16 bg-[#07070a] border-t border-[#464550]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
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
              <div className="text-xs text-[#918f9c]">
                Open-source YouTube Music Client for Android
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#c8c5d2]">
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

          <div className="text-xs text-[#918f9c]">
            Designed with Material 3 & Google Sans
          </div>
        </div>
      </footer>
    </div>
  );
}
