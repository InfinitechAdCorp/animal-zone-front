// src/lib/flyToCart.ts

export function flyToCart(e: React.MouseEvent) {
  const button = e.currentTarget as HTMLElement
  
  // Add null check for button
  if (!button) {
    console.warn('flyToCart: button element is null')
    return
  }

  const rect = button.getBoundingClientRect()
  const cartIcon = document.querySelector("[data-cart-icon]") as HTMLElement | null

  if (!cartIcon) {
    console.warn('flyToCart: cart icon not found')
    return
  }

  const cartRect = cartIcon.getBoundingClientRect()

  // Create the flying element (a small green circle)
  const animationEl = document.createElement("div")
  animationEl.className = "fixed w-6 h-6 bg-green-800 rounded-full z-[9999] pointer-events-none"
  animationEl.style.left = `${rect.left + rect.width / 2 - 15}px`
  animationEl.style.top = `${rect.top + rect.height / 2 - 15}px`
  animationEl.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  animationEl.style.opacity = "1"
  document.body.appendChild(animationEl)

  // Start animation
  requestAnimationFrame(() => {
    animationEl.style.left = `${cartRect.left + cartRect.width / 2 - 12}px`
    animationEl.style.top = `${cartRect.top + cartRect.height / 2 - 12}px`
    animationEl.style.transform = "scale(0.3)"
    animationEl.style.opacity = "0"
  })

  // Remove the element after animation
  setTimeout(() => {
    if (document.body.contains(animationEl)) {
      document.body.removeChild(animationEl)
    }
  }, 900)
}