<template>
  <div class="page-meta">
    <NavLink
      v-if="editNavLink"
      class="meta-item-label edit-link"
      :item="editNavLink"
    />
    <div v-if="lastUpdated" class="last-updated">
      <span class="meta-item-label">{{ themeLocale.lastUpdatedText }}: </span>
      <span class="meta-item-info">{{ lastUpdated }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from '@vuepress/client'
import { useThemeLocaleData } from '../composables'
import type {
  MixThemeNormalPageFrontmatter,
  MixThemePageData,
} from '../../shared'
import { resolveEditLink } from '../utils'

import NavLink from './NavLink.vue'

const useEditNavLink = () => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<MixThemePageData>()
  const frontmatter = usePageFrontmatter<MixThemeNormalPageFrontmatter>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      docsRepo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value
    if (!docsRepo) return null
    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    })
    if (!editLink) return null
    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  const siteLocale = useSiteLocaleData()
  const themeLocale = useThemeLocaleData()
  const page = usePageData<MixThemePageData>()
  const frontmatter = usePageFrontmatter<MixThemeNormalPageFrontmatter>()
  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true
    if (!showLastUpdated) return null
    if (!page.value.git?.updatedTime) return null
    const updatedDate = new Date(page.value.git?.updatedTime)
    return updatedDate.toLocaleString(siteLocale.value.lang)
  })
}

export default defineComponent({
  name: 'PageMeta',

  components: {
    NavLink,
  },

  setup() {
    const themeLocale = useThemeLocaleData()
    const editNavLink = useEditNavLink()
    const lastUpdated = useLastUpdated()
    return {
      themeLocale,
      editNavLink,
      lastUpdated,
    }
  },
})
</script>
