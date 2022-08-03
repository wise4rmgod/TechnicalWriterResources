<template>
  <main class="page">
    <div class="theme-mix-content-wrap" :class="{ 'with-toc': shouldShowToc }">
      <div class="theme-mix-content">
        <Content />

        <PageMeta />
        <PageNav />
      </div>

      <div v-if="shouldShowToc" class="toc-wrap">
        <Toc />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, defineComponent } from 'vue'
import Toc from './Toc.vue'
import type { MixThemeNormalPageFrontmatter } from '../../shared'
import { useThemeLocaleData } from '../composables'
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'

export default defineComponent({
  name: 'Page',

  components: {
    Toc,
    PageMeta,
    PageNav,
  },

  setup() {
    const themeLocaleData = useThemeLocaleData()
    const page = usePageData()
    const headers = computed(() => page.value.headers)
    const frontmatter = usePageFrontmatter<MixThemeNormalPageFrontmatter>()
    const shouldShowToc = computed(() => {
      return (
        headers.value.length &&
        themeLocaleData.value.toc !== false &&
        frontmatter.value.toc !== false
      )
    })

    return {
      headers,
      shouldShowToc,
    }
  },
})
</script>
