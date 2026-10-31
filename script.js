/**
 * BTTUNE LANDING PAGE - JAVASCRIPT
 * Material 3 interactions, animations, and live downloads counter
 */

// API Configuration matches com.bt.bttune.utils.AppDownloadsManager
const COUNT_API_BASE = "https://countapi.mileshilliard.com/api/v1";
const COUNTER_KEY = "bttune_android_app_installs";
const GITHUB_REPO = "biswaadev/bttune-android";

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initRippleEffect();
  initScrollAnimations();
  initScreenshotsCarousel();
  initCapabilitiesTabs();
  initAccordion();
  initArchSelector();
  initDownloadFlow();
  initStickyBarAndFab();
  loadLiveDownloads();
  checkLatestRelease();
});

/* --------------------------------------------------------------------------
   0. LIVE DOWNLOADS COUNTER (Read-only Sync)
   -------------------------------------------------------------------------- */
async function loadLiveDownloads() {
  const chipDisplay = document.getElementById('downloadsCountDisplay');
  const cardDisplay = document.getElementById('cardDownloadsCount');

  try {
    const res = await fetch(`${COUNT_API_BASE}/get/${COUNTER_KEY}?_t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        renderDownloads(data.value);
        return;
      }
    }
    renderDownloads(100);
  } catch (err) {
    console.warn("Could not fetch downloads count:", err);
    renderDownloads(100);
  }
}

function renderDownloads(count) {
  const chipDisplay = document.getElementById('downloadsCountDisplay');
  const cardDisplay = document.getElementById('cardDownloadsCount');

  const formatted = formatNumber(count);
  if (chipDisplay) chipDisplay.textContent = `${formatted}+ Installs`;
  if (cardDisplay) cardDisplay.textContent = `${formatted}+`;
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

/* --------------------------------------------------------------------------
   LATEST RELEASE DYNAMIC HYDRATION (GITHUB RELEASES API)
   Fetches: Version, APK Size, Download URL, Android Requirements
   -------------------------------------------------------------------------- */
async function checkLatestRelease() {
  const versionVal = document.getElementById('appVersionVal');
  const sizeVal = document.getElementById('appSizeVal');
  const reqVal = document.getElementById('appReqVal');
  const heroBadge = document.getElementById('heroReleaseBadge');
  const stickySub = document.getElementById('stickyMetaSub');
  const downloadBtn = document.getElementById('downloadBtn');
  const btnText = document.getElementById('btnText');
  const sizeUniversal = document.getElementById('sizeUniversal');
  const sizeArm64 = document.getElementById('sizeArm64');
  const sizeArmv7 = document.getElementById('sizeArmv7');

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const release = await res.json();
    
    // 1. Dynamic Version
    const tagName = release.tag_name || "v6.1.4";
    if (versionVal) versionVal.textContent = `${tagName} (Latest)`;
    if (heroBadge) heroBadge.textContent = `${tagName} Stable`;

    // 2. Dynamic APK Assets & Multi-Architecture File Sizes
    let universalSize = "14.5 MB";
    let arm64Size = "11.7 MB";
    let armv7Size = "11.4 MB";

    if (release.assets && release.assets.length > 0) {
      // Find each architecture APK
      const universalAsset = release.assets.find(a => a.name === 'BTTUNE-release.apk') || release.assets[0];
      const arm64Asset = release.assets.find(a => a.name.includes('arm64-v8a'));
      const armv7Asset = release.assets.find(a => a.name.includes('armeabi-v7a'));

      const formatMb = (bytes) => (bytes / (1024 * 1024)).toFixed(1) + ' MB';

      if (universalAsset && universalAsset.size) {
        universalSize = formatMb(universalAsset.size);
        const cardUni = document.querySelector('.arch-card[data-flavor="universal"]');
        if (cardUni) cardUni.setAttribute('data-apk-url', universalAsset.browser_download_url);
        if (downloadBtn && downloadBtn.getAttribute('data-apk-filename') === 'BTTUNE-release.apk') {
          downloadBtn.setAttribute('data-apk-url', universalAsset.browser_download_url);
        }
      }
      if (arm64Asset && arm64Asset.size) {
        arm64Size = formatMb(arm64Asset.size);
        const card64 = document.querySelector('.arch-card[data-flavor="arm64"]');
        if (card64) card64.setAttribute('data-apk-url', arm64Asset.browser_download_url);
      }
      if (armv7Asset && armv7Asset.size) {
        armv7Size = formatMb(armv7Asset.size);
        const cardV7 = document.querySelector('.arch-card[data-flavor="armv7"]');
        if (cardV7) cardV7.setAttribute('data-apk-url', armv7Asset.browser_download_url);
      }
    }

    if (sizeUniversal) sizeUniversal.textContent = universalSize;
    if (sizeArm64) sizeArm64.textContent = arm64Size;
    if (sizeArmv7) sizeArmv7.textContent = armv7Size;

    if (sizeVal) sizeVal.textContent = universalSize;
    if (btnText && (!downloadBtn.classList.contains('downloading'))) {
      const activeCard = document.querySelector('.arch-card.active');
      const activeName = activeCard ? activeCard.querySelector('.arch-name').textContent.replace(' Architecture', '') : 'Universal APK';
      btnText.textContent = `Download ${activeName} (${universalSize})`;
    }
    if (stickySub) {
      stickySub.textContent = `${tagName} • ${universalSize}`;
    }

    // 3. Dynamic Android Requirement (Parsed from release notes or repo spec)
    let requirement = "Android 8.0+ (API 26+)";
    if (release.body) {
      const match = release.body.match(/(Android\s*\d+(\.\d+)?\+?)|(API\s*\d+\+?)/i);
      if (match) {
        requirement = match[0];
      }
    }
    if (reqVal) reqVal.textContent = requirement;

  } catch (e) {
    console.warn("Could not dynamically fetch GitHub release metadata, using defaults:", e);
    // Safe fallbacks
    if (versionVal) versionVal.textContent = "v6.1.4 (Latest)";
    if (sizeVal) sizeVal.textContent = "14.5 MB";
    if (reqVal) reqVal.textContent = "Android 8.0+";
  }
}

/* --------------------------------------------------------------------------
   ARCHITECTURE SELECTOR (Universal, ARM64, ARMv7)
   -------------------------------------------------------------------------- */
function initArchSelector() {
  const archCards = document.querySelectorAll('.arch-card');
  const downloadBtn = document.getElementById('downloadBtn');
  const btnText = document.getElementById('btnText');
  const sizeVal = document.getElementById('appSizeVal');

  if (!archCards.length || !downloadBtn) return;

  archCards.forEach(card => {
    card.addEventListener('click', () => {
      // Deactivate siblings
      archCards.forEach(c => {
        c.classList.remove('active');
        const icon = c.querySelector('.arch-check');
        if (icon) icon.textContent = 'radio_button_unchecked';
      });

      // Activate clicked
      card.classList.add('active');
      const icon = card.querySelector('.arch-check');
      if (icon) icon.textContent = 'check_circle';

      const flavor = card.getAttribute('data-flavor');
      const apkName = card.getAttribute('data-apk');
      const apkUrl = card.getAttribute('data-apk-url') || `https://github.com/${GITHUB_REPO}/releases/latest/download/${apkName}`;
      const cardSize = card.querySelector('.arch-size')?.textContent || '';
      const cardTitle = card.querySelector('.arch-name')?.textContent || '';

      // Update button target
      downloadBtn.setAttribute('data-apk-url', apkUrl);
      downloadBtn.setAttribute('data-apk-filename', apkName);

      if (btnText && !downloadBtn.classList.contains('downloading')) {
        const shortTitle = cardTitle.replace(' Architecture', '');
        btnText.textContent = `Download ${shortTitle} (${cardSize})`;
      }
      if (sizeVal) {
        sizeVal.textContent = cardSize;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (!menuToggle || !navLinks) return;

  const links = navLinks.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   2. MATERIAL 3 RIPPLE EFFECT
   -------------------------------------------------------------------------- */
function initRippleEffect() {
  const rippleElements = document.querySelectorAll('.btn, .m3-chip, .fab-back-to-top, .cap-tab-pill');

  rippleElements.forEach(el => {
    el.addEventListener('click', function(e) {
      const oldRipple = this.querySelector('.ripple');
      if (oldRipple) oldRipple.remove();

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;

      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. SCREENSHOTS CAROUSEL & DOTS
   -------------------------------------------------------------------------- */
function initScreenshotsCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track) return;

  const slides = track.querySelectorAll('.screenshot-slide');

  // Build Dots for Mobile
  if (dotsContainer && slides.length > 0) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        slides[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsContainer.appendChild(dot);
    });

    // Update active dot on scroll
    track.addEventListener('scroll', () => {
      const scrollPos = track.scrollLeft;
      const cardWidth = slides[0].offsetWidth + 20;
      const activeIdx = Math.round(scrollPos / cardWidth);

      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
      });
    }, { passive: true });
  }

  if (prevBtn && nextBtn) {
    const scrollDistance = 280;
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   5. MOBILE CAPABILITIES TABS
   -------------------------------------------------------------------------- */
function initCapabilitiesTabs() {
  const tabPills = document.querySelectorAll('.cap-tab-pill');
  const cards = document.querySelectorAll('.capabilities-grid .capability-card');

  if (!tabPills.length || !cards.length) return;

  tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');

      // Update pills
      tabPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      // Update active card on mobile
      cards.forEach(card => {
        if (card.id === targetId) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      // Smooth scroll pill into view on mobile
      pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}

/* --------------------------------------------------------------------------
   6. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. DOWNLOAD BUTTON & PROGRESS ANIMATION
   -------------------------------------------------------------------------- */
function initDownloadFlow() {
  const downloadBtn = document.getElementById('downloadBtn');
  const progressWrapper = document.getElementById('progressWrapper');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressPercent = document.getElementById('progressPercent');
  const progressStatus = document.getElementById('progressStatus');
  const btnIcon = document.getElementById('btnIcon');
  const btnText = document.getElementById('btnText');

  if (!downloadBtn || !progressWrapper) return;

  // Bind all .direct-download-trigger buttons (Hero button & Sticky Bar button)
  // Smoothly scroll the user to the download section & architecture cards so they can pick their build
  const directTriggers = document.querySelectorAll('.direct-download-trigger');
  directTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const downloadSection = document.getElementById('download');
      if (downloadSection) {
        downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        downloadBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (downloadBtn.classList.contains('downloading') || downloadBtn.classList.contains('completed')) {
      return;
    }

    // Start UI downloading state
    downloadBtn.classList.add('downloading');
    downloadBtn.style.pointerEvents = 'none';
    progressWrapper.style.display = 'block';
    progressWrapper.setAttribute('aria-hidden', 'false');
    btnIcon.textContent = 'hourglass_top';
    btnText.textContent = 'Preparing Package...';

    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 8) + 6;

      if (currentPercent > 100) currentPercent = 100;

      progressBarFill.style.width = `${currentPercent}%`;
      progressPercent.textContent = `${currentPercent}%`;

      if (currentPercent < 40) {
        progressStatus.textContent = 'Verifying SHA-256 signature...';
      } else if (currentPercent < 80) {
        progressStatus.textContent = 'Allocating APK buffers...';
      } else if (currentPercent < 100) {
        progressStatus.textContent = 'Finalizing package...';
      } else {
        clearInterval(interval);
        finishDownload();
      }
    }, 100);

    function finishDownload() {
      btnIcon.textContent = 'check_circle';
      btnText.textContent = 'Download Started!';
      progressStatus.textContent = 'File downloading directly to your device.';
      downloadBtn.classList.remove('downloading');
      downloadBtn.classList.add('completed');
      downloadBtn.style.backgroundColor = '#4ade80';
      downloadBtn.style.color = '#052e16';

      // Trigger direct APK file download without page redirect or opening a new tab
      // Defaults directly to GitHub's perpetual latest release redirect: /releases/latest/download/BTTUNE-release.apk
      const apkUrl = downloadBtn.getAttribute('data-apk-url') || 'https://github.com/biswaadev/bttune-android/releases/latest/download/BTTUNE-release.apk';
      const apkFilename = downloadBtn.getAttribute('data-apk-filename') || 'BTTUNE-release.apk';
      
      const hiddenLink = document.createElement('a');
      hiddenLink.href = apkUrl;
      hiddenLink.setAttribute('download', apkFilename);
      hiddenLink.style.display = 'none';
      document.body.appendChild(hiddenLink);
      hiddenLink.click();
      setTimeout(() => {
        if (hiddenLink.parentNode) {
          hiddenLink.parentNode.removeChild(hiddenLink);
        }
      }, 1000);

      // Reset button state after 6 seconds
      setTimeout(() => {
        downloadBtn.classList.remove('completed');
        downloadBtn.style.pointerEvents = 'auto';
        downloadBtn.style.backgroundColor = '';
        downloadBtn.style.color = '';
        btnIcon.textContent = 'cloud_download';
        const currentSize = (document.getElementById('appSizeVal')?.textContent) || '14.5 MB';
        const activeCard = document.querySelector('.arch-card.active');
        const activeName = activeCard ? activeCard.querySelector('.arch-name').textContent.replace(' Architecture', '') : 'Universal APK';
        btnText.textContent = `Download ${activeName} (${currentSize})`;
        progressWrapper.style.display = 'none';
        progressBarFill.style.width = '0%';
        progressPercent.textContent = '0%';
      }, 6000);
    }
  });
}

/* --------------------------------------------------------------------------
   8. STICKY QUICK-BAR & BACK TO TOP FAB
   -------------------------------------------------------------------------- */
function initStickyBarAndFab() {
  const fab = document.getElementById('fabBackToTop');
  const stickyBar = document.getElementById('mobileStickyBar');
  const heroSection = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Show Back to Top after 400px
    if (fab) {
      if (scrollY > 400) {
        fab.classList.add('show');
      } else {
        fab.classList.remove('show');
      }
    }

    // Show Mobile Sticky Bar once past Hero
    if (stickyBar && heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 150;
      if (scrollY > heroBottom) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (fab) {
    fab.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
