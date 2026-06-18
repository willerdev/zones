"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/lib/data";
import { StarRating } from "@/components/ui/star-rating";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay, testimonials.length]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Quote className="h-10 w-10 text-primary/30 mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-6">
            &ldquo;{testimonials[current].content}&rdquo;
          </p>
          <StarRating rating={testimonials[current].rating} size="md" className="justify-center mb-4" />
          <div className="flex items-center justify-center gap-3">
            <Image
              src={testimonials[current].avatar}
              alt={testimonials[current].name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonials[current].role}, {testimonials[current].company}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAutoplay(false); setCurrent(i); }}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
