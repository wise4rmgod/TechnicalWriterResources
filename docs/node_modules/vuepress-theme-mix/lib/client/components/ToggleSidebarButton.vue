<template>
  <div class="toggle-sidebar-button" @click="$emit('toggle')">
    <svg
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      shape-rendering="geometricPrecision"
      viewBox="0 0 24 24"
      height="1.5em"
      width="1.5em"
      style="color: currentcolor"
    >
      <path d="M3 12h18M3 6h18M3 18h18"></path>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToggleSidebarButton',

  emits: ['toggle'],
})
</script>
