type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl";

  return (
    <div className={alignment}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-5">{title}</h2>
      <p className="section-copy mt-5">{description}</p>
    </div>
  );
}
