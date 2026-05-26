<script setup lang="ts">
import type { Track } from '../composables/useStemsStore'

defineProps<{
  track: Track
}>()
</script>

<template>
  <NuxtLink :to="`/track/${track.id}`" class="track-card">
    <div class="artwork-wrapper">
      <img :src="track.artwork" :alt="track.title" loading="lazy" />
      <div class="play-hint">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="pointer-events: none">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
    <div class="info">
      <h3 class="title">{{ track.title }}</h3>
      <p class="artist">{{ track.artist }}</p>
      <div class="meta">
        <span class="stem-count">{{ track.stems.length }} stems</span>
        <span class="dot">·</span>
        <span class="genre">{{ track.genre }}</span>
        <span class="dot">·</span>
        <span class="price">${{ Number(track.price).toFixed(2) }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.track-card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background: #141414;
  border: 1px solid #1f1f1f;
  transition: all 0.2s;
}

.track-card:hover {
  border-color: #333;
  transform: translateY(-2px);
}

.artwork-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.artwork-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.track-card:hover .artwork-wrapper img {
  transform: scale(1.05);
}

.play-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s;
}

.track-card:hover .play-hint {
  opacity: 1;
}

.info {
  padding: 14px;
}

.title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artist {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}

.dot {
  color: #444;
}

.price {
  color: #a78bfa;
  font-weight: 500;
}
</style>
