type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  descriptionClassName?: string;
  titleClassName?: string;
  wrapperClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  descriptionClassName = "",
  titleClassName = "",
  wrapperClassName = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl";

  return (
    <div className={`${alignment} ${wrapperClassName}`.trim()}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`section-title mt-5 ${titleClassName}`.trim()}>{title}</h2>
      <p className={`section-copy mt-5 ${descriptionClassName}`.trim()}>{description}</p>
    </div>
  );
}
