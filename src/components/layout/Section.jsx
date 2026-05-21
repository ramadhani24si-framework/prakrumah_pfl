import Container from "./Container";

export default function Section({ 
  children, 
  title, 
  subtitle, 
  bgColor = "white", 
  className = "" 
}) {
  const bgColors = {
    white: "bg-white",
    gray: "bg-gray-50",
    pink: "bg-pink/5"
  };

  return (
    <section className={`${bgColors[bgColor]} py-12 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>}
            {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}