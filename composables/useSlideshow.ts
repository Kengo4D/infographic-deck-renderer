import type { SlideDeck } from '~/types/slides'

export const useSlideshow = () => {
  const deck = useState<SlideDeck | null>('deck', () => null)
  const isLoading = useState('deck-loading', () => false)
  const activeIndex = useState('slide-active-index', () => 0)

  const totalSlides = computed(() => deck.value?.slides.length ?? 0)
  const progress = computed(() => (totalSlides.value ? ((activeIndex.value + 1) / totalSlides.value) * 100 : 0))
  const activeSlide = computed(() => deck.value?.slides[activeIndex.value] ?? null)

  const fetchDeck = async (path = '/data/deck.json') => {
    isLoading.value = true
    try {
      deck.value = await $fetch<SlideDeck>(path)
      activeIndex.value = 0
    } finally {
      isLoading.value = false
    }
  }

  const next = () => { if (activeIndex.value < totalSlides.value - 1) activeIndex.value += 1 }
  const prev = () => { if (activeIndex.value > 0) activeIndex.value -= 1 }
  const goTo = (index: number) => { if (index >= 0 && index < totalSlides.value) activeIndex.value = index }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown') next()
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') prev()
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))

  return { deck, isLoading, activeIndex, totalSlides, progress, activeSlide, fetchDeck, next, prev, goTo }
}
