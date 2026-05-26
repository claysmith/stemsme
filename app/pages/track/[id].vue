<script setup lang="ts">
import type { Track } from '../../composables/useStemsStore'

const route = useRoute()
const { getTrackById } = useStemsStore()
const track = ref<Track | null>(null)
const checkoutLoading = ref(false)
const purchased = ref(false)
const checkoutError = ref('')

onMounted(async () => {
  track.value = (await getTrackById(route.params.id as string)) ?? null

  if (route.query.purchased === 'true') {
    purchased.value = true
    setTimeout(() => { purchased.value = false }, 5000)
  }
})

async function handleBuy() {
  if (!track.value) return
  checkoutLoading.value = true
  checkoutError.value = ''
  try {
    const { url } = await $fetch<{ url: string }>('/api/stripe-checkout', {
      method: 'POST',
      body: {
        trackId: track.value.id,
        title: track.value.title,
        price: track.value.price,
      },
    })
    window.location.href = url
  } catch (e: any) {
    checkoutError.value = e?.data?.message || e?.message || 'Checkout failed. Please try again.'
  } finally {
    checkoutLoading.value = false
  }
}
</script>

<template>
  <div class="track-page" v-if="track">
    <div v-if="purchased" class="success-banner">
      Purchase successful! You now own the stems for this track.
    </div>

    <NuxtLink to="/browse" class="back-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="pointer-events: none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to browse
    </NuxtLink>

    <div class="track-layout">
      <div class="track-artwork">
        <img :src="track.artwork" :alt="track.title" />
      </div>
      <div class="track-info">
        <div class="genre-tag">{{ track.genre }}</div>
        <h1>{{ track.title }}</h1>
        <p class="artist-name">{{ track.artist }}</p>
        <p class="description">{{ track.description }}</p>
        <div class="track-meta">
          <span>♩ {{ track.bpm }} BPM</span>
          <span>🎹 {{ track.key }}</span>
          <span>📦 {{ track.stems.length }} stems</span>
        </div>
        <div class="price-tag">${{ Number(track.price).toFixed(2) }}</div>
        <div class="track-actions">
          <NuxtLink :to="`/mix/${track.id}`" class="btn-mix">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="pointer-events: none"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/></svg>
            Open Mixer
          </NuxtLink>
          <button class="btn-buy" :disabled="checkoutLoading" @click="handleBuy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
            {{ checkoutLoading ? 'Redirecting...' : 'Buy Stems' }}
          </button>
          <p v-if="checkoutError" class="checkout-error">{{ checkoutError }}</p>
        </div>
      </div>
    </div>

    <div class="stems-section">
      <h2>Stems</h2>
      <div class="stems-list">
        <div
          v-for="stem in track.stems"
          :key="stem.id"
          class="stem-item"
          :style="{ borderLeftColor: stem.color }"
        >
          <div class="stem-wave-icon" :style="{ color: stem.color }">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 12h2l2-5 2 10 2-8 2 6 2-4 2 3 2-2 2 2" />
            </svg>
          </div>
          <div class="stem-info">
            <span class="stem-name">{{ stem.name }}</span>
            <span class="stem-detail">{{ stem.fileUrl ? 'Audio file' : `${stem.waveform} · ${stem.frequency}Hz` }}</span>
          </div>
        </div>
      </div>
    </div>

    <NuxtLink :to="`/mix/${track.id}`" class="btn-mix-bottom">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="pointer-events: none"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/></svg>
      Mix This Track
    </NuxtLink>
  </div>

  <div v-else class="not-found">
    <h2>Track not found</h2>
    <NuxtLink to="/browse" class="back-link">Browse tracks</NuxtLink>
  </div>
</template>

<style scoped>
.track-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

.success-banner {
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #4ade80;
  font-size: 14px;
  font-weight: 500;
}

.checkout-error {
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #888;
  margin-bottom: 24px;
  transition: color 0.15s;
}

.back-link:hover {
  color: #f5f5f5;
}

.track-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 40px;
  margin-bottom: 48px;
}

.track-artwork img {
  width: 100%;
  border-radius: 12px;
  aspect-ratio: 1;
  object-fit: cover;
}

.track-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.genre-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
}

.track-info h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
}

.artist-name {
  font-size: 18px;
  color: #888;
}

.description {
  font-size: 14px;
  color: #888;
  line-height: 1.6;
  margin-top: 4px;
}

.track-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.price-tag {
  font-size: 28px;
  font-weight: 700;
  color: #a78bfa;
  margin-top: 8px;
}

.track-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.btn-mix,
.btn-buy {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.15s;
}

.btn-mix {
  background: #7c3aed;
  color: #fff;
}

.btn-mix:hover {
  background: #6d28d9;
}

.btn-buy {
  background: #1a1a1a;
  color: #f5f5f5;
  border: 1px solid #333;
}

.btn-buy:hover:not(:disabled) {
  background: #242424;
  border-color: #555;
}

.btn-buy:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stems-section {
  border-top: 1px solid #1f1f1f;
  padding-top: 32px;
}

.stems-section h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.stems-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.stem-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #111;
  border-radius: 8px;
  border-left: 3px solid;
  border-top: 1px solid #1f1f1f;
  border-right: 1px solid #1f1f1f;
  border-bottom: 1px solid #1f1f1f;
}

.stem-wave-icon {
  flex-shrink: 0;
  display: flex;
}

.stem-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.stem-name {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stem-detail {
  font-size: 11px;
  color: #666;
  text-transform: capitalize;
}

.btn-mix-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  margin-top: 32px;
  border-radius: 10px;
  background: #7c3aed;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.15s;
}

.btn-mix-bottom:hover {
  background: #6d28d9;
}

.not-found {
  text-align: center;
  padding: 80px 24px;
}

.not-found h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

@media (max-width: 700px) {
  .track-layout {
    grid-template-columns: 1fr;
  }
  .track-artwork {
    max-width: 280px;
  }
}
</style>
