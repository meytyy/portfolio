import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ProjectCarouselProps = {
  images: string[]
  title: string
}

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [active, setActive] = useState(0)
  const hasMultiple = images.length > 1

  useEffect(() => setActive(0), [images])

  function show(index: number) {
    setActive((index + images.length) % images.length)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!hasMultiple) return
    if (event.key === 'ArrowLeft') show(active - 1)
    if (event.key === 'ArrowRight') show(active + 1)
  }

  return (
    <div
      className="group relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900 outline-none"
      tabIndex={hasMultiple ? 0 : -1}
      onKeyDown={onKeyDown}
      role="region"
      aria-label={`${title} screenshots`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={images[active]}
          src={images[active]}
          alt={`${title} — screenshot ${active + 1}`}
          className="absolute inset-0 h-full w-full select-none object-contain"
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.22 }}
          drag={hasMultiple ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -45) show(active + 1)
            if (info.offset.x > 45) show(active - 1)
          }}
          loading="lazy"
          draggable={false}
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => show(active - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => show(active + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next screenshot"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-2 backdrop-blur">
            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => show(index)}
                className={`h-1.5 rounded-full transition-all ${index === active ? 'w-5 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80'}`}
                aria-label={`Show screenshot ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
              />
            ))}
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white backdrop-blur">
            {active + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
