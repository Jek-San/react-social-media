import "./lazyLoadImage.css"
import React, { useState } from "react"
import { useInView } from "react-intersection-observer"

function LazyLoadImage({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjust the threshold as needed
  })

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={` ${isLoading ? "lazy-load-container" : ""}`}>
      {isLoading && <div className="loading-spinner"></div>}
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={className} // Apply the provided className
        loading={inView ? "eager" : "lazy"}
        onLoad={handleImageLoad}
      />
    </div>
  )
}

export default LazyLoadImage
