import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { CATEGORIES } from '../data/mockVideos';

export const CategoryChips: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useYouTube();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="sticky top-14 z-20 bg-[#0f0f0f] py-3 px-4 flex items-center border-b border-neutral-800/40 select-none">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 z-10 p-1.5 rounded-full bg-[#0f0f0f]/90 hover:bg-neutral-800 text-white shadow-lg border border-neutral-700/50 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Chips Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth px-1"
      >
        {CATEGORIES.map(category => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#272727] text-neutral-200 hover:bg-[#3f3f3f]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 z-10 p-1.5 rounded-full bg-[#0f0f0f]/90 hover:bg-neutral-800 text-white shadow-lg border border-neutral-700/50 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
