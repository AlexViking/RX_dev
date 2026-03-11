/* ═══════════════════════════════════════════════
   VIDEO HERO CONTROLLER
═══════════════════════════════════════════════ */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoHero);
  } else {
    initVideoHero();
  }

  function initVideoHero() {
    const video = document.getElementById('hero-video-morning');
    const heroSection = document.querySelector('.hero-video-section');

    if (!video || !heroSection) {
      console.warn('Video hero elements not found');
      return;
    }

    // ═══════════════ CONFIGURATION ═══════════════
    const CONFIG = {
      // Video Settings
      scrollPlayback: true,             // Enable scroll-based playback
      autoPlay: false,                   // Don't autoplay on load
      playbackRate: 1.0,                // Normal speed
      seekThreshold: 0.05,              // Only seek if difference > 0.05 seconds
      videoCompleteThreshold: 0.90,     // Video considered complete at 90% (adjust for longer videos)

      // Header Settings
      headerTransparentOnLoad: true,    // Start with transparent header
      headerShowAtScroll: 0.05,         // Show header after 5% scroll (0-1 range)

      // Text Fade Settings
      textFadeStart: 0.85,              // Text starts fading at 85% video progress
      textFadeComplete: 0.95,           // Text fully faded at 95%

      // Idle Animation
      idleAnimationEnabled: true,       // Show GIF when not scrolling
      idleAnimationDelay: 3000,         // Show after 3 seconds of no scroll

      // Background Music
      backgroundMusicEnabled: true,     // Enable background music
      backgroundMusicVolume: 0.3,       // Volume (0-1)
      backgroundMusicFadeOut: 2000      // Fade out duration in ms
    };

    // ═══════════════ ELEMENT REFERENCES ═══════════════
    const header = document.getElementById('site-header');
    const heroContent = document.querySelector('.hero-content-wrapper');
    const idleGif = document.getElementById('hero-idle-gif');
    const audioMorning = document.getElementById('hero-audio-morning');
    const audioEvening = document.getElementById('hero-audio-evening');

    // ═══════════════ STATE VARIABLES ═══════════════
    let isInitialized = false;
    let rafId = null;
    let lastScrollTime = Date.now();
    let isIdle = false;
    let idleTimeout = null;
    let currentAudio = null;

    /* ═══════════════════════════════════════════════
       HEADER TRANSPARENCY CONTROL
    ═══════════════════════════════════════════════ */
    function updateHeaderTransparency(scrollProgress) {
      if (!header || !CONFIG.headerTransparentOnLoad) return;

      if (scrollProgress >= CONFIG.headerShowAtScroll) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Set header transparent on load
    if (header && CONFIG.headerTransparentOnLoad) {
      header.classList.remove('scrolled');
    }

    /* ═══════════════════════════════════════════════
       TEXT FADE CONTROL
    ═══════════════════════════════════════════════ */
    function updateTextFade(scrollProgress) {
      if (!heroContent) return;

      if (scrollProgress < CONFIG.textFadeStart) {
        // Fully visible
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translate(-50%, -50%)';
      } else if (scrollProgress >= CONFIG.textFadeComplete) {
        // Fully faded
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translate(-50%, -60%)';
      } else {
        // Fading transition
        const fadeProgress = (scrollProgress - CONFIG.textFadeStart) / (CONFIG.textFadeComplete - CONFIG.textFadeStart);
        heroContent.style.opacity = (1 - fadeProgress).toString();
        heroContent.style.transform = `translate(-50%, ${-50 - (fadeProgress * 10)}%)`;
      }
    }

    /* ═══════════════════════════════════════════════
       IDLE ANIMATION CONTROL
    ═══════════════════════════════════════════════ */
    function showIdleAnimation() {
      if (!CONFIG.idleAnimationEnabled || !idleGif) return;
      if (window.scrollY > 10) return; // Only at top

      isIdle = true;
      idleGif.style.opacity = '1';
      idleGif.style.display = 'block';
      video.style.opacity = '0';
    }

    function hideIdleAnimation() {
      if (!idleGif) return;

      isIdle = false;
      idleGif.style.opacity = '0';
      setTimeout(() => {
        if (!isIdle) idleGif.style.display = 'none';
      }, 500);
      video.style.opacity = '1';
    }

    function resetIdleTimer() {
      lastScrollTime = Date.now();
      hideIdleAnimation();

      if (idleTimeout) clearTimeout(idleTimeout);

      if (CONFIG.idleAnimationEnabled && window.scrollY < 10) {
        idleTimeout = setTimeout(showIdleAnimation, CONFIG.idleAnimationDelay);
      }
    }

    /* ═══════════════════════════════════════════════
       BACKGROUND MUSIC CONTROL
    ═══════════════════════════════════════════════ */
    function startBackgroundMusic() {
      if (!CONFIG.backgroundMusicEnabled) return;

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const targetAudio = isDark ? audioEvening : audioMorning;

      if (!targetAudio) return;

      // Stop other audio
      if (currentAudio && currentAudio !== targetAudio) {
        fadeOutAudio(currentAudio);
      }

      currentAudio = targetAudio;
      targetAudio.volume = 0;
      targetAudio.loop = true;
      targetAudio.play().catch(err => {
        console.warn('Audio autoplay blocked:', err);
      });

      // Fade in
      fadeInAudio(targetAudio, CONFIG.backgroundMusicVolume);
    }

    function stopBackgroundMusic() {
      if (currentAudio) {
        fadeOutAudio(currentAudio);
      }
    }

    function fadeInAudio(audio, targetVolume) {
      if (!audio) return;
      let volume = 0;
      const step = targetVolume / 20;
      const interval = CONFIG.backgroundMusicFadeOut / 20;

      const fadeIn = setInterval(() => {
        volume += step;
        if (volume >= targetVolume) {
          audio.volume = targetVolume;
          clearInterval(fadeIn);
        } else {
          audio.volume = volume;
        }
      }, interval);
    }

    function fadeOutAudio(audio) {
      if (!audio) return;
      const step = audio.volume / 20;
      const interval = CONFIG.backgroundMusicFadeOut / 20;

      const fadeOut = setInterval(() => {
        if (audio.volume - step <= 0) {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeOut);
        } else {
          audio.volume -= step;
        }
      }, interval);
    }

    // Listen for theme changes to switch music and GIF
    const themeObserver = new MutationObserver(() => {
      // Update idle GIF source based on theme
      if (idleGif) {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const gifSrc = isDark ? 'assets/images/hero/idle-evening.gif' : 'assets/images/hero/idle-morning.gif';
        idleGif.src = gifSrc;
      }

      // Switch background music
      if (CONFIG.backgroundMusicEnabled && window.scrollY < window.innerHeight) {
        startBackgroundMusic();
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    /* ═══════════════════════════════════════════════
       THEME SWITCHING (Single video with color overlay)
    ═══════════════════════════════════════════════ */
    // Theme is handled by CSS overlay - no JS needed for switching

    /* ═══════════════════════════════════════════════
       SCROLL-BASED PLAYBACK (Scrubbing only, no autoplay)
    ═══════════════════════════════════════════════ */
    let isVideoComplete = false;

    function updateVideoPlayback() {
      if (!CONFIG.scrollPlayback) return;

      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      // Calculate scroll progress through the hero section
      const scrollProgress = Math.max(0, Math.min(scrollY / heroHeight, 1));

      // Check if video is complete (configurable threshold)
      isVideoComplete = scrollProgress >= CONFIG.videoCompleteThreshold;

      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        const duration = video.duration;
        const targetTime = scrollProgress * duration;

        // Only seek if there's a significant difference (prevents jitter)
        const timeDiff = Math.abs(video.currentTime - targetTime);
        if (timeDiff > CONFIG.seekThreshold) {
          video.currentTime = targetTime;
        }

        // ALWAYS KEEP VIDEO PAUSED - Only scrub with scroll
        if (!video.paused) {
          video.pause();
        }
      }

      // Update all scroll-based controls
      updateHeaderTransparency(scrollProgress);
      updateTextFade(scrollProgress);

      // Update body class for styling
      if (isVideoComplete) {
        document.body.classList.add('video-hero-complete');
      } else {
        document.body.classList.remove('video-hero-complete');
      }
    }

    // Throttled scroll handler using requestAnimationFrame
    let ticking = false;
    function handleScroll() {
      // Reset idle timer on scroll
      resetIdleTimer();

      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          updateVideoPlayback();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ═══════════════════════════════════════════════
       VIDEO INITIALIZATION
    ═══════════════════════════════════════════════ */
    function initializeVideo() {
      // Set playback rate
      video.playbackRate = CONFIG.playbackRate;

      // Ensure video is paused on load
      video.pause();

      // Preload video
      video.load();

      // Handle video ready state
      video.addEventListener('canplay', () => {
        if (!isInitialized) {
          isInitialized = true;
          console.log('Video hero initialized');

          // Ensure paused and set to beginning
          video.pause();
          video.currentTime = 0;

          // Trigger initial playback update based on scroll
          updateVideoPlayback();
        }
      }, { once: true });

      // Error handling
      video.addEventListener('error', () => {
        console.error('Video failed to load:', video.error);
      });

      // Prevent any autoplay attempts
      video.addEventListener('play', () => {
        // If we're at the top, pause it (no autoplay)
        if (window.scrollY === 0) {
          video.pause();
        }
      });
    }

    initializeVideo();

    /* ═══════════════════════════════════════════════
       INTERSECTION OBSERVER (Update when visible)
    ═══════════════════════════════════════════════ */
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hero is visible - update video position based on scroll
          updateVideoPlayback();

          // Start background music if at top of page
          if (window.scrollY < window.innerHeight && CONFIG.backgroundMusicEnabled) {
            startBackgroundMusic();
          }
        } else {
          // Hero is not visible - stop background music
          stopBackgroundMusic();
        }
      });
    }, {
      threshold: 0.1
    });

    heroObserver.observe(heroSection);

    /* ═══════════════════════════════════════════════
       INITIALIZATION
    ═══════════════════════════════════════════════ */
    // Start background music on load
    if (CONFIG.backgroundMusicEnabled) {
      startBackgroundMusic();
    }

    // Start idle timer
    resetIdleTimer();

    /* ═══════════════════════════════════════════════
       CLEANUP
    ═══════════════════════════════════════════════ */
    window.addEventListener('beforeunload', () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      heroObserver.disconnect();
    });

    /* ═══════════════════════════════════════════════
       PUBLIC API (for debugging)
    ═══════════════════════════════════════════════ */
    window.videoHero = {
      video,
      updatePlayback: updateVideoPlayback,
      config: CONFIG
    };
  }
})();
