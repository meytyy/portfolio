import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

type ProjectCarouselProps = {
  images: string[]
  title: string
}

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const hasMultiple = images.length > 1

  useEffect(() => setActive(0), [images])

  useEffect(() => {
    if (!lightbox) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightbox(false)
      if (event.key === 'ArrowLeft' && hasMultiple) show(active - 1)
      if (event.key === 'ArrowRight' && hasMultiple) show(active + 1)
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [active, hasMultiple, lightbox])

  function show(index: number) {
    setActive((index + images.length) % images.length)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') setLightbox(true)
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
          className="absolute inset-0 h-full w-full cursor-zoom-in select-none object-contain"
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
          onTap={() => setLightbox(true)}
          loading="lazy"
          draggable={false}
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1.5 text-xs text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
        <ZoomIn size={14} />
        <span>Zoom</span>
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => show(active - 1)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white backdrop-blur transition hover:scale-110 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => show(active + 1)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white backdrop-blur transition hover:scale-110 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightbox(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`${title} screenshot viewer`}
            >
              <motion.div
                className="relative flex h-full w-full items-center justify-center"
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                onClick={(event) => event.stopPropagation()}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={`lightbox-${images[active]}`}
                    src={images[active]}
                    alt={`${title} — screenshot ${active + 1}`}
                    className="max-h-[88vh] max-w-[94vw] select-none rounded-2xl object-contain shadow-2xl"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    drag={hasMultiple ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -45) show(active + 1)
                      if (info.offset.x > 45) show(active - 1)
                    }}
                    draggable={false}
                  />
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setLightbox(false)}
                  className="absolute right-0 top-0 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:rotate-90 hover:bg-white/20"
                  aria-label="Close viewer"
                >
                  <X size={22} />
                </button>

                {hasMultiple && (
                  <>
                    <button type="button" onClick={() => show(active - 1)} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:scale-110 hover:bg-white/20" aria-label="Previous screenshot">
                      <ChevronLeft size={26} />
                    </button>
                    <button type="button" onClick={() => show(active + 1)} className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:scale-110 hover:bg-white/20" aria-label="Next screenshot">
                      <ChevronRight size={26} />
                    </button>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur">
                      {active + 1} / {images.length}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
