import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ScheduleTourPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.parentName || !payload.email || !payload.preferredDate || !payload.preferredTime) {
      toast({ title: "Missing information", description: "Please fill all required fields." });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/schedule-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      toast({ title: "Request received", description: "We emailed you a calendar invite and will confirm shortly." });
      form.reset();
    } catch (err) {
      toast({ title: "Error", description: "Could not schedule the tour. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageLayout title="Schedule a Campus Tour" subtitle="Pick a preferred day and time. We'll confirm availability.">
      <Card className="bg-card border-0">
        <CardHeader>
          <CardTitle>Tour Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Parent/Guardian Name</label>
                <Input name="parentName" placeholder="Full name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                <Input type="email" name="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                <Input name="phone" placeholder="Optional" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Preferred Date</label>
                <Input type="date" name="preferredDate" required />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Preferred Time</label>
                <Input type="time" name="preferredTime" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Notes</label>
              <Textarea name="notes" placeholder="Any specific interests or questions" rows={4} />
            </div>
            <div className="hidden" aria-hidden="true">
              <Input name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Tour Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ScheduleTourPage;


