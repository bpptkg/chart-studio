<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="7">
            <v-list-subheader>About Chart Studio</v-list-subheader>

            <v-card>
              <v-list>
                <v-list-item>
                  <div class="d-flex align-center justify-start my-3">
                    <v-img
                      :src="logo"
                      contain
                      max-height="72"
                      max-width="72"
                      alt="Chart Studio"
                    ></v-img>
                    <v-card-title>Chart Studio</v-card-title>
                  </div>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <div>
                    Version:
                    <span class="text--secondary">{{ version }}</span>
                  </div>
                  <div class="my-1">
                    Commit:
                    <span class="text--secondary">{{ commitHash }}</span>
                  </div>
                  <div>
                    Build date:
                    <span class="text--secondary">
                      {{ buildDate }} ({{ buildDuration }})
                    </span>
                  </div>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  href="https://github.com/bpptkg/chart-studio"
                  target="_blank"
                >
                  <v-list-item-title> Developer resources </v-list-item-title>
                  <template v-slot:append>
                    <v-icon>mdi-launch</v-icon>
                  </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  href="https://github.com/bpptkg/chart-studio/issues"
                  target="_blank"
                >
                  <v-list-item-title>Report an issue</v-list-item-title>
                  <template v-slot:append>
                    <v-icon>mdi-launch</v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card class="mt-4">
              <v-card-text>
                <div>BPPTKG Chart Studio</div>
                <div>
                  Copyright &copy; 2022-present BPPTKG. All rights reserved.
                </div>
                <div class="mt-2">
                  Chart Studio App is made possible by BPPTKG with much open
                  source software by developer community.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import logo from '@/assets/logo.svg'
  import { THEME_KEY } from '@/constants/theme'
  import moment from 'moment'
  import { onMounted } from 'vue'
  import { useTheme } from 'vuetify'

  const version = process.env.APP_VERSION
  const commitHash = process.env.COMMIT_HASH
  const buildDate = process.env.BUILD_DATE

  const buildDuration = moment(buildDate).fromNow()

  const theme = useTheme()

  onMounted(() => {
    const themeValue = localStorage.getItem(THEME_KEY)
    if (themeValue) {
      theme.global.name.value = themeValue
    }
  })
</script>
