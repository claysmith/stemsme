<script setup lang="ts">
const { tracks, loadTracks } = useStemsStore()
onMounted(() => loadTracks())
</script>

<template>
  <div class="browse-page">
    <header class="page-header">
      <div>
        <h1>Browse Stems</h1>
        <p class="sub">Explore tracks and mix them in your browser</p>
      </div>
      <NuxtLink to="/upload" class="btn-upload">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="pointer-events: none"><path d="M12 5v14M5 12h14"/></svg>
        Upload Yours
      </NuxtLink>
    </header>

    <div class="track-grid">
      <TrackCard v-for="track in tracks" :key="track.id" :track="track" />
    </div>

    <div class="db-badge">
      <span class="badge-dot" />
      Powered by PostgreSQL
    </div>
  </div>
</template>

<style scoped>
.browse-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
}

.sub {
  color: #888;
  font-size: 15px;
  margin-top: 4px;
}

.btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 8px;
  background: #7c3aed;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.15s;
}

.btn-upload:hover {
  background: #6d28d9;
}

.track-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.db-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
  font-size: 13px;
  color: #666;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
}
</style>
