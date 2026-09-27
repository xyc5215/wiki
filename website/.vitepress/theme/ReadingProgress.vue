<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const progress = ref(0)

function update(): void {
  const el = document.documentElement
  const scrollTop = el.scrollTop || document.body.scrollTop
  const height = el.scrollHeight - el.clientHeight
  progress.value = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0
}

let onScroll: (() => void) | undefined
onMounted(() => {
  update()
  onScroll = () => requestAnimationFrame(update)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  if (onScroll) {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
})
// 路由切换后页面会滚回顶部，重新计算进度
watch(() => route.path, () => requestAnimationFrame(update))
</script>

<template>
  <div class="reading-progress" :style="{ transform: `scaleX(${progress})` }" />
</template>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--vp-c-brand-1, #3451b2);
  transform-origin: 0 50%;
  transform: scaleX(0);
  z-index: 1000;
  will-change: transform;
  pointer-events: none;
}
</style>
