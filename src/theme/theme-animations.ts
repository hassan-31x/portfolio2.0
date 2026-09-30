// animations.ts
export type AnimationVariant = 'circle' | 'circle-blur' | 'polygon' | 'gif'
export type AnimationStart = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

interface Animation {
  name: string
  css: string
}

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart,
  url?: string,
): Animation => {
  if (variant === 'circle' || variant === 'circle-blur') {
    const origins: Record<AnimationStart, string> = {
      'top-left': '0% 0%',
      'top-right': '100% 0%',
      'bottom-left': '0% 100%',
      'bottom-right': '100% 100%',
      center: '50% 50%',
    }
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) { animation: none; }
        ::view-transition-old(root), ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root) { z-index: 1; }
        ::view-transition-new(root) {
          z-index: 2;
          animation: theme-reveal 450ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes theme-reveal {
          from { clip-path: circle(0px at ${origins[start]}); }
          to { clip-path: circle(150vmax at ${origins[start]}); }
        }
      `,
    }
  }
  const reveal =
    variant === 'polygon'
      ? `@keyframes theme-reveal {
        from { clip-path: polygon(0 0, 0 0, 0 0); }
        to { clip-path: polygon(0 0, 200% 0, 0 200%); }
      }`
      : `@keyframes theme-reveal {
        from { mask-size: 0; }
        to { mask-size: 300vmax; }
      }`
  return {
    name: `${variant}-${start}`,
    css: `
      ::view-transition-group(root) { animation: none; }
      ::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
      ::view-transition-old(root) { z-index: 1; }
      ::view-transition-new(root) {
        z-index: 2;
        ${variant === 'gif' && url ? `mask: url('${encodeURI(url).replace(/'/g, '%27')}') center / 0 no-repeat;` : ''}
        animation: theme-reveal 450ms ease-out both;
      }
      ${reveal}
    `,
  }
}
