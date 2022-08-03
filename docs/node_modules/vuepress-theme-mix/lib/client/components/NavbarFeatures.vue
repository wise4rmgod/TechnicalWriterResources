<template>
  <div class="navbar-features">
    <template v-if="themeModeConfig === 'auto'">
      <div class="navbar-features-item">
        <button
          @click="$emit('toggle')"
          type="button"
          :aria-label="toggleThemeModeAriaLabel"
        >
          <IconBase
            v-if="themeMode === 'dark'"
            icon-name="moon"
            width="1.5em"
            height="1.5em"
          >
            <Moon />
          </IconBase>
          <IconBase v-else icon-name="sun" width="1.5em" height="1.5em">
            <Sun />
          </IconBase>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useThemeLocaleData, useThemeMode } from '../composables'
import IconBase from './icons/IconBase.vue'
import Sun from './icons/Sun.vue'
import Moon from './icons/Moon.vue'

export default defineComponent({
  name: 'NavbarFeatures',

  components: {
    IconBase,
    Sun,
    Moon,
  },

  emits: ['toggle'],

  setup() {
    const themeLocaleData = useThemeLocaleData()
    const themeModeConfig = computed(() => themeLocaleData.value.mode ?? 'auto')
    const themeMode = useThemeMode()
    const toggleThemeModeAriaLabel = computed(
      () => themeLocaleData.value.toggleThemeModeAriaLabel
    )

    return {
      themeModeConfig,
      themeMode,
      toggleThemeModeAriaLabel,
    }
  },
})
</script>
