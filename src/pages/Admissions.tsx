import PageLayout from "@/components/PageLayout";
import PlaceholderSection from "@/components/PlaceholderSection";
import Admissions from "@/components/Admissions";

const AdmissionsPage = () => {
  return (
    <PageLayout title="Admissions" subtitle="Your journey to Springbase starts here.">
      <div className="space-y-6">
        <Admissions />
        <PlaceholderSection heading="How to Apply" description="Application steps and required documents." />
        <PlaceholderSection heading="Tuition & Fees" description="Fee schedule and financial aid options." />
        <PlaceholderSection heading="Key Dates" description="Application deadlines and event dates." />
      </div>
    </PageLayout>
  );
};

export default AdmissionsPage;


