// The standalone MERNIUM "M" mark (transparent PNG in /public).
// Decorative by default: every placement sits next to the MERNIUM wordmark.
export function BrandMark({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/mernium-mark.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      draggable={false}
      className={`shrink-0 select-none object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

export default BrandMark
