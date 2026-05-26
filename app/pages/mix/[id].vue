<script setup lang="ts">
import type { Track } from '../../composables/useStemsStore'

const route = useRoute()
const router = useRouter()
const { getTrackById } = useStemsStore()
const engine = useAudioEngine()

const track = ref<Track | null>(null)

onMounted(async () => {
  const t = await getTrackById(route.params.id as string)
  if (t) {
    track.value = t
    engine.init(t.stems)
  }
})

onUnmounted(() => {
  engine.cleanup()
})

function handlePlay() {
  engine.play()
}

function handleStop() {
  engine.stop()
}

function handleVolume(stemId: string, volume: number) {
  engine.setVolume(stemId, volume)
}

function handleSolo(stemId: string) {
  engine.toggleSolo(stemId)
}

const masterFaderEl = ref<HTMLElement | null>(null)

function startMasterDrag(e: MouseEvent) {
  e.preventDefault()
  const rect = masterFaderEl.value!.getBoundingClientRect()

  function onMove(me: MouseEvent) {
    const y = me.clientY - rect.top
    const normalized = 1 - Math.max(0, Math.min(1, y / rect.height))
    engine.setMaster(Math.round(normalized * 100) / 100)
  }

  function onUp() {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  onMove(e)
}

function handleMute(stemId: string) {
  engine.toggleMute(stemId)
}
</script>

<template>
  <div class="mix-page" v-if="track">
    <div class="mix-header">
      <button class="btn-back" @click="router.push(`/track/${track.id}`)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back
      </button>
      <div class="mix-info">
        <h1>{{ track.title }}</h1>
        <span class="mix-artist">{{ track.artist }}</span>
        <span class="mix-meta">♩ {{ track.bpm }} · 🎹 {{ track.key }}</span>
      </div>
      <div class="transport">
        <button
          class="btn-play"
          :class="{ playing: engine.isPlaying.value }"
          @click="handlePlay"
          :title="engine.isPlaying.value ? 'Playing' : 'Play'"
        >
          <svg v-if="engine.isPlaying.value" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button class="btn-stop" @click="handleStop">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>
        </button>
      </div>
    </div>

    <div class="mixer">
      <MixerChannel
        v-for="stem in track.stems"
        :key="stem.id"
        :stem="stem"
        :channel="engine.controls[stem.id]"
        :active-solo-count="engine.activeSoloCount.value"
        @update:volume="handleVolume"
        @toggle-solo="handleSolo"
        @toggle-mute="handleMute"
      />

      <div class="master-channel">
        <div class="channel-top master-top">
          <span class="channel-name">Master</span>
        </div>
        <div class="channel-body">
          <div class="fader-wrap">
            <div ref="masterFaderEl" class="fader" @mousedown="startMasterDrag">
              <div class="fader-track">
                <div
                  class="fader-fill"
                  :style="{ height: `${engine.masterVolume.value * 100}%` }"
                />
              </div>
              <div
                class="fader-thumb master-thumb"
                :style="{ bottom: `${engine.masterVolume.value * 100}%` }"
              />
            </div>
            <span class="vol-label">{{ Math.round(engine.masterVolume.value * 100) }}%</span>
          </div>
          <div class="buttons" />
        </div>
      </div>
    </div>

    <div class="mix-tip">
      <p>Adjust the faders to mix. Click <strong>S</strong> to solo a stem, <strong>M</strong> to mute.</p>
    </div>
  </div>

  <div v-else class="not-found">
    <h2>Track not found</h2>
    <NuxtLink to="/browse" class="back-link">Browse tracks</NuxtLink>
  </div>
</template>

<style scoped>
.mix-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.mix-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #1f1f1f;
}

.btn-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  color: #888;
  transition: all 0.15s;
  flex-shrink: 0;
}

.btn-back:hover {
  background: #1a1a1a;
  color: #f5f5f5;
}

.mix-info {
  flex: 1;
  min-width: 0;
}

.mix-info h1 {
  font-size: 20px;
  font-weight: 600;
}

.mix-artist {
  font-size: 14px;
  color: #888;
  margin-right: 12px;
}

.mix-meta {
  font-size: 13px;
  color: #555;
}

.transport {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn-play,
.btn-stop {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.15s;
}

.btn-play {
  background: #7c3aed;
  color: #fff;
}

.btn-play:hover {
  background: #6d28d9;
}

.btn-play.playing {
  background: #eab308;
}

.btn-stop {
  background: #1a1a1a;
  color: #888;
  border: 1px solid #333;
}

.btn-stop:hover {
  background: #242424;
  color: #f5f5f5;
}

.mixer {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: 16px;
}

.master-channel {
  display: flex;
  flex-direction: column;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #7c3aed;
  min-width: 90px;
  max-width: 90px;
  flex-shrink: 0;
}

.master-top {
  background: #7c3aed;
  padding: 8px 6px;
  text-align: center;
}

.master-top .channel-name {
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  display: block;
}

.master-channel .channel-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  padding: 12px 8px;
}

.buttons {
  height: 24px;
}

.fader-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.master-thumb {
  background: #7c3aed !important;
}

.mix-tip {
  margin-top: 24px;
  padding: 14px 20px;
  background: #111;
  border-radius: 8px;
  border: 1px solid #1f1f1f;
  text-align: center;
}

.mix-tip p {
  font-size: 13px;
  color: #666;
}

.mix-tip strong {
  color: #aaa;
}

.not-found {
  text-align: center;
  padding: 80px 24px;
}

.not-found h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.fader {
  width: 28px;
  height: 139px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
}

.fader-track {
  width: 4px;
  height: 100%;
  background: #2a2a2a;
  border-radius: 2px;
  position: relative;
}

.fader-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #555;
  border-radius: 2px;
  pointer-events: none;
  transition: height 0.05s;
}

.fader-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #ccc;
  border-radius: 50%;
  margin-bottom: -8px;
  transition: bottom 0.05s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.fader-thumb:hover {
  background: #eee;
}

.vol-label {
  font-size: 10px;
  color: #666;
  font-variant-numeric: tabular-nums;
}
</style>
