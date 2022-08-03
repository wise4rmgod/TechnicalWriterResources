<template>
  <g>
    <circle cx="12" cy="12" r="10"></circle>
    <path
      d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
    ></path>
  </g>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Globe',
})
</script>
