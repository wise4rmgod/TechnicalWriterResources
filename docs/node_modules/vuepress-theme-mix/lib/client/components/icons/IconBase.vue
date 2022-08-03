<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    :stroke="iconColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    shape-rendering="geometricPrecision"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :class="'icon-' + iconName"
    role="presentation"
    :style="{ color: iconColor }"
  >
    <slot />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IconBase',

  props: {
    iconName: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
})
</script>
