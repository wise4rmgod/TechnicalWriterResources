<template>
  <div
    class="scrollbar"
    ref="wrapperRef"
    @mouseenter="handleMouseEnterWrapper"
    @mouseleave="handleMouseLeaveWrapper"
  >
    <div
      class="scrollbar-container"
      ref="containerRef"
      @scroll="handleScroll"
      v-on:wheel="onWheel"
    >
      <VResizeObserver :on-resize="handleContentResize">
        <div
          class="scrollbar-content"
          ref="contentRef"
          :style="{ width: xScrollable ? 'fit-content' : null }"
        >
          <slot />
        </div>
      </VResizeObserver>
    </div>

    <div class="scrollbar-rail scrollbar-rail--vertical" ref="yRailRef" aria-hidden="true">
      <Transition name="fade-in-transition">
        <div
          v-if="needYBar && isShowYBar && !isIos"
          class="scrollbar-rail__scrollbar"
          :style="{ height: yBarSizePx, top: yBarTopPx }"
          onMousedown="handleYScrollMouseDown"
        ></div>
      </Transition>
    </div>
    <div class="scrollbar-rail scrollbar-rail--horizontal" ref="xRailRef" aria-hidden="true">
      <Transition name="fade-in-transition">
        <div
          v-if="needXBar && isShowXBar && !this.isIos"
          class="scrollbar-rail__scrollbar"
          :style="{ width: xBarSizePx, left: xBarLeftPx }"
          onMousedown="handleXScrollMouseDown"
        ></div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  PropType,
  onMounted,
  onBeforeUnmount,
  watchEffect,
} from 'vue'
import { on, off } from 'evtd'
import { VResizeObserver } from 'vueuc'
import { useIsIos } from 'vooks'

