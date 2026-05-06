import AboutSection from "@/app/about/_components/AboutSection";
import PageHeader from "@/app/_components/PageHeader";

export default function ContactPage() {
  return (
    <div className="container flex grow-1 flex-col py-8">
      <PageHeader title="about" />

      <section className="h-full content-center space-y-12">
        <AboutSection />
      </section>
    </div>
  );
}
