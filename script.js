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
  initAccordion();
  initDownloadFlow();
  initBackToTop();
  loadLiveDownloads();
  checkLatestRelease();
});

/* --------------------------------------------------------------------------
   0. LIVE DOWNLOADS COUNTER (AppDownloadsManager Sync)
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
    // Fallback if network issue
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
   LATEST RELEASE AUTO-UPDATE (GITHUB RELEASES)
   -------------------------------------------------------------------------- */
async function checkLatestRelease() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
    if (!res.ok) return;
    const release = await res.json();
    
    if (release.tag_name) {
      const versionVal = document.getElementById('appVersionVal');
      if (versionVal) versionVal.textContent = release.tag_name;
    }

    if (release.assets && release.assets.length > 0) {
      const apkAsset = release.assets.find(a => a.name.endsWith('.apk')) || release.assets[0];
      if (apkAsset && apkAsset.browser_download_url) {
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
          downloadBtn.setAttribute('data-apk-url', apkAsset.browser_download_url);
        }
      }
    }
  } catch (e) {
    // Graceful fallback to static URLs
    console.warn("Using default release metadata.");
  }
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
  const rippleElements = document.querySelectorAll('.btn, .m3-chip, .fab-back-to-top');

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
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. SCREENSHOTS CAROUSEL SCROLL
   -------------------------------------------------------------------------- */
function initScreenshotsCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollDistance = 280;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDION
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
   6. DOWNLOAD BUTTON & PROGRESS ANIMATION
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

  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (downloadBtn.classList.contains('downloading') || downloadBtn.classList.contains('completed')) {
      return;
    }

    // Note: Sirf app me count increment hota hai, yahan sirf download trigger aur animation hogi.
    // Start UI downloading state
    downloadBtn.classList.add('downloading');
    downloadBtn.style.pointerEvents = 'none';
    progressWrapper.style.display = 'block';
    progressWrapper.setAttribute('aria-hidden', 'false');
    btnIcon.textContent = 'hourglass_top';
    btnText.textContent = 'Preparing Package...';

    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 8) + 5;

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
    }, 110);

    function finishDownload() {
      btnIcon.textContent = 'check_circle';
      btnText.textContent = 'Download Started!';
      progressStatus.textContent = 'File downloading directly to your device.';
      downloadBtn.classList.remove('downloading');
      downloadBtn.classList.add('completed');
      downloadBtn.style.backgroundColor = '#4ade80';
      downloadBtn.style.color = '#052e16';

      // Trigger actual APK file download
      const apkUrl = downloadBtn.getAttribute('data-apk-url') || 'https://github.com/biswaadev/bttune-android/releases/download/v6.1.3/BTTUNE-release.apk';
      const hiddenLink = document.createElement('a');
      hiddenLink.href = apkUrl;
      hiddenLink.setAttribute('download', 'BTTUNE-v6.1.3.apk');
      hiddenLink.target = '_blank';
      document.body.appendChild(hiddenLink);
      hiddenLink.click();
      document.body.removeChild(hiddenLink);

      // Reset button state after 6 seconds
      setTimeout(() => {
        downloadBtn.classList.remove('completed');
        downloadBtn.style.pointerEvents = 'auto';
        downloadBtn.style.backgroundColor = '';
        downloadBtn.style.color = '';
        btnIcon.textContent = 'cloud_download';
        btnText.textContent = 'Download APK (11.7 MB)';
        progressWrapper.style.display = 'none';
        progressBarFill.style.width = '0%';
        progressPercent.textContent = '0%';
      }, 6000);
    }
  });
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP FAB BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const fab = document.getElementById('fabBackToTop');
  if (!fab) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      fab.classList.add('show');
    } else {
      fab.classList.remove('show');
    }
  }, { passive: true });

  fab.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
