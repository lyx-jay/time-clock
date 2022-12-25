import { onMounted, onUnmounted } from 'vue'

export default function useEventListener(target: HTMLElement | null, event: string, callback: () => void) {
  onMounted(() => target!.addEventListener(event, callback))
  onUnmounted(() => target!.addEventListener(event, callback))
}