<template>
  <v-dialog v-model="show" width="450" scrollable>
    <template v-slot:activator="{ props }">
      <slot v-bind="props">
        <v-text-field
          v-model="intervalText"
          prepend-icon="mdi-calendar"
          readonly
          filled
          class="px-2 mt-2"
          v-bind="props"
        ></v-text-field>
      </slot>
    </template>

    <v-card>
      <v-card-title>Date Interval</v-card-title>

      <v-divider></v-divider>

      <v-tabs v-model="tabIndex" grow>
        <v-tab :value="0">Range</v-tab>
        <v-tab :value="1">Custom</v-tab>
      </v-tabs>

      <v-divider></v-divider>

      <v-card-text>
        <v-tabs-window v-model="tabIndex">
          <!-- Interval range offset mode. -->
          <v-tabs-window-item :value="0">
            <v-row>
              <v-col>
                <v-radio-group v-model="dateIntervalOffsetIndex">
                  <v-radio
                    v-for="(option, index) in dateIntervalOptions"
                    :key="index"
                    :label="option.text"
                    :value="index"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <v-radio-group v-model="beforeAfter">
                  <v-radio
                    v-for="(option, index) in beforeAfterOptions"
                    :key="index"
                    :label="option.text"
                    :value="option.value"
                  >
                  </v-radio>
                </v-radio-group>
                <v-menu
                  v-model="menuOffset"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="offset"
                      label="Offset date"
                      prepend-icon="mdi-calendar"
                      readonly
                      filled
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="offset"
                    @input="menuOffset = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-tabs-window-item>

          <!-- Interval custom mode. -->
          <v-tabs-window-item :value="1">
            <v-row>
              <v-col>
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="start"
                      label="Start date"
                      prepend-icon="mdi-calendar"
                      readonly
                      filled
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="start"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="end"
                      label="End date"
                      prepend-icon="mdi-calendar"
                      readonly
                      filled
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="end"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" color="primary" @click="show = false">
          Cancel
        </v-btn>
        <v-btn
          variant="text"
          color="primary"
          :disabled="isCustomIntervalValid"
          @click="handleSave"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { DateInterval } from '@/model/types'
  import { DATE_FORMAT } from '@/constants/datetime'
  import moment from 'moment';
  import { computed, Ref, ref, watch } from 'vue'

  interface Props {
    interval: DateInterval
  }

  interface Emits {
    (event: 'update', interval: DateInterval): void
  }

  enum IntervalType {
    Range = 0,
    Custom = 1,
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // Dialog state.
  const show = ref(false)

  // Interval tab options.
  const tabIndex: Ref<IntervalType> = ref(IntervalType.Range)

  // Interval offset radio button.
  enum BeforeAfterType {
    Before = 0,
    After = 1,
  }
  const dateIntervalOffsetIndex: Ref<number> = ref(0)
  const offset: Ref<Date> = ref(new Date())
  const menuOffset: Ref<boolean> = ref(false)
  const beforeAfter: Ref<BeforeAfterType> = ref(BeforeAfterType.Before)
  const beforeAfterOptions = ref([
    { value: BeforeAfterType.Before, text: 'Before' },
    { value: BeforeAfterType.After, text: 'After' },
  ])

  // Custom range.
  const menu1 = ref(false)
  const menu2 = ref(false)
  const start = ref(new Date(props.interval.start))
  const end = ref(new Date(props.interval.end))

  // Interval radio button options
  const dateIntervalOptions = ref([
    { count: 3, unit: 'days', text: '3 days' },
    { count: 7, unit: 'days', text: '7 days' },
    { count: 1, unit: 'months', text: '1 month' },
    { count: 2, unit: 'months', text: '2 months' },
    { count: 3, unit: 'months', text: '3 months' },
    { count: 6, unit: 'months', text: '6 months' },
    { count: 1, unit: 'years', text: '1 year' },
  ])

  const intervalText = computed(() => {
    return `${props.interval.start} ~ ${props.interval.end}`
  })

  const isCustomIntervalValid = computed(() => {
    // Only check on custom range.
    return (
      tabIndex.value === IntervalType.Custom &&
      moment(start.value) >= moment(end.value)
    )
  })

  function resetDateIntervalState(): void {
    // Offset mode.
    dateIntervalOffsetIndex.value = 0
    offset.value = new Date()
    beforeAfter.value = BeforeAfterType.Before

    // Custom mode.
    start.value = new Date(props.interval.start)
    end.value = new Date(props.interval.end)
  }

  function handleSave(): void {
    if (tabIndex.value === IntervalType.Range) {
      // Interval range offset mode.
      const offsetDate = moment(offset.value)
      const selectedInterval =
        dateIntervalOptions.value[dateIntervalOffsetIndex.value]

      const count = selectedInterval.count
      const unit =
        selectedInterval.unit as moment.unitOfTime.DurationConstructor

      const terminalDate = offsetDate.clone()

      if (beforeAfter.value === BeforeAfterType.Before) {
        emit('update', {
          start: terminalDate.subtract(count, unit).format(DATE_FORMAT),
          end: offsetDate.format(DATE_FORMAT),
        })
      } else {
        emit('update', {
          start: offsetDate.format(DATE_FORMAT),
          end: terminalDate.add(count, unit).format(DATE_FORMAT),
        })
      }
    } else if (tabIndex.value === IntervalType.Custom) {
      // Interval custom mode.
      emit('update', {
        start: moment(start.value).format(DATE_FORMAT),
        end: moment(end.value).format(DATE_FORMAT),
      })
    }

    show.value = false
  }

  // Reset the date interval every time dialog is shown.
  watch(show, (value) => {
    if (value) {
      resetDateIntervalState()
    }
  })
</script>
