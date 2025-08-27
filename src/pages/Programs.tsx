import PageLayout from "@/components/PageLayout";
import PlaceholderSection from "@/components/PlaceholderSection";
import Programs from "@/components/Programs";
import ImageGallery from "@/components/ImageGallery";

const ProgramsPage = () => {
  return (
    <PageLayout title="Academic Programs" subtitle="Explore curricula across all grades and special tracks.">
      <div className="space-y-12">
        <Programs />
        
        {/* Early Years Gallery - Highlighted */}
        <div className="bg-gradient-to-br from-sage/5 to-lotus/5 py-8 rounded-3xl">
          <ImageGallery 
            title="Early Years Learning" 
            description="Montessori activities and foundational learning experiences"
            images={[
              "/src/assets/IMG-20250811-WA0044.jpg"
            ]}
            columns={2}
            aspectRatio="square"
          />
        </div>
        
        {/* Other Program Galleries */}
        <div className="space-y-8">
          <ImageGallery 
            title="Primary Education" 
            description="Students engaged in core subjects and enrichment activities"
            images={[]}
            columns={3}
            aspectRatio="video"
          />
          
          <ImageGallery 
            title="Secondary Education" 
            description="Advanced learning environments and specialized programs"
            images={[]}
            columns={2}
            aspectRatio="square"
          />
        </div>
        
        {/* Additional Sections */}
        <div className="space-y-6">
          <PlaceholderSection heading="Early Years" description="Overview of foundational learning for early years." />
          <PlaceholderSection heading="Primary" description="Core subjects, assessment, and enrichment for primary levels." />
          <PlaceholderSection heading="Secondary" description="Subject pathways, electives, and exam preparation." />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProgramsPage;


