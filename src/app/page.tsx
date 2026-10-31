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
  ArrowRight,
  Music2,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import LightRays from "@/components/LightRays";
import FlexCarousel, { CarouselItem } from "@/components/FlexCarousel";
import OptionWheel from "@/components/OptionWheel";
import SpecularButton from "@/components/SpecularButton";
import { GithubIcon } from "@/components/GithubIcon";
import {
  APP_CONFIG,
  ARCHITECTURE_LAYERS,
  CAPABILITY_CATEGORIES,
  TEAM_MEMBERS,
  FAQ_ITEMS,
} from "@/data/landingData";

const CAROUSEL_SCREENSHOTS: CarouselItem[] = [
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102502.png",
    alt: "Now Playing Player",
    title: "Dynamic Now Playing",
    subtitle: "Real-time palette color extraction",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102707.png",
    alt: "8D Spatial Audio DSP",
    title: "8D Spatial Audio",
    subtitle: "Binaural 360-degree virtual sound",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102823.png",
    alt: "Parametric Equalizer",
    title: "Pro Equalizer",
    subtitle: "10-band precision curve tuning",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-102911.png",
    alt: "Syllable Synced Lyrics",
    title: "Karaoke Lyrics",
    subtitle: "Word-by-word highlighted cadence",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-103748.png",
    alt: "Local Audio Cache",
    title: "Smart Offline Vault",
    subtitle: "Direct storage caching",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-105132.png",
    alt: "Artist Discography",
    title: "Artist Discography",
    subtitle: "Albums, singles and live versions",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-110622.png",
    alt: "Trending Music Charts",
    title: "Curated Charts",
    subtitle: "Global and regional rankings",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-111436.png",
    alt: "Offline Library",
    title: "Persistent Library",
    subtitle: "Zero internet dependency",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-111551.png",
    alt: "Audio Output Switcher",
    title: "Spatial Audio Device Switcher",
    subtitle: "Lossless Bluetooth and wired routing",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-111920.png",
    alt: "Playlist Management",
    title: "Custom Playlists",
    subtitle: "Organized local collections",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-122413.png",
    alt: "Modern Home Interface",
    title: "Fluid Navigation",
    subtitle: "100% Jetpack Compose UI",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-122752.png",
    alt: "Audio Playback Controls",
    title: "Sleep Timer & Queue",
    subtitle: "Fine-grained background management",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-124909.png",
    alt: "Smart Search Auto-suggest",
    title: "Instant Search",
    subtitle: "Fast suggestions across music catalogue",
  },
  {
    src: "/assets/screenshots/sec2/Screenshot_20261031-125213.png",
    alt: "App Configuration & Settings",
    title: "Sound Quality Preferences",
    subtitle: "Bitrate, equalizer and cache controls",
  },
];

const MUSIC_CATALOG_GENRES = [
  "Global Billboard & Top Hits",
  "Cultural & Regional Indian Folk",
  "Hip-Hop, Rap & Trap",
  "Electronic, Techno & House",
  "Indie, Alternative & Grunge",
  "Bollywood, Ghazal & Classical",
  "Lo-Fi, Chillhop & Study Beats",
  "Jazz, Blues & Soul",
  "Anime, Film & Gaming OSTs",
  "Acoustic, Piano & Strings",
  "Synthwave, Vaporwave & Retrowave",
  "Live Concerts & Audio Bootlegs",
];

