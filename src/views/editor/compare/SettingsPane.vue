<template>
  <div class="settings-pane">
    <v-toolbar height="40" :color="theme.current.value.colors.background">
      <div class="ml-2">Intervals</div>

      <v-spacer></v-spacer>

      <date-range v-slot="props" :interval="newInterval" @update="handleAdd">
        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ props: tooltip }">
            <v-btn icon size="small" v-bind="{ ...props, ...tooltip }">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add interval</span>
        </v-tooltip>
      </date-range>
    </v-toolbar>

    <v-divider></v-divider>

    <div class="settings-pane-content">
      <scroll-wrapper>
        <interval-list></interval-list>
      </scroll-wrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DateInterval } from '@/model/types'
  import { useCompareStore } from '@/stores/compare'
  import DateRange from '@/components/DateRange.vue'
  import ScrollWrapper from '@/components/ScrollWrapper.vue'
  import { ref, Ref } from 'vue'
  import moment from 'moment'
  import { DATE_FORMAT } from '@/constants/datetime'
  import IntervalList from './IntervalList.vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const newInterval: Ref<DateInterval> = ref({
    start: moment().subtract(7, 'days').format(DATE_FORMAT),
    end: moment().format(DATE_FORMAT),
  })

  const compareStore = useCompareStore()

  function handleAdd(interval: DateInterval): void {
    compareStore.addInterval(interval)
  }
</script>

<style lang="scss" scoped>
  .settings-pane {
    height: 100%;
    width: 100%;
    position: relative;

    &-content {
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      top: 41px;
    }
  }
</style>
