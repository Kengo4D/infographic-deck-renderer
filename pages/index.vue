<template>
  <main class="min-h-screen bg-slate-950 p-6 text-white">
    <div class="mx-auto max-w-6xl space-y-4">
      <header>
        <h1 class="text-4xl font-extrabold">{{ deck?.deckTitle }}</h1>
        <p class="text-slate-300">{{ deck?.topic }} · v{{ deck?.version }} · Arc: {{ deck?.narrativeArc }}</p>
        <div class="mt-2 h-2 w-full rounded bg-slate-800"><div class="h-full rounded bg-cyan-400" :style="{ width: `${progress}%` }" /></div>
      </header>

      <BaseSlide v-if="activeSlide" :slide="activeSlide">
        <component :is="resolveSlideComponent(activeSlide.slideType, activeSlide.layout)" :slide="activeSlide" />
      </BaseSlide>

      <div class="flex gap-2">
        <button class="rounded bg-slate-800 px-3 py-2" @click="prev">Prev</button>
        <button class="rounded bg-cyan-600 px-3 py-2" @click="next">Next</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { SlideNode } from '~/types/slides'
import BaseSlide from '~/components/slides/BaseSlide.vue'
import ChartRenderer from '~/components/charts/ChartRenderer.vue'

const { deck, activeSlide, progress, fetchDeck, next, prev } = useSlideshow()

const GenericSlide = defineComponent({
  props: { slide: { type: Object as PropType<SlideNode>, required: true } },
  components: { ChartRenderer },
  template: `
  <div class='space-y-4'>
    <div class='grid gap-3 sm:grid-cols-3'>
      <article v-for='metric in slide.metrics' :key='metric.label' class='rounded bg-slate-800 p-3'>
        <p class='text-xs text-slate-400'>{{ metric.label }}</p>
        <p class='text-xl font-semibold'>{{ metric.value }}</p>
        <p class='text-sm text-slate-300'>{{ metric.context }}</p>
        <p class='text-xs text-cyan-300'>{{ metric.source }}</p>
      </article>
    </div>
    <ChartRenderer :chart='slide.chartData' />
    <div><h3 class='font-semibold'>Sources</h3><ul class='list-disc pl-5 text-sm text-cyan-200'><li v-for='src in slide.sources' :key='src'><a :href='src' target='_blank'>{{ src }}</a></li></ul></div>
  </div>`
})

const resolveSlideComponent = (_slideType: string, _layout: string) => GenericSlide

onMounted(() => fetchDeck())
</script>
