<template>
  <nav v-if="prevNavLink || nextNavLink" class="page-nav">
    <div class="inner">
      <span v-if="prevNavLink" class="prev">
        ←
        <NavLink :item="prevNavLink" />
      </span>

      <span v-if="nextNavLink" class="next">
        <NavLink :item="nextNavLink" />
        →
      </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { usePageFrontmatter } from '@vuepress/client'
import { isPlainObject, isString } from '@vuepress/shared'
import type {
  MixThemeNormalPageFrontmatter,
  NavLink as NavLinkType,
  ResolvedSidebarItem,
} from '../../shared'
import { useNavLink, useSidebarItems } from '../composables'
import NavLink from './NavLink.vue'

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | NavLinkType => {
  if (conf === false) {
    return null
  }

  if (isString(conf)) {
    return useNavLink(conf)
  }

  if (isPlainObject<NavLinkType>(conf)) {
    return conf
  }

  return false
}

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: ResolvedSidebarItem[],
  currentPath: string,
  offset: number
): null | NavLinkType => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath)
  if (index !== -1) {
    const targetItem = sidebarItems[index + offset]
    if (!targetItem?.link) {
      return null
    }
    return targetItem as NavLinkType
  }

  return null
}

export default defineComponent({
  name: 'PageNav',

  components: {
    NavLink,
  },

  setup() {
    const frontmatter = usePageFrontmatter<MixThemeNormalPageFrontmatter>()
    const sidebarItems = useSidebarItems()
    const route = useRoute()

    const flatSidebarItems = computed(() => {
      const result: ResolvedSidebarItem[] = []
      const flatten = (input: ResolvedSidebarItem[]): ResolvedSidebarItem[] => {
        input.map((item) => {
          if (item.type === 'link' || item.type === 'link-group') {
            result.push(item)
          }

          if (item.type !== 'link') {
            flatten(item.children)
          }
        })

        return result
      }

      return flatten(sidebarItems.value)
    })

    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev)
      if (prevConfig !== false) {
        return prevConfig
      }

      return resolveFromSidebarItems(flatSidebarItems.value, route.path, -1)
    })

    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next)
      if (nextConfig !== false) {
        return nextConfig
      }

      return resolveFromSidebarItems(flatSidebarItems.value, route.path, 1)
    })

    return {
      prevNavLink,
      nextNavLink,
    }
  },
})
</script>
