<template>
  <div class="theme-mix" :class="containerClass">
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme-mode="toggleThemeMode"
    />
    <ToggleSidebarButton v-else @toggle="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
    <div class="theme-layout">
      <Sidebar />

      <Home v-if="frontmatter.home" />

      <Page v-else :key="page.path" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import Navbar from '../components/Navbar.vue'
import ToggleSidebarButton from '../components/ToggleSidebarButton.vue'
import Sidebar from '../components/Sidebar.vue'
import Home from '../components/Home.vue'
import Page from '../components/Page.vue'
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
  useThemeMode,
} from '../composables'
import type { MixThemePageFrontmatter } from '../../shared'

export default defineComponent({
  name: 'Layout',

  components: {
    Navbar,
    ToggleSidebarButton,
    Sidebar,
    Home,
    Page,
  },

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter<MixThemePageFrontmatter>()
    const themeLocaleData = useThemeLocaleData()

    // navbar
    const shouldShowNavbar = computed(
      () =>
        frontmatter.value.navbar !== false &&
        themeLocaleData.value.navbar !== false
    )

    // sidebar
    const sidebarItems = useSidebarItems()
    const isSidebarOpen = ref(false)
    const toggleSidebar = (to?: boolean): void => {
      isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
    }

    // classes
    const containerClass = computed(() => ({
      'no-sidebar': !sidebarItems.value.length,
      'sidebar-open': isSidebarOpen.value,
      'with-navbar': shouldShowNavbar.value,
    }))

    // close sidebar after navigation
    let unregisterRouterHook
    onMounted(() => {
      const router = useRouter()
      unregisterRouterHook = router.afterEach(() => {
        toggleSidebar(false)
      })
    })
    onUnmounted(() => {
      unregisterRouterHook()
    })

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise()
    const onBeforeEnter = scrollPromise.resolve
    const onBeforeLeave = scrollPromise.pending

    // toggle theme mode
    const themeMode = useThemeMode()
    const toggleThemeMode = (): void => {
      themeMode.value === 'light'
        ? (themeMode.value = 'dark')
        : (themeMode.value = 'light')

      document.documentElement.dataset.theme = themeMode.value
      localStorage.setItem('theme', themeMode.value)
    }

    return {
      page,
      frontmatter,
      shouldShowNavbar,
      toggleSidebar,
      containerClass,
      onBeforeEnter,
      onBeforeLeave,
      toggleThemeMode,
    }
  },
})
</script>
