<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

import type { ChartPoint } from '@/types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const props = defineProps<{
  chartData: ChartPoint[]
}>()

const chartJsData = computed(() => ({
  labels: props.chartData.map((p) => p.date),
  datasets: [
    {
      label: 'Value',
      data: props.chartData.map((p) => p.value),
      borderColor: '#1A1A1A',
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 12,
      right: 8,
      top: 4,
      bottom: 4,
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1A1A1A',
      titleFont: { family: 'DM Sans' },
      bodyFont: { family: 'DM Mono' },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.06)' },
      ticks: { color: '#7A7060', font: { family: 'DM Sans', size: 9 } },
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.06)' },
      ticks: {
        color: '#7A7060',
        font: { family: 'DM Mono', size: 10 },
        padding: 6,
      },
    },
  },
}
</script>

<template>
  <v-card class="chart-card">
    <v-card-title class="display-font">Portfolio Evolution</v-card-title>
    <v-card-text class="chart-wrap">
      <div v-if="chartData.length === 0" class="text-muted text-caption text-center pa-8">
        No chart data yet.
      </div>
      <Line v-else :data="chartJsData" :options="chartOptions" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.chart-wrap {
  height: 280px;
  position: relative;
}
</style>
