import { computed, type Ref, ref, watch } from 'vue'

export function usePagination(totalPagesRef: Ref<number>) {
  const page = ref(1)
  const limit = ref(10)

  const totalPages = computed(() => totalPagesRef.value)

  const canGoNext = computed(() => page.value < totalPagesRef.value)
  const canGoPrev = computed(() => page.value > 1)

  function goToPage(p: number) {
    const clamped = Math.min(Math.max(1, p), Math.max(1, totalPagesRef.value))
    page.value = clamped
  }

  function nextPage() {
    if (canGoNext.value) {
      page.value += 1
    }
  }

  function prevPage() {
    if (canGoPrev.value) {
      page.value -= 1
    }
  }

  watch(totalPagesRef, (tp) => {
    if (page.value > tp && tp > 0) {
      page.value = tp
    }
  })

  return {
    page,
    limit,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  }
}
