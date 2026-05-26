<template>
  <div class="landing">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">Open Source</div>
        <h1 class="hero-title">
          Your stems.<br />
          <span class="gradient">Their mix.</span>
        </h1>
        <p class="hero-sub">
          A platform where artists host their stems, fans mix them in the browser,
          and everyone shares in the music.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/browse" class="btn btn-primary">
            Browse Stems
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
          <NuxtLink to="/upload" class="btn btn-secondary">
            Start Selling
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="feature">
        <div class="feature-icon">🎨</div>
        <h3>For Artists</h3>
        <p>Upload your multitrack stems, set your price, and reach fans who want to remix and learn from your work.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🎛️</div>
        <h3>For Fans</h3>
        <p>Solo the vocals. Mute the guitar. Pull down the drums. Experience every song as a hands-on mix session in your browser.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">💰</div>
        <h3>Sell Stems</h3>
        <p>Turn your production into a product. Every stem pack is a new revenue stream for your music.</p>
      </div>
    </section>

    <section class="demo">
      <h2>How it works</h2>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <h4>Artists upload</h4>
          <p>Drag-and-drop your multitrack project. Name each stem, pick a color, set your price.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-num">2</div>
          <h4>Fans mix</h4>
          <p>Open any track in the web mixer. Adjust faders, solo channels, mute parts — like having the multitrack in your DAW.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-num">3</div>
          <h4>Everyone wins</h4>
          <p>Fans buy the stems they love. Artists get paid. The community grows.</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>stems.me — open source stem platform</p>
      <a href="https://github.com/stemsme/stems.me" target="_blank">GitHub</a>
    </footer>
  </div>
</template>

<style scoped>
.landing {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero {
  padding: 100px 0 80px;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 20px;
}

.gradient {
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 18px;
  color: #888;
  max-width: 520px;
  margin: 0 auto 36px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.15s;
}

.btn-primary {
  background: #7c3aed;
  color: #fff;
}

.btn-primary:hover {
  background: #6d28d9;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #1a1a1a;
  color: #f5f5f5;
  border: 1px solid #333;
}

.btn-secondary:hover {
  background: #242424;
  border-color: #555;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 60px 0;
  border-top: 1px solid #1f1f1f;
}

.feature {
  padding: 24px;
  border-radius: 12px;
  background: #111;
  border: 1px solid #1f1f1f;
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature p {
  font-size: 14px;
  color: #888;
  line-height: 1.6;
}

.demo {
  padding: 60px 0;
  border-top: 1px solid #1f1f1f;
}

.demo h2 {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 48px;
}

.steps {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.step {
  flex: 1;
  text-align: center;
  padding: 24px;
}

.step-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #7c3aed;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.step h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.step p {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
}

.step-arrow {
  font-size: 28px;
  color: #444;
  padding-top: 52px;
  flex-shrink: 0;
}

.footer {
  padding: 32px 0;
  border-top: 1px solid #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #555;
}

.footer a {
  color: #888;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  .features {
    grid-template-columns: 1fr;
  }
  .steps {
    flex-direction: column;
    align-items: center;
  }
  .step-arrow {
    transform: rotate(90deg);
    padding-top: 0;
  }
}
</style>
