<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="site-brand">
        <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />
        <RouterLink v-if="siteBrandLogo || siteBrandTitle" :to="siteBrandLink">
          <div
            v-if="siteBrandLogo"
            class="logo-box"
            :class="{ 'logo-with-title': siteBrandTitle }"
          >
            <img
              class="logo"
              :src="withBase(siteBrandLogo)"
              alt="VuePress Mix Theme Logo"
            />
          </div>
          <strong
            v-if="siteBrandTitle"
            class="site-brand-title"
            :class="{ 'can-hide': siteBrandLogo }"
            >{{ siteBrandTitle }}</strong
          >
        </RouterLink>
      </div>

      <NavbarLinks class="can-hide" />

      <div class="navbar-right">
        <NavbarFeatures @toggle="$emit('toggle-theme-mode')" />
        <NavbarSearch />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useThemeLocaleData } from '../composables'
import { useRouteLocale, withBase } from '@vuepress/client'
import ToggleSidebarButton from './ToggleSidebarButton.vue'
import NavbarLinks from './NavbarLinks.vue'
import NavbarFeatures from './NavbarFeatures.vue'

export default defineComponent({
  name: 'Navbar',

  components: {
    ToggleSidebarButton,
    NavbarLinks,
    NavbarFeatures,
  },

  emits: ['toggle-sidebar', 'toggle-theme-mode'],

  setup() {
    const themeLocaleDataRef = useThemeLocaleData()
    const routeLocaleRef = useRouteLocale()

    const hasNavbarLinks = computed(() =>
      themeLocaleDataRef.value.navbar
        ? themeLocaleDataRef.value.navbar.length
        : false
    )

    const siteBrandLink = computed(
      () => themeLocaleDataRef.value.home || routeLocaleRef.value
    )
    const siteBrandLogo = computed(() => themeLocaleDataRef.value.logo)
    const siteBrandTitle = computed(() => themeLocaleDataRef.value.title)

    return {
      hasNavbarLinks,
      siteBrandLink,
      siteBrandLogo,
      siteBrandTitle,
      withBase,
    }
  },
})
</script>
