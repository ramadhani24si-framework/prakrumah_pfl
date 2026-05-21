export default function Container({ children, className = "", maxWidth = "xl" }) {
  const maxWidths = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full"
  };

  return (
    <div className={`container mx-auto px-4 ${maxWidths[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}