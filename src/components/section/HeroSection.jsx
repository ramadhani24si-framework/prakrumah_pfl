import Container from "../layout/Container";
import Button from "../basic/Button";

export default function HeroSection({ title, subtitle, image, ctaText, onCtaClick }) {
  return (
    <section className="bg-gradient-to-r from-pink/10 to-purple-100 rounded-2xl mb-8 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {title}
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              {subtitle}
            </p>
            {/* Button hanya muncul jika ctaText dikasih value */}
            {ctaText && (
              <Button type="primary" onClick={onCtaClick}>
                {ctaText}
              </Button>
            )}
          </div>
          {image && (
            <div className="flex-1">
              <img src={image} alt={title} className="w-full max-w-md mx-auto rounded-2xl" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}