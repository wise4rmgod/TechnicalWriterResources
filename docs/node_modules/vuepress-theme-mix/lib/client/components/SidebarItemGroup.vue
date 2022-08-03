<template>
  <li class="sidebar-item" :class="{ collapsed: collapsed }" :title="item.text">
    <a
      v-if="item.type === 'group'"
      class="sidebar-item-group"
      :aria-label="linkAriaLabel"
    >
      <span class="sidebar-item-group-title">
        {{ item.text }}
      </span>
      <span v-if="collapsible" class="arrow" @click="handleClick">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="width: 16px"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </span>
    </a>

    <RouterLink
      v-else-if="isRouterLink && item.type === 'link-group'"
      class="sidebar-item-link-group"
      :to="item.link"
      :rel="linkRel"
      :aria-label="linkAriaLabel"
      v-bind="$attrs"
    >
      <span class="sidebar-item-link-group-title">
        {{ item.text }}
      </span>
      <span v-if="collapsible" class="arrow" @click="handleClick">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="width: 16px"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </span>
    </RouterLink>
    <a
      v-else
      class="sidebar-outbound-link external"
      :href="item.link"
      :rel="linkRel"
      :target="linkTarget"
      :aria-label="linkAriaLabel"
    >
      {{ item.text }}
      <OutboundLink v-if="isBlankTarget" />
    </a>
    <ul class="sidebar-items sidebar-items-sub">
      <template v-for="sidebarItem in item.children" :key="sidebarItem.link">
        <SidebarItemLink
          v-if="sidebarItem.type === 'link'"
          :item="sidebarItem"
        />
        <SidebarItemGroup v-else :item="sidebarItem" />
      </template>
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { ResolvedSidebarItem } from '../../shared'
import { isLinkHttp, isLinkMailto, isLinkTel } from '@vuepress/shared'
import SidebarItemLink from './SidebarItemLink.vue'
import { useThemeLocaleData } from '../composables'

export default defineComponent({
  name: 'SidebarItemGroup',

  components: {
    SidebarItemLink,
  },

  props: {
    item: {
      type: Object as PropType<ResolvedSidebarItem>,
      required: true,
    },
  },

  setup(props) {
    const { item } = toRefs(props)

    // if the link has http protocol
    const hasHttpProtocol = computed(() => isLinkHttp(item.value.link))
    // if the link has non-http protocol
    const hasNonHttpProtocal = computed(
      () => isLinkMailto(item.value.link) || isLinkTel(item.value.link)
    )
    // resolve the `target` attr
    const linkTarget = computed(() => {
      if (hasNonHttpProtocal.value) return undefined
      if (item.value.target) return item.value.target
      if (hasHttpProtocol.value) return '_blank'
      return undefined
    })
    // if the `target` attr is '_blank'
    const isBlankTarget = computed(() => linkTarget.value === '_blank')
    // is `<RouterLink>` or not
    const isRouterLink = computed(
      () =>
        !hasHttpProtocol.value &&
        !hasNonHttpProtocal.value &&
        !isBlankTarget.value
    )
    // resolve the `rel` attr
    const linkRel = computed(() => {
      if (hasNonHttpProtocal.value) return undefined
      if (item.value.rel) return item.value.rel
      if (isBlankTarget.value) return 'noopener noreferrer'
      return undefined
    })
    // resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    )

    const themeLocaleData = useThemeLocaleData()

    const collapsible = computed(
      () =>
        item.value?.collapsible ?? themeLocaleData.value?.collapsible === true
    )

    const collapsed = ref(
      collapsible.value === true &&
        (item.value.collapsed ?? themeLocaleData.value?.collapsed === true)
    )

    const handleClick = (e) => {
      e.preventDefault()

      collapsed.value = !collapsed.value
    }

    return {
      linkTarget,
      linkRel,
      linkAriaLabel,
      isRouterLink,
      collapsible,
      collapsed,
      handleClick,
    }
  },
})
</script>
