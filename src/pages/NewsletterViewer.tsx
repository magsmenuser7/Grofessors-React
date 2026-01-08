import { useParams } from "react-router-dom";
import { newsletters } from "../data/newsletters";
import { useEffect } from "react";

const NewsletterViewer = () => {
  const { slug } = useParams();

  // 🔍 Find newsletter by slug
  const newsletter = newsletters.find(n => n.slug === slug);

  // Debug (safe to keep during dev)
  console.log("URL slug:", slug);
  console.log("Available newsletters:", newsletters.map(n => n.slug));

  // 🔁 Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // ❌ Not found
  if (!newsletter) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black text-xl">
        Newsletter not found
      </div>
    );
  }

  // ✅ IMPORTANT: encode URI (handles spaces, special chars)
  const pdfUrl = encodeURI(newsletter.pdf);

  return (
    <div className="min-h-screen">
      <iframe
        key={slug}                 // 🔑 forces iframe reload on route change
        src={pdfUrl}
        title={newsletter.title}
        className="w-full h-screen"
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  );
};

export default NewsletterViewer;