const scrollbarProps = {
  size: {
    type: Number,
    default: 5,
  },
  duration: {
    type: Number,
    default: 0,
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
  xScrollable: Boolean,
  useUnifiedContainer: Boolean,
  triggerDisplayManually: Boolean,
  // If container is set, resize observer won't not attached
  container: Function as PropType<() => HTMLElement | null | undefined>,
  content: Function as PropType<() => HTMLElement | null | undefined>,
  onScroll: Function as PropType<(e: Event) => void>,
  onWheel: Function as PropType<(e: WheelEvent) => void>,
  onResize: Function as PropType<(e: ResizeObserverEntry) => void>,
  internalOnUpdateScrollLeft: Function as PropType<
    (scrollLeft: number) => void
  >,
} as const

export default defineComponent({
  name: 'Scrollbar',
  props: scrollbarProps,
  inheritAttrs: false,
  components: {
    VResizeObserver,
  },

  setup(props) {
    // dom ref
    const wrapperRef = ref<HTMLElement | null>(null)
    const containerRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const yRailRef = ref<HTMLElement | null>(null)
    const xRailRef = ref<HTMLElement | null>(null)

    // data ref
    const contentHeightRef = ref<number | null>(null)
    const contentWidthRef = ref<number | null>(null)
    const containerHeightRef = ref<number | null>(null)
    const containerWidthRef = ref<number | null>(null)
    const yRailSizeRef = ref<number | null>(null)
    const xRailSizeRef = ref<number | null>(null)
    const containerScrollTopRef = ref(0)
    const containerScrollLeftRef = ref(0)
    const isShowXBarRef = ref(false)
    const isShowYBarRef = ref(false)

    let yBarPressed = false
    let xBarPressed = false
    let xBarVanishTimerId: number | undefined
    let yBarVanishTimerId: number | undefined
    let memoYTop: number = 0
    let memoXLeft: number = 0
    let memoMouseX: number = 0
    let memoMouseY: number = 0
    const isIos = useIsIos()

    const yBarSizeRef = computed(() => {
      const { value: containerHeight } = containerHeightRef
      const { value: contentHeight } = contentHeightRef
      const { value: yRailSize } = yRailSizeRef
      if (
        containerHeight === null ||
        contentHeight === null ||
        yRailSize === null
      ) {
        return 0
      } else {
        return Math.min(
          containerHeight,
          (yRailSize * containerHeight) / contentHeight + props.size * 1.5
        )
      }
    })
    const yBarSizePxRef = computed(() => {
      return `${yBarSizeRef.value}px`
    })
    const xBarSizeRef = computed(() => {
      const { value: containerWidth } = containerWidthRef
      const { value: contentWidth } = contentWidthRef
      const { value: xRailSize } = xRailSizeRef
      if (
        containerWidth === null ||
        contentWidth === null ||
        xRailSize === null
      ) {
        return 0
      } else {
        return (xRailSize * containerWidth) / contentWidth + props.size * 1.5
      }
    })
    const xBarSizePxRef = computed(() => {
      return `${xBarSizeRef.value}px`
    })
    const yBarTopRef = computed(() => {
      const { value: containerHeight } = containerHeightRef
      const { value: containerScrollTop } = containerScrollTopRef
      const { value: contentHeight } = contentHeightRef
      const { value: yRailSize } = yRailSizeRef
      if (
        containerHeight === null ||
        contentHeight === null ||
        yRailSize === null
      ) {
        return 0
      } else {
        const heightDiff = contentHeight - containerHeight
        if (!heightDiff) return 0
        return (
          (containerScrollTop / heightDiff) * (yRailSize - yBarSizeRef.value)
        )
      }
    })
    const yBarTopPxRef = computed(() => {
      return `${yBarTopRef.value}px`
    })
    const xBarLeftRef = computed(() => {
      const { value: containerWidth } = containerWidthRef
      const { value: containerScrollLeft } = containerScrollLeftRef
      const { value: contentWidth } = contentWidthRef
      const { value: xRailSize } = xRailSizeRef
      if (
        containerWidth === null ||
        contentWidth === null ||
        xRailSize === null
      ) {
        return 0
      } else {
        const widthDiff = contentWidth - containerWidth
        if (!widthDiff) return 0
        return (
          (containerScrollLeft / widthDiff) * (xRailSize - xBarSizeRef.value)
        )
      }
    })
    const xBarLeftPxRef = computed(() => {
      return `${xBarLeftRef.value}px`
    })
    const needYBarRef = computed(() => {
      const { value: containerHeight } = containerHeightRef
      const { value: contentHeight } = contentHeightRef
      return (
        containerHeight !== null &&
        contentHeight !== null &&
        contentHeight > containerHeight
      )
    })
    const needXBarRef = computed(() => {
      const { value: containerWidth } = containerWidthRef
      const { value: contentWidth } = contentWidthRef
      return (
        containerWidth !== null &&
        contentWidth !== null &&
        contentWidth > containerWidth
      )
    })
    const mergedContainerRef = computed(() => {
      const { container } = props
      if (container) return container()
      return containerRef.value
    })
    const mergedContentRef = computed(() => {
      const { content } = props
      if (content) return content()
      return contentRef.value
    })

    // methods
    const handleContentResize = sync
    // const handleContainerResize = (e: ResizeObserverEntry): void => {
    //   const { onResize } = props
    //   if (onResize) onResize(e)
    //   sync()
    // }
    function handleMouseEnterWrapper(): void {
      showXBar()
      showYBar()
      sync()
    }
    function handleMouseLeaveWrapper(): void {
      hideBar()
    }
    function hideBar(): void {
      hideYBar()
      hideXBar()
    }
    function hideYBar(): void {
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      yBarVanishTimerId = window.setTimeout(() => {
        isShowYBarRef.value = false
      }, props.duration)
    }
    function hideXBar(): void {
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      xBarVanishTimerId = window.setTimeout(() => {
        isShowXBarRef.value = false
      }, props.duration)
    }
    function showXBar(): void {
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      isShowXBarRef.value = true
    }
    function showYBar(): void {
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      isShowYBarRef.value = true
    }
    function handleScroll(e: Event): void {
      const { onScroll } = props
      if (onScroll) onScroll(e)
      syncScrollState()
    }
    function syncScrollState(): void {
      // only collect scroll state, do not trigger any dom event
      const { value: container } = mergedContainerRef
      if (container) {
        containerScrollTopRef.value = container.scrollTop
        containerScrollLeftRef.value = container.scrollLeft
      }
    }
    function syncPositionState(): void {
      // only collect position state, do not trigger any dom event
      // Don't use getClientBoundingRect because element may be scale transformed
      const { value: content } = mergedContentRef
      if (content) {
        contentHeightRef.value = content.offsetHeight
        contentWidthRef.value = content.offsetWidth
      }
      const { value: container } = mergedContainerRef
      if (container) {
        containerHeightRef.value = container.offsetHeight
        containerWidthRef.value = container.offsetWidth
      }
      const { value: xRailEl } = xRailRef
      const { value: yRailEl } = yRailRef
      if (xRailEl) {
        xRailSizeRef.value = xRailEl.offsetWidth
      }
      if (yRailEl) {
        yRailSizeRef.value = yRailEl.offsetHeight
      }
    }
    /**
     * Sometimes there's only one element that we can scroll,
     * For example for textarea, there won't be a content element.
     */
    function syncUnifiedContainer(): void {
      const { value: container } = mergedContainerRef
      if (container) {
        containerScrollTopRef.value = container.scrollTop
        containerScrollLeftRef.value = container.scrollLeft
        containerHeightRef.value = container.offsetHeight
        containerWidthRef.value = container.offsetWidth
        contentHeightRef.value = container.scrollHeight
        contentWidthRef.value = container.scrollWidth
      }
      const { value: xRailEl } = xRailRef
      const { value: yRailEl } = yRailRef
      if (xRailEl) {
        xRailSizeRef.value = xRailEl.offsetWidth
      }
      if (yRailEl) {
        yRailSizeRef.value = yRailEl.offsetHeight
      }
    }
    function sync(): void {
      if (!props.scrollable) return
      if (props.useUnifiedContainer) {
        syncUnifiedContainer()
      } else {
        syncPositionState()
        syncScrollState()
      }
    }
    function isMouseUpAway(e: MouseEvent): boolean {
      return !wrapperRef.value?.contains(e.target as any)
    }
    function handleXScrollMouseDown(e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      xBarPressed = true
      on('mousemove', window, handleXScrollMouseMove, true)
      on('mouseup', window, handleXScrollMouseUp, true)
      memoXLeft = containerScrollLeftRef.value
      memoMouseX = e.clientX
    }
    function handleXScrollMouseMove(e: MouseEvent): void {
      if (!xBarPressed) return
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      const { value: containerWidth } = containerWidthRef
      const { value: contentWidth } = contentWidthRef
      const { value: xBarSize } = xBarSizeRef
      if (containerWidth === null || contentWidth === null) return
      const dX = e.clientX - memoMouseX
      const dScrollLeft =
        (dX * (contentWidth - containerWidth)) / (containerWidth - xBarSize)
      const toScrollLeftUpperBound = contentWidth - containerWidth
      let toScrollLeft = memoXLeft + dScrollLeft
      toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
      toScrollLeft = Math.max(toScrollLeft, 0)
      const { value: container } = mergedContainerRef
      if (container) {
        container.scrollLeft = toScrollLeft
        const { internalOnUpdateScrollLeft } = props
        if (internalOnUpdateScrollLeft) internalOnUpdateScrollLeft(toScrollLeft)
      }
    }
    function handleXScrollMouseUp(e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      off('mousemove', window, handleXScrollMouseMove, true)
      off('mouseup', window, handleXScrollMouseUp, true)
      xBarPressed = false
      sync()
      if (isMouseUpAway(e)) {
        hideBar()
      }
    }
    function handleYScrollMouseDown(e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      yBarPressed = true
      on('mousemove', window, handleYScrollMouseMove, true)
      on('mouseup', window, handleYScrollMouseUp, true)
      memoYTop = containerScrollTopRef.value
      memoMouseY = e.clientY
    }
    function handleYScrollMouseMove(e: MouseEvent): void {
      if (!yBarPressed) return
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      const { value: containerHeight } = containerHeightRef
      const { value: contentHeight } = contentHeightRef
      const { value: yBarSize } = yBarSizeRef
      if (containerHeight === null || contentHeight === null) return
      const dY = e.clientY - memoMouseY
      const dScrollTop =
        (dY * (contentHeight - containerHeight)) / (containerHeight - yBarSize)
      const toScrollTopUpperBound = contentHeight - containerHeight
      let toScrollTop = memoYTop + dScrollTop
      toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
      toScrollTop = Math.max(toScrollTop, 0)
      const { value: container } = mergedContainerRef
      if (container) {
        container.scrollTop = toScrollTop
      }
    }
    function handleYScrollMouseUp(e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      off('mousemove', window, handleYScrollMouseMove, true)
      off('mouseup', window, handleYScrollMouseUp, true)
      yBarPressed = false
      sync()
      if (isMouseUpAway(e)) {
        hideBar()
      }
    }
    watchEffect(() => {
      const { value: needXBar } = needXBarRef
      const { value: needYBar } = needYBarRef
      const { value: xRailEl } = xRailRef
      const { value: yRailEl } = yRailRef
      if (xRailEl) {
        if (!needXBar) {
          xRailEl.classList.add('scrollbar-rail--disabled')
        } else {
          xRailEl.classList.remove('scrollbar-rail--disabled')
        }
      }
      if (yRailEl) {
        if (!needYBar) {
          yRailEl.classList.add('scrollbar-rail--disabled')
        } else {
          yRailEl.classList.remove('scrollbar-rail--disabled')
        }
      }
    })
    onMounted(() => {
      // if container exist, it always can't be resolved when scrollbar is mounted
      // for example:
      // - component
      //   - scrollbar
      //     - inner
      // if you pass inner to scrollbar, you may use a ref inside component
      // however, when scrollbar is mounted, ref is not ready at component
      // you need to init by yourself
      if (props.container) return
      sync()
    })
    onBeforeUnmount(() => {
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      off('mousemove', window, handleYScrollMouseMove, true)
      off('mouseup', window, handleYScrollMouseUp, true)
    })

    return {
      wrapperRef,
      containerRef,
      contentRef,
      yRailRef,
      xRailRef,
      needYBar: needYBarRef,
      needXBar: needXBarRef,
      yBarSizePx: yBarSizePxRef,
      xBarSizePx: xBarSizePxRef,
      yBarTopPx: yBarTopPxRef,
      xBarLeftPx: xBarLeftPxRef,
      isShowXBar: isShowXBarRef,
      isShowYBar: isShowYBarRef,
      isIos,
      handleScroll,
      handleMouseEnterWrapper,
      handleMouseLeaveWrapper,
      // handleContainerResize,
      handleContentResize,
      handleYScrollMouseDown,
      handleXScrollMouseDown,
    }
  },
})
</script>
