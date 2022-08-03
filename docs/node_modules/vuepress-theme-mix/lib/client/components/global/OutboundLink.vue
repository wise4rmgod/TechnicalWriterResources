<template>
  <RawOutboundLink>
    <span class="sr-only">{{ themeLocale.openInNewWindow }}</span>
  </RawOutboundLink>
</template>

<script>
import { defineComponent } from 'vue'
import { ExternalLinkIcon } from '@vuepress/plugin-external-link-icon/lib/client'
import { useThemeLocaleData } from '../../composables'
/**
 * Override the built-in `<OutboundLink>` for a11y
 */
export default defineComponent({
  name: 'OutboundLink',
  components: {
    RawOutboundLink: ExternalLinkIcon,
  },
  setup() {
    const themeLocale = useThemeLocaleData()
    return {
      themeLocale,
    }
  },
})
</script>
