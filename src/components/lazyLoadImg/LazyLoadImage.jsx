import "./lazyLoadImage.css"
import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

function LazyLoadImage({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjust the threshold as needed
  })

  useEffect(() => {
    setIsLoading(true) // Reset loading state when src changes
  }, [src])

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={` ${isLoading ? `${className} lazy-load-container` : ""}`}>
      {isLoading && <div className="loading-spinner"></div>}
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={className}
        loading={inView ? "eager" : "lazy"}
        onLoad={handleImageLoad}
      />
    </div>
  )
}

export default LazyLoadImage
