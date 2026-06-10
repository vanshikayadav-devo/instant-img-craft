import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  ["Is SnapCut AI free?", "Yes. The Free plan gives you 100 credits every day. Each image costs between 5 and 25 credits depending on its file size, so you can process many images per day at no cost."],
  ["How fast is it?", "Most images are processed in 1–3 seconds thanks to our AI pipeline running on optimized GPU workers."],
  ["Is my image secure?", "Uploads are processed over HTTPS, stored temporarily on Cloudinary, and auto-deleted shortly after."],
  ["Which file formats work?", "PNG, JPG, JPEG and WEBP up to 12MB. Output is always a transparent PNG."],
  ["Are images stored permanently?", "No. We only retain images for a short period to deliver the result, then they are deleted automatically."],
];

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQ.map(([q, a], i) => (
        <AccordionItem key={i} value={`i-${i}`} className="border-border">
          <AccordionTrigger className="text-left text-base font-medium">{q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
