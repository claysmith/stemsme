<script setup lang="ts">
import type { StemDef } from '../composables/useStemsStore'
import type { ChannelState } from '../composables/useAudioEngine'

const props = defineProps<{
  stem: StemDef
  channel: ChannelState
  activeSoloCount: number
}>()

const emit = defineEmits<{
  'update:volume': [id: string, volume: number]
  toggleSolo: [id: string]
  toggleMute: [id: string]
}>()

const faderEl = ref<HTMLElement | null>(null)
const isDragging = ref(false)

function startDrag(e: MouseEvent) {
  e.preventDefault()
  isDragging.value = true
  const rect = faderEl.value!.getBoundingClientRect()

  function onMove(me: MouseEvent) {
    const y = me.clientY - rect.top
    const normalized = 1 - Math.max(0, Math.min(1, y / rect.height))
    const vol = Math.round(normalized * 100) / 100
    emit('update:volume', props.stem.id, vol)
  }

  function onUp() {
    isDragging.value = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  onMove(e)
}
</script>

<template>
  <div class="channel" :class="{ dimmed: channel.solo && activeSoloCount > 0 && !channel.solo }">
    <div class="channel-top" :style="{ background: stem.color }">
      <span class="channel-name">{{ stem.name }}</span>
    </div>

    <div class="channel-body">
      <div class="fader-wrap">
        <div ref="faderEl" class="fader" @mousedown="startDrag">
          <div class="fader-track">
            <div class="fader-fill" :style="{ height: `${channel.volume * 100}%` }" />
          </div>
          <div class="fader-thumb" :style="{ bottom: `${channel.volume * 100}%` }" />
        </div>
        <span class="vol-label">{{ Math.round(channel.volume * 100) }}%</span>
      </div>

      <div class="buttons">
        <button
          class="btn-solo"
          :class="{ active: channel.solo }"
          @click="emit('toggleSolo', stem.id)"
          title="Solo"
        >
          S
        </button>
        <button
          class="btn-mute"
          :class="{ active: channel.mute }"
          @click="emit('toggleMute', stem.id)"
          title="Mute"
        >
          M
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.channel {
  display: flex;
  flex-direction: column;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #222;
  min-width: 90px;
  max-width: 90px;
  transition: opacity 0.15s;
}

.channel.dimmed {
  opacity: 0.35;
}

.channel-top {
  padding: 8px 6px;
  text-align: center;
}

.channel-name {
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.channel-body {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.fader-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.fader {
  width: 28px;
  height: 140px;
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

.buttons {
  display: flex;
  gap: 4px;
}

.btn-solo,
.btn-mute {
  width: 28px;
  height: 24px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 4px;
  border: 1px solid #333;
  background: transparent;
  color: #666;
  transition: all 0.1s;
}

.btn-solo.active {
  background: #eab308;
  color: #000;
  border-color: #eab308;
}

.btn-mute.active {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}
</style>
