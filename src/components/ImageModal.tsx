import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const ImageModal = ({ 
  src, 
  alt, 
  title, 
  description, 
  className = "",
  children 
}: ImageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`relative group cursor-pointer ${className}`}
        onClick={() => setIsOpen(true)}
      >
        {children}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-6 w-6 text-sage" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl bg-black/95 border-0 p-0 max-h-[90vh]">
          <DialogTitle className="sr-only">
            {title || alt}
          </DialogTitle>
          
          <div className="relative w-full h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* Image */}
            <div className="p-4">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain max-h-[80vh] rounded-lg"
              />
            </div>
            
            {/* Image Info */}
            {(title || description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {title && (
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-white/90 text-sm">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageModal;
