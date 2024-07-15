<template>
  <div class="mr-6">
    <v-list-subheader class="ml-2">Date Interval</v-list-subheader>
    <date-range :interval="interval" @update="handleUpdate"></date-range>
  </div>
</template>

<script setup lang="ts">
  import DateRange from '@/components/DateRange.vue'
  import { DateInterval } from '@/model/types'
  import { useRequestStore } from '@/stores/request'
  import { storeToRefs } from 'pinia'

  const requestStore = useRequestStore()

  const { interval } = storeToRefs(requestStore)

  function handleUpdate(interval: DateInterval): void {
    requestStore.setInterval(interval)
  }
</script>
