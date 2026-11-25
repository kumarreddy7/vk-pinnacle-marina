import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface LightboxImage {
  src: string;
  title: string;
  subtitle?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onChangeIndex }: LightboxProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (currentIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChangeIndex((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft')
        onChangeIndex((currentIndex - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, images.length, onClose, onChangeIndex]);

  const current = currentIndex !== null ? images[currentIndex] : null;

  return (
    <AnimatePresence>
      {currentIndex !== null && current && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {images.length > 1 && (
            <>
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeIndex((currentIndex - 1 + images.length) % images.length);
                }}
                aria-label="Previous image"
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeIndex((currentIndex + 1) % images.length);
                }}
                aria-label="Next image"
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}

          <motion.div
            key={currentIndex}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.title}
              className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white max-w-2xl">
              <h4 className="font-display text-lg font-semibold">{current.title}</h4>
              {current.subtitle && (
                <p className="text-sm text-stone-300 mt-1">{current.subtitle}</p>
              )}
              <p className="text-xs text-[#C69C6D] font-medium mt-2">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
