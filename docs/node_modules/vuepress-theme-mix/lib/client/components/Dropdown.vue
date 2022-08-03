<template>
  <div class="dropdown-wrapper">
    <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
    >
      <span class="arrow-down">{{ item.text }}</span>
    </button>

    <button
      class="mobile-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <span :class="open ? 'arrow-down' : 'arrow-right'">{{ item.text }}</span>
    </button>

    <ul class="dropdown-menu">
      <li
        v-for="(child, index) in item.children"
        :key="child.link || index"
        class="dropdown-item"
      >
        <template v-if="child.children"><h4>TODO</h4></template>

        <template v-else>
          <NavLink :item="child" />
        </template>
      </li>
    </ul>

    <ul v-show="open" class="mobile-dropdown-menu">
      <li
        v-for="(child, index) in item.children"
        :key="child.link || index"
        class="dropdown-item"
      >
        <template v-if="child.children"><h4>TODO</h4></template>

        <template v-else>
          <NavLink :item="child" />
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import type { NavGroup, NavItem } from '../../shared'
import NavLink from './NavLink.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Dropdown',

  components: {
    NavLink,
  },

  props: {
    item: {
      type: Object as PropType<NavGroup<NavItem>>,
      required: true,
    },
  },

  setup(props) {
    const { item } = toRefs(props)

    const open = ref(false)
    const route = useRoute()
    watch(
      () => route.path,
      () => {
        open.value = false
      }
    )

    const dropdownAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    )

    return {
      open,
      dropdownAriaLabel,
    }
  },
})
</script>
