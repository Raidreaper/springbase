import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageModal from "@/components/ImageModal";

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

interface AdvancedCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showThumbnails?: boolean;
}

const AdvancedCarousel = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  showThumbnails = true
}: AdvancedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, autoPlayInterval, items.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevious = () => {
    goToSlide(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % items.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (items.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0 relative">
              <ImageModal
                src={item.image}
                alt={item.title}
                title={item.title}
                description={item.description}
                className="w-full h-[500px] md:h-[600px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </ImageModal>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="max-w-3xl">
                    <span className="inline-block bg-sage text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {item.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {showControls && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-10"
              onClick={goToPrevious}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-10"
              onClick={goToNext}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white z-10"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </>
        )}
      </div>

      {/* Indicators */}
      {showIndicators && (
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-sage scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="mt-6 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-sage scale-105'
                  : 'hover:scale-105'
              }`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-16 object-cover"
              />
              <div className={`absolute inset-0 ${
                index === currentIndex ? 'bg-sage/20' : 'bg-black/0 hover:bg-black/20'
              } transition-colors duration-300`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedCarousel;
