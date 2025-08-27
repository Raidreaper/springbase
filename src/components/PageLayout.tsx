import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

type PageLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const PageLayout = ({ title, subtitle, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <header className="pt-28 pb-10 bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-muted-foreground max-w-3xl">{subtitle}</p>
          ) : null}
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;


