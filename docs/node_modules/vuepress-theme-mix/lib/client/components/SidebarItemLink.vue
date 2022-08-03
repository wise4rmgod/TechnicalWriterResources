<template>
  <li class="sidebar-item" :class="{ active: isActiveItem }" :title="item.text">
    <RouterLink
      v-if="isRouterLink"
      class="sidebar-item-link"
      :to="item.link"
      :aria-label="linkAriaLabel"
      v-bind="$attrs"
    >
      <span class="sidebar-item-text">{{ item.text }}</span>
    </RouterLink>
    <a
      v-else
      class="sidebar-outbound-link external"
      :href="item.link"
      :rel="linkRel"
      :target="linkTarget"
      :aria-label="linkAriaLabel"
    >
      <div class="sidebar-item-text">
        <span>{{ item.text }}</span>
        <OutboundLink v-if="isBlankTarget" />
      </div>
    </a>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import { isLinkHttp, isLinkMailto, isLinkTel } from '@vuepress/shared'
import type { ResolvedSidebarItem } from '../../shared'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SidebarItemLink',

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

    const route = useRoute()
    const isActiveItem = computed(() => item.value.link === route.fullPath)

    return {
      isBlankTarget,
      isRouterLink,
      linkTarget,
      linkRel,
      linkAriaLabel,
      isActiveItem,
    }
  },
})
</script>
