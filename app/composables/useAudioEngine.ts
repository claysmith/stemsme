export interface ChannelState {
  volume: number
  solo: boolean
  mute: boolean
}

interface AudioNode {
  gain: GainNode
  osc: OscillatorNode | null
  source: AudioBufferSourceNode | null
  frequency: number
  waveform: OscillatorType
  fileUrl?: string
  buffer: AudioBuffer | null
}

export const useAudioEngine = () => {
  let ctx: AudioContext | null = null
  const isPlaying = ref(false)
  const masterVolume = ref(0.5)
  const controls = reactive<Record<string, ChannelState>>({})
  const activeSoloCount = ref(0)

  const nodes = new Map<string, AudioNode>()

  function getCtx(): AudioContext {
    if (!ctx) ctx = new AudioContext()
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  }

  function init(
    channelDefs: { id: string; frequency: number; waveform: OscillatorType; fileUrl?: string }[],
  ) {
    stop()
    const c = getCtx()

    nodes.forEach((n) => {
      n.osc?.stop()
      n.osc?.disconnect()
      n.source?.stop()
      n.source?.disconnect()
      n.gain.disconnect()
    })
    nodes.clear()

    for (const key in controls) {
      delete controls[key]
    }

    for (const def of channelDefs) {
      const gain = c.createGain()
      gain.gain.value = 0
      gain.connect(c.destination)

      const node: AudioNode = {
        gain,
        osc: null,
        source: null,
        frequency: def.frequency,
        waveform: def.waveform,
        fileUrl: def.fileUrl,
        buffer: null,
      }

      if (def.fileUrl) {
        fetch(def.fileUrl)
          .then((r) => r.arrayBuffer())
          .then((buf) => c.decodeAudioData(buf))
          .then((buf) => { node.buffer = buf })
          .catch(() => { node.buffer = null })
      }

      nodes.set(def.id, node)
      controls[def.id] = { volume: 0.4, solo: false, mute: false }
    }
    activeSoloCount.value = 0
  }

  function play() {
    if (isPlaying.value) return
    const c = getCtx()

    for (const [id, node] of nodes) {
      if (node.fileUrl && node.buffer) {
        const source = c.createBufferSource()
        source.buffer = node.buffer
        source.loop = true
        source.connect(node.gain)
        source.start()
        node.source = source
      } else if (!node.fileUrl) {
        const osc = c.createOscillator()
        osc.type = node.waveform
        osc.frequency.value = node.frequency
        osc.connect(node.gain)
        osc.start()
        node.osc = osc
      }
      updateGain(id)
    }
    isPlaying.value = true
  }

  function stop() {
    isPlaying.value = false
    for (const [, node] of nodes) {
      if (node.osc) {
        try { node.osc.stop() } catch { /* already stopped */ }
        node.osc.disconnect()
        node.osc = null
      }
      if (node.source) {
        try { node.source.stop() } catch { /* already stopped */ }
        node.source.disconnect()
        node.source = null
      }
    }
  }

  function toggleSolo(id: string) {
    if (!controls[id]) return
    controls[id].solo = !controls[id].solo
    recalcSoloCount()
    updateAllGains()
  }

  function toggleMute(id: string) {
    if (!controls[id]) return
    controls[id].mute = !controls[id].mute
    updateGain(id)
  }

  function setVolume(id: string, vol: number) {
    if (!controls[id]) return
    controls[id].volume = vol
    updateGain(id)
  }

  function setMaster(vol: number) {
    masterVolume.value = vol
    updateAllGains()
  }

  function recalcSoloCount() {
    activeSoloCount.value = Object.values(controls).filter((c) => c.solo).length
  }

  function updateAllGains() {
    nodes.forEach((_, id) => updateGain(id))
  }

  function updateGain(id: string) {
    const ctrl = controls[id]
    const node = nodes.get(id)
    if (!ctrl || !node) return
    const hasSource = !!(node.osc || node.source)
    if (!hasSource) return
    const anySolo = activeSoloCount.value > 0
    let gain = ctrl.volume * masterVolume.value
    if (anySolo && !ctrl.solo) gain = 0
    if (ctrl.mute) gain = 0
    try {
      node.gain.gain.linearRampToValueAtTime(
        gain,
        (ctx ?? getCtx()).currentTime + 0.05,
      )
    } catch {
      node.gain.gain.value = gain
    }
  }

  function cleanup() {
    stop()
    nodes.forEach((n) => n.gain.disconnect())
    nodes.clear()
    for (const key in controls) delete controls[key]
    if (ctx) {
      ctx.close()
      ctx = null
    }
  }

  return {
    isPlaying,
    masterVolume,
    controls,
    activeSoloCount,
    init,
    play,
    stop,
    setVolume,
    setMaster,
    toggleSolo,
    toggleMute,
    cleanup,
  }
}
