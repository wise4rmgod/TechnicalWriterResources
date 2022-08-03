<template>
  <div v-if="navbarLinks.length" class="navbar-links-wrapper">
    <nav class="navbar-links">
      <div
        v-for="item in navbarLinks"
        :key="item.link"
        class="navbar-links-item"
      >
        <Dropdown v-if="item.children" :item="item" />

        <NavLink v-else :item="item" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { isString } from '@vuepress/shared'
import type { NavbarItem, NavbarGroup, ResolvedNavbarItem } from '../../shared'
import { useNavLink, useThemeLocaleData, useNavbarSelectLanguage } from '../composables'
import Dropdown from './Dropdown.vue'
import NavLink from './NavLink.vue'

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) {
    return useNavLink(item)
  }
  if ((item as NavbarGroup).children) {
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    }
  }
  return item as ResolvedNavbarItem
}

const useNavbarLinks = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocaleDataRef = useThemeLocaleData()
  return computed(() => {
    const navbarItems = themeLocaleDataRef.value.navbar
      ? themeLocaleDataRef.value.navbar
      : []
    return navbarItems.map(resolveNavbarItem)
  })
}

export default defineComponent({
  name: 'NavbarLinks',

  components: {
    NavLink,
    Dropdown,
  },

  setup() {
    const navbarLinks = computed(() => [
      ...useNavbarLinks().value,
      ...useNavbarSelectLanguage().value,
    ])

    return {
      navbarLinks,
    }
  },
})
</script>