export default function RedesignedLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedArch, setSelectedArch] = useState(ARCHITECTURE_LAYERS[0].id);
  const [selectedCapabilityTab, setSelectedCapabilityTab] = useState(
    CAPABILITY_CATEGORIES[0].id
  );
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(1);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      particleCount: 75,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#ffffff", "#cccccc", "#888888"],
    });
  };

  const currentArchLayer =
    ARCHITECTURE_LAYERS.find((a) => a.id === selectedArch) ||
    ARCHITECTURE_LAYERS[0];

  const currentCapabilityGroup =
    CAPABILITY_CATEGORIES.find((c) => c.id === selectedCapabilityTab) ||
    CAPABILITY_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-inter selection:bg-white selection:text-black antialiased">
      {/* =========================================================================
          MINIMAL HEADER
          ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-8 py-5 md:py-6 md:bg-transparent md:border-transparent ${
          mobileMenuOpen
            ? "bg-black/95 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-3">
            <Image
              src="/assets/bttune_logo.svg"
              alt="BTTUNE Logo"
              width={22}
              height={22}
              className="w-5 h-5 invert"
            />
            <span className="font-normal tracking-tight text-lg text-white">
              BTTUNE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-neutral-400">
            <a href="#hero" className="hover:text-white transition">
              Overview
            </a>
            <a href="#carousel-section" className="hover:text-white transition">
              Screenshots
            </a>
            <a href="#capabilities" className="hover:text-white transition">
              Features
            </a>
            <a href="#catalog-wheel" className="hover:text-white transition">
              Catalog
            </a>
            <a href="#architecture" className="hover:text-white transition">
              Architecture
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a
              href={APP_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <SpecularButton
              size="sm"
              radius={999}
              tint="#ffffff"
              tintOpacity={0.12}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#444444"
              intensity={1}
              idleIntensity={0.35}
              glow={0.8}
              onClick={() => {
                triggerDownloadCelebration();
                window.location.href = liveRelease.downloadUrl;
              }}
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Download
            </SpecularButton>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 text-sm font-normal text-neutral-300">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
              Overview
            </a>
            <a href="#carousel-section" onClick={() => setMobileMenuOpen(false)}>
              Screenshots
            </a>
            <a href="#capabilities" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#catalog-wheel" onClick={() => setMobileMenuOpen(false)}>
              Catalog
            </a>
            <a href="#architecture" onClick={() => setMobileMenuOpen(false)}>
              Architecture
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-normal"
            >
              Download APK
            </a>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 1: TEXT-ONLY HERO WITH <LightRays />
          ========================================================================= */}
      <section
        id="hero"
        className="relative w-full min-h-[95vh] flex items-center justify-center bg-black overflow-hidden px-8 pt-32 pb-24"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            glow={0.5}
            haze={0.2}
            followMouse={true}
            mouseInfluence={0.1}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <p className="text-sm font-normal text-neutral-400 tracking-widest uppercase mb-10">
            Android Music Client • Free & Open Source
          </p>

          <h1 className="text-huge-display text-white max-w-4xl tracking-tight mb-10">
            Sound Beyond Limits.
          </h1>

          <p className="text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed mb-14">
            An ad-free music streaming client engineered with Jetpack Compose, 8D Spatial Audio, millisecond syllable lyrics sync, and offline caching.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* SpecularButton from React Bits as Main CTA */}
            <SpecularButton
              size="lg"
              radius={999}
              tint="#ffffff"
              tintOpacity={0.08}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#444444"
              intensity={1}
              idleIntensity={0.4}
              glow={1}
              followMouse={true}
              proximity={220}
              onClick={() => {
                triggerDownloadCelebration();
                window.location.href = "#download";
              }}
            >
              <Download className="w-4 h-4" />
              <span>Download APK Free</span>
            </SpecularButton>

            <a
              href="#carousel-section"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-neutral-300 hover:text-white transition text-sm"
            >
              <span>Explore Preview</span>
              <ArrowRight className="w-4 h-4 text-neutral-500" />
            </a>
          </div>

          <div className="mt-24 flex flex-wrap items-center justify-center gap-10 text-xs font-normal text-neutral-500">
            <span>{downloadsCount} Active Installs</span>
            <span>Zero Telemetry</span>
            <span>320 kbps Studio Audio</span>
            <span>Android 8.0+</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ONLY MADE OF <FlexCarousel />
          Mobile: h-[100vh] viewport height | Desktop: escapeable on boundary wheel
          ========================================================================= */}
      <section
        id="carousel-section"
        className="w-full bg-black overflow-hidden relative h-[100dvh] md:h-[680px] flex items-center justify-center"
      >
        <div className="w-full h-full relative flex items-center justify-center">
          <FlexCarousel
            items={CAROUSEL_SCREENSHOTS}
            preset="liquid"
            intro="rise"
            cardHeight={0.65}
            gap={16}
            squeeze={0.15}
            focusOnClick={true}
            captions={true}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURES (WHITESPACE & AIRY)
          ========================================================================= */}
      <section id="capabilities" className="py-36 px-8 max-w-6xl mx-auto">
        <div className="mb-24">
          <p className="text-xs font-normal text-neutral-500 uppercase tracking-widest mb-3">
            Capabilities
          </p>
          <h2 className="text-huge-section text-white tracking-tight">
            Engineered for pure listening.
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 text-sm font-normal mb-16 border-b border-white/10 pb-4">
          {CAPABILITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCapabilityTab(cat.id)}
              className={`pb-4 -mb-[17px] transition-colors cursor-pointer ${
                selectedCapabilityTab === cat.id
                  ? "text-white border-b-2 border-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {currentCapabilityGroup.items.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <span className="text-xs font-mono text-neutral-500 uppercase">
                {item.badge}
              </span>
              <h3 className="text-xl font-normal text-white">{item.title}</h3>
              <p className="text-sm font-normal text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EVERY SONG IS AVAILABLE (FEATURING <OptionWheel />)
          Escapeable interactive catalog curve representing pop, cultural, folk, etc.
          ========================================================================= */}
      <section
        id="catalog-wheel"
        className="py-36 px-8 max-w-6xl mx-auto border-t border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-normal text-neutral-500 uppercase tracking-widest">
              Infinite Catalogue
            </p>
            <h2 className="text-huge-section text-white tracking-tight">
              Every song, dialect & genre.
            </h2>
            <p className="text-base font-normal text-neutral-400 leading-relaxed">
              From global billboard charts to intimate regional folk traditions, indie undergrounds, classical raagas, and lo-fi tapes — BTTUNE streams the entire YouTube Music catalog without geoblocks, paywalls, or restrictions.
            </p>

            <div className="pt-4 flex items-center gap-3 text-xs text-neutral-500">
              <Music2 className="w-4 h-4 text-white" />
              <span>Scroll or drag the wheel to explore genres</span>
            </div>
          </div>

          <div className="lg:col-span-7 h-[460px] w-full relative flex items-center justify-center">
            <OptionWheel
              items={MUSIC_CATALOG_GENRES}
              defaultSelected={selectedGenreIndex}
              onChange={(idx) => setSelectedGenreIndex(idx)}
              textColor="#555555"
              activeColor="#ffffff"
              side="left"
              fontSize={2.2}
              spacing={1.35}
              curve={1}
              tilt={6}
              blur={1.5}
              fade={0.28}
              smoothing={190}
              inset={30}
              loop={false}
              draggable={true}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ARCHITECTURE
          ========================================================================= */}
      <section id="architecture" className="py-36 px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="mb-24">
          <p className="text-xs font-normal text-neutral-500 uppercase tracking-widest mb-3">
            Architecture
          </p>
          <h2 className="text-huge-section text-white tracking-tight">
            Built from first principles.
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 text-sm font-normal mb-16 border-b border-white/10 pb-4">
          {ARCHITECTURE_LAYERS.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setSelectedArch(layer.id)}
              className={`pb-4 -mb-[17px] transition-colors cursor-pointer ${
                selectedArch === layer.id
                  ? "text-white border-b-2 border-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {layer.badge}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-2xl font-normal text-white">
              {currentArchLayer.title}
            </h3>
            <p className="text-base font-normal text-neutral-400 leading-relaxed max-w-2xl">
              {currentArchLayer.desc}
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-wider text-neutral-500">Highlights</p>
            <ul className="space-y-3 text-sm font-normal text-neutral-300">
              {currentArchLayer.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DOWNLOAD ZONE WITH SPECULAR BUTTON
          ========================================================================= */}
      <section id="download" className="py-36 px-8 max-w-4xl mx-auto text-center border-t border-white/5">
        <p className="text-xs font-normal text-neutral-500 uppercase tracking-widest mb-4">
          Release {liveRelease.version}
        </p>

        <h2 className="text-huge-section text-white tracking-tight mb-8">
          Get BTTUNE Free.
        </h2>

        <p className="text-base md:text-lg font-normal text-neutral-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Completely free, open source, and without advertisements. Choose your device architecture to start streaming.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm font-normal mb-10">
          <button
            onClick={() => setSelectedApkVariant("arm64")}
            className={`cursor-pointer transition-colors ${
              selectedApkVariant === "arm64"
                ? "text-white underline underline-offset-8"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            arm64-v8a ({liveRelease.arm64Size})
          </button>
          <span className="text-neutral-700">|</span>
          <button
            onClick={() => setSelectedApkVariant("universal")}
            className={`cursor-pointer transition-colors ${
              selectedApkVariant === "universal"
                ? "text-white underline underline-offset-8"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Universal ({liveRelease.universalSize})
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <SpecularButton
            size="lg"
            radius={999}
            tint="#ffffff"
            tintOpacity={0.08}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            idleIntensity={0.4}
            glow={1}
            followMouse={true}
            proximity={250}
            onClick={() => {
              triggerDownloadCelebration();
              window.location.href = liveRelease.downloadUrl;
            }}
          >
            <Download className="w-5 h-5" />
            <span>
              Download APK ({selectedApkVariant === "arm64" ? liveRelease.arm64Size : liveRelease.universalSize})
            </span>
          </SpecularButton>

          <a
            href={APP_CONFIG.releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition mt-4"
          >
            <span>GitHub Releases History</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: TEAM
          ========================================================================= */}
      <section id="team" className="py-36 px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="mb-24">
          <p className="text-xs font-normal text-neutral-500 uppercase tracking-widest mb-3">
            Open Source
          </p>
          <h2 className="text-huge-section text-white tracking-tight">
            The Contributors.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="space-y-4">
              <div className="w-14 h-14 rounded-full overflow-hidden grayscale">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-normal text-white">{member.name}</h3>
                <p className="text-xs font-normal text-neutral-500">{member.role}</p>
              </div>
              <p className="text-sm font-normal text-neutral-400 leading-relaxed">
                {member.bio}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-white transition"
                >
                  GitHub
                </a>
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-white transition"
                >
                  Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FAQ
          ========================================================================= */}
      <section id="faq" className="py-36 px-8 max-w-4xl mx-auto border-t border-white/5">
        <div className="mb-20">
          <p className="text-xs font-normal text-neutral-500 uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-huge-section text-white tracking-tight">
            Questions answered.
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {FAQ_ITEMS.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-6 cursor-pointer"
                >
                  <span className="text-lg font-normal text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-200 flex-shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <p className="mt-4 text-sm font-normal text-neutral-400 leading-relaxed pr-10">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="py-20 px-8 border-t border-white/5 text-xs font-normal text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>BTTUNE • Open source YouTube Music streaming for Android</div>
          <div className="flex items-center gap-8">
            <a href={APP_CONFIG.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition">
              GitHub
            </a>
            <a href={APP_CONFIG.releasesUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition">
              Releases
            </a>
            <a href={APP_CONFIG.authorUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition">
              Biswajit Tanti
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
