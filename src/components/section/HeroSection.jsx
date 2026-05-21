import Container from "../layout/Container";
import Button from "../basic/Button";

export default function HeroSection({ title, subtitle, image, ctaText, onCtaClick }) {
  return (
    <section className="bg-gradient-to-r from-pink/10 to-purple-100 py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {title}
            </h1>
            <p className="text-gray-600 mb-6">{subtitle}</p>
            <Button type="primary" size="lg" onClick={onCtaClick}>
              {ctaText || "Belanja Sekarang"}
            </Button>
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