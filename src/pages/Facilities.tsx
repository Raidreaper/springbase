import PageLayout from "@/components/PageLayout";
import PlaceholderSection from "@/components/PlaceholderSection";
import Facilities from "@/components/Facilities";
import ImageGallery from "@/components/ImageGallery";
import Img0044 from "@/assets/IMG-20250811-WA0044.jpg";
import Img0046 from "@/assets/IMG-20250811-WA0046.jpg";
import Img0048 from "@/assets/IMG-20250811-WA0048.jpg";

const FacilitiesPage = () => {
  return (
    <PageLayout title="Campus Facilities" subtitle="World-class spaces designed for learning and growth.">
      <div className="space-y-12">
        <Facilities />
        
        {/* Campus Buildings Gallery */}
        <ImageGallery 
          title="Campus Buildings & Infrastructure" 
          description="Modern facilities designed for optimal learning and growth"
          images={[]}
          columns={3}
          aspectRatio="square"
        />
        
        {/* Classrooms Gallery - Highlighted */}
        <div className="bg-gradient-to-br from-sage/5 to-lotus/5 py-8 rounded-3xl">
          <ImageGallery 
            title="Classrooms & Learning Spaces" 
            description="Interactive and well-equipped classrooms for every age group"
            images={[Img0044, Img0046, Img0048]}
            columns={2}
            aspectRatio="video"
          />
        </div>

        {/* Science Lab Preview */}
        <div>
          <ImageGallery 
            title="Science Laboratory" 
            description="Hands-on experiments and practical science learning"
            images={[
              "/images/science-lab/IMG_1709-960.webp",
              "/images/science-lab/IMG_1711-960.webp"
            ]}
            columns={2}
            aspectRatio="square"
          />
          <div className="text-right mt-2">
            <a href="/gallery?album=science-lab" className="text-sage underline">See more</a>
          </div>
        </div>
        
        {/* Sports Facilities Gallery */}
        <ImageGallery 
          title="Sports & Recreation Facilities" 
          description="Fields, courts, and athletic spaces for physical development"
          images={[]}
          columns={2}
          aspectRatio="square"
        />
        
        {/* Additional Sections */}
        <div className="space-y-6">
          <PlaceholderSection heading="Labs" description="Science, tech, and innovation labs details." />
          <PlaceholderSection heading="Library" description="Resources, catalog, and study spaces." />
        </div>
      </div>
    </PageLayout>
  );
};

export default FacilitiesPage;


