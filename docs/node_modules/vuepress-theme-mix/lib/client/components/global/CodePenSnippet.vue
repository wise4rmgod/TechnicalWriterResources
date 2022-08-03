<template>
  <p
    ref="root"
    class="codepen"
    :data-pen-title="title"
    :data-height="height"
    :data-theme-id="theme"
    :data-default-tab="tab"
    :data-user="user"
    :data-slug-hash="slug"
    :data-editable="editable || null"
    :data-preview="preview || null"
    :data-embed-version="version"
  >
    <span
      >See the Pen
      <a href="https://codepen.io/Mamboleoo/pen/XWJPxpZ"> Walkers - How to</a>
      by {{ name || user }} (<a :href="`https://codepen.io/${user}`"
        >@{{ user }}</a
      >) on <a href="https://codepen.io">CodePen</a>.</span
    >
  </p>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'CodePenSnippet',

  props: {
    title: {
      type: String,
      default: null,
      required: true,
    },

    theme: {
      type: String,
      default: 'default',
    },
    height: {
      type: Number,
      default: 265,
    },
    tab: {
      type: String,
      default: 'result',
    },

    team: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: null,
    },

    slug: {
      type: String,
      default: null,
      required: true,
    },

    editable: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },

    version: {
      type: String,
      default: null,
    },
  },

  setup() {
    const root = ref(null)

    onMounted(() => {
      const codepenScript = document.createElement('script')
      codepenScript.setAttribute(
        'src',
        'https://static.codepen.io/assets/embed/ei.js'
      )
      codepenScript.async = true
      root.value.appendChild(codepenScript)
    })

    const href = computed(
      () =>
        'https://codepen.io/' +
        (this.team ? 'team' : '') +
        this.user +
        '/pen/' +
        this.slug
    )

    return {
      root,
      href,
    }
  },
})
</script>
