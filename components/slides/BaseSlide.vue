<template>
  <Transition name="slide-fade" mode="out-in">
    <section :key="slide.slideNumber" class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-xl">
      <header class="mb-4">
        <p class="text-xs uppercase tracking-widest text-cyan-300">{{ slide.slideType }} · {{ slide.layout }}</p>
        <h2 class="text-3xl font-bold text-white">{{ slide.title }}</h2>
        <p class="text-slate-300">{{ slide.subtitle }}</p>
      </header>
      <p class="mb-6 text-slate-200">{{ slide.coreMessage }}</p>
      <slot />
      <footer class="mt-6 border-t border-slate-700 pt-4">
        <blockquote class="italic text-slate-200">“{{ slide.quote.text }}”</blockquote>
        <p class="text-sm text-slate-400">— {{ slide.quote.attribution }}</p>
      </footer>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import type { SlideNode } from '~/types/slides'

defineProps<{ slide: SlideNode }>()
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active { transition: opacity .25s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; }
</style>
