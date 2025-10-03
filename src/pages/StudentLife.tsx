import PageLayout from "@/components/PageLayout";
import PlaceholderSection from "@/components/PlaceholderSection";
import StudentLife from "@/components/StudentLife";
import ImageGallery from "@/components/ImageGallery";

const StudentLifePage = () => {
  return (
    <PageLayout title="Student Life" subtitle="Clubs, activities, and a vibrant community.">
      <div className="space-y-12">
        {/* Parade hero */}
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <picture>
            <source srcSet="/images/parade/c3fc96ba-e12b-42dc-9dff-1fe09753a95b-1920.webp" type="image/webp" />
            <source srcSet="/images/parade/c3fc96ba-e12b-42dc-9dff-1fe09753a95b-1920.jpg" type="image/jpeg" />
            <img 
              src="/images/parade/c3fc96ba-e12b-42dc-9dff-1fe09753a95b-1920.jpg" 
              alt="Pupils in cultural attire waving Nigerian flags during a parade"
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </picture>
        </div>

        <StudentLife />
        
        {/* Student Activities & Events - Main Gallery */}
        <div className="bg-gradient-to-br from-sage/5 to-lotus/5 py-8 rounded-3xl">
          <a href="/gallery?album=community-outreach" className="block">
            <ImageGallery 
              title="Student Activities & Events" 
              description="Capturing memorable moments from school events and celebrations"
              images={["/images/community-outreach/1f5c7c37-efed-4b02-a337-e9a2b1d5bd56-960.webp","/images/community-outreach/5c7d0156-d96b-4f50-b7c3-576d2ee65944-960.webp","/images/community-outreach/5e74a848-2b3b-479b-8be2-18d108930188-960.webp"]}
              columns={3}
              aspectRatio="square"
            />
          </a>
        </div>

        {/* Other Galleries */}
        <div className="space-y-8">
          <ImageGallery 
            title="Clubs & Extracurricular Activities" 
            description="Students engaged in various clubs and special programs"
            images={[]}
            columns={2}
            aspectRatio="portrait"
          />
          
          <ImageGallery 
            title="Sports & Athletics" 
            description="Students participating in sports and physical activities"
            images={[]}
            columns={2}
            aspectRatio="video"
          />
        </div>

        {/* Additional Sections */}
        <div className="space-y-6">
          <PlaceholderSection heading="Clubs & Societies" description="Student-led organizations and interest groups." />
          <PlaceholderSection heading="Events" description="Annual events, competitions, and showcases." />
          <PlaceholderSection heading="Wellbeing" description="Support resources and pastoral care." />
        </div>
      </div>
    </PageLayout>
  );
};

export default StudentLifePage;


