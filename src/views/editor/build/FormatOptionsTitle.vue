<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Title</v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-text-field label="Title" v-model="title"></v-text-field>
      <v-text-field label="Subtitle" v-model="subtitle"></v-text-field>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
  import { useChartStore } from '@/stores/chart'
  import { storeToRefs } from 'pinia'

  const chartStore = useChartStore()
  const { title, subtitle } = storeToRefs(chartStore)
</script>
