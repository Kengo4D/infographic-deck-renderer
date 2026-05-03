<template>
  <div class="space-y-4">
    <div v-if="chart.chartType === 'heroMetric' || chart.chartType === 'highlightMetric'" class="grid gap-3 sm:grid-cols-3">
      <div v-for="item in chart.data as any[]" :key="item.label" class="rounded bg-cyan-500/10 p-4 text-center">
        <p class="text-3xl font-bold text-cyan-200">{{ item.value }}</p><p class="text-sm text-slate-300">{{ item.label }}</p>
      </div>
    </div>

    <div v-else-if="chart.chartType === 'comparison'" class="grid gap-4 md:grid-cols-2">
      <div v-for="column in [chart.leftColumn, chart.rightColumn]" :key="column?.title" class="rounded bg-slate-800 p-4">
        <h4 class="font-semibold text-white">{{ column?.title }}</h4><ul class="list-disc pl-5 text-slate-300"><li v-for="item in column?.items ?? []" :key="item">{{ item }}</li></ul>
      </div>
    </div>

    <div v-else-if="chart.chartType === 'roadmap'" class="space-y-3">
      <div v-for="phase in chart.phases ?? []" :key="phase.phase" class="rounded border border-slate-700 p-3">
        <p class="font-semibold text-cyan-200">{{ phase.phase }} — {{ phase.focus }}</p>
        <p class="text-sm text-slate-300">{{ phase.skills.join(' · ') }}</p>
      </div>
    </div>

    <div v-else class="rounded bg-slate-800 p-4">
      <pre class="overflow-auto text-xs text-slate-200">{{ chart }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartData } from '~/types/slides'
defineProps<{ chart: ChartData }>()
</script>
