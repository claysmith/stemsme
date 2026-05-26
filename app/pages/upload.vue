<script setup lang="ts">
import type { StemDef } from '../composables/useStemsStore'

const { addTrack } = useStemsStore()
const router = useRouter()
const submitting = ref(false)

const title = ref('')
const artist = ref('')
const artwork = ref('')
const price = ref<number>(9.99)
const description = ref('')
const bpm = ref<number>(120)
const key = ref('C')
const genre = ref('')
const stems = ref<Omit<StemDef, 'id'>[]>([
  { name: 'Drums', color: '#ef4444', frequency: 60, waveform: 'sawtooth' },
  { name: 'Bass', color: '#f97316', frequency: 110, waveform: 'sawtooth' },
  { name: 'Keys', color: '#3b82f6', frequency: 261.63, waveform: 'triangle' },
  { name: 'Lead', color: '#a855f7', frequency: 523.25, waveform: 'sawtooth' },
])

const uploading = ref<Record<number, boolean>>({})

async function uploadFile(index: number, file: File) {
  uploading.value[index] = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    const { url } = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: formData,
    })
    stems.value[index].fileUrl = url
  } catch (e) {
    console.error('Upload failed', e)
  } finally {
    uploading.value[index] = false
  }
}

const stemColors = ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#eab308']

function addStem() {
  stems.value.push({
    name: '',
    color: stemColors[stems.value.length % stemColors.length],
    frequency: 200 + stems.value.length * 100,
    waveform: 'sine',
  })
}

function removeStem(index: number) {
  stems.value.splice(index, 1)
}

async function handleSubmit() {
  if (!title.value || !artist.value || stems.value.some((s) => !s.name)) {
    return
  }
  submitting.value = true
  try {
    const created = await addTrack({
      title: title.value,
      artist: artist.value,
      artwork: artwork.value,
      price: price.value,
      description: description.value,
      bpm: bpm.value,
      key: key.value,
      genre: genre.value,
      stems: stems.value,
    })
    router.push(`/track/${created.id}`)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="upload-page">
    <div class="upload-card">
      <h1>Upload Stems</h1>
      <p class="sub">Create a stem pack for fans to mix and buy</p>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-grid">
          <div class="field">
            <label>Track Title *</label>
            <input v-model="title" type="text" placeholder="e.g. Neon Dreams" />
          </div>
          <div class="field">
            <label>Artist Name *</label>
            <input v-model="artist" type="text" placeholder="e.g. Synthwave Kid" />
          </div>
          <div class="field">
            <label>Artwork URL</label>
            <input v-model="artwork" type="url" placeholder="https://..." />
          </div>
          <div class="field">
            <label>Price ($)</label>
            <input v-model.number="price" type="number" min="0" step="0.01" />
          </div>
          <div class="field">
            <label>BPM</label>
            <input v-model.number="bpm" type="number" min="20" max="300" />
          </div>
          <div class="field">
            <label>Key</label>
            <input v-model="key" type="text" placeholder="e.g. Am, C, F#m" />
          </div>
          <div class="field">
            <label>Genre</label>
            <input v-model="genre" type="text" placeholder="e.g. Synthwave" />
          </div>
        </div>

        <div class="field">
          <label>Description</label>
          <textarea v-model="description" placeholder="Describe your track..." rows="3" />
        </div>

        <div class="stems-section">
          <div class="stems-header">
            <h2>Stems</h2>
            <button type="button" class="btn-add-stem" @click="addStem">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg>
              Add Stem
            </button>
          </div>

          <div class="stems-list">
            <div v-for="(stem, i) in stems" :key="i" class="stem-row">
              <div class="stem-color" :style="{ background: stem.color }" />
              <div class="stem-field">
                <label>Name *</label>
                <input v-model="stem.name" type="text" :placeholder="`Stem ${i + 1}`" />
              </div>
              <div class="stem-field stem-file">
                <label>Audio File</label>
                <div class="file-input-wrap">
                  <input
                    type="file"
                    accept=".mp3,.wav"
                    :disabled="uploading[i]"
                    @change="(e: Event) => {
                      const target = e.target as HTMLInputElement
                      const file = target.files?.[0]
                      if (file) uploadFile(i, file)
                    }"
                  />
                  <span v-if="uploading[i]" class="file-status uploading">Uploading...</span>
                  <span v-else-if="stem.fileUrl" class="file-status done">Uploaded</span>
                </div>
              </div>
              <button
                v-if="stems.length > 1"
                type="button"
                class="btn-remove"
                @click="removeStem(i)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <button type="submit" class="btn-submit" :disabled="submitting || !title || !artist || stems.some(s => !s.name)">
          {{ submitting ? 'Creating...' : 'Create Stem Pack' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.upload-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

.upload-card {
  background: #141414;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  padding: 40px;
}

.upload-card h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.sub {
  color: #888;
  font-size: 14px;
  margin-bottom: 32px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 13px;
  font-weight: 500;
  color: #aaa;
}

.field input,
.field textarea,
.field select {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #0d0d0d;
  color: #f5f5f5;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #7c3aed;
}

.stems-section {
  border-top: 1px solid #1f1f1f;
  padding-top: 24px;
}

.stems-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.stems-header h2 {
  font-size: 18px;
  font-weight: 600;
}

.btn-add-stem {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  background: #1a1a1a;
  color: #aaa;
  font-size: 13px;
  border: 1px solid #333;
  transition: all 0.15s;
}

.btn-add-stem:hover {
  background: #242424;
  color: #f5f5f5;
}

.stems-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stem-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px;
  background: #111;
  border-radius: 8px;
  border: 1px solid #1f1f1f;
}

.stem-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
  margin-bottom: 6px;
}

.stem-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.stem-field label {
  font-size: 11px;
  color: #666;
}

.stem-field input,
.stem-field select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #0d0d0d;
  color: #f5f5f5;
  font-size: 13px;
  font-family: inherit;
  outline: none;
}

.stem-field input:focus,
.stem-field select:focus {
  border-color: #7c3aed;
}

.stem-file {
  flex: 2;
}

.file-input-wrap {
  position: relative;
}

.file-input-wrap input[type="file"] {
  padding: 6px 10px;
  font-size: 12px;
  width: 100%;
  cursor: pointer;
}

.file-input-wrap input[type="file"]::file-selector-button {
  padding: 2px 10px;
  border-radius: 4px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: #ccc;
  font-size: 11px;
  cursor: pointer;
  margin-right: 8px;
}

.file-input-wrap input[type="file"]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.file-status {
  font-size: 11px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.file-status.uploading {
  color: #eab308;
}

.file-status.done {
  color: #22c55e;
}

.btn-remove {
  padding: 6px 8px;
  border-radius: 4px;
  background: transparent;
  color: #555;
  font-size: 14px;
  margin-bottom: 6px;
  transition: all 0.15s;
}

.btn-remove:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.btn-submit {
  padding: 14px 32px;
  border-radius: 10px;
  background: #7c3aed;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.15s;
  margin-top: 8px;
  width: 100%;
}

.btn-submit:hover:not(:disabled) {
  background: #6d28d9;
}

.btn-submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .stem-row {
    flex-wrap: wrap;
  }
  .stem-file {
    flex: 1;
  }
}
</style>
