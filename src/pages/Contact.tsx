import PageLayout from "@/components/PageLayout";
import PlaceholderSection from "@/components/PlaceholderSection";
import Contact from "@/components/Contact";
import Map from "@/components/Map";

const ContactPage = () => {
  return (
    <PageLayout title="Contact Us" subtitle="We’d love to hear from you.">
      <div className="space-y-6">
        <Contact />
        <Map />
        <PlaceholderSection heading="Directory" description="Key contacts for departments and services." />
      </div>
    </PageLayout>
  );
};

export default ContactPage;


