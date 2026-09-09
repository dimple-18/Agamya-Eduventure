import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  size?: number;
  showText?: boolean;
  textTone?: "default" | "footer";
  className?: string;
};

export default function BrandLogo({
  href = "/",
  size = 44,
  showText = true,
  textTone = "default",
  className = "",
}: BrandLogoProps) {
  const logo = (
    <Image
      src="/logo/agamya-logo.png"
      alt="Agamya Eduventure"
      width={size}
      height={size}
      className="shrink-0 rounded-lg object-contain"
      priority
    />
  );

  const text =
    textTone === "footer" ? (
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          Agamya Eduventure
        </p>
      </div>
    ) : (
      <span className="min-w-0 leading-none">
        <span className="block truncate text-[15px] font-bold tracking-[-0.02em] text-[var(--brand-dark)] sm:text-[16px]">
          Agamya{" "}
          <span className="font-semibold text-[var(--text-primary)]">Eduventure</span>
        </span>
      </span>
    );

  const content = (
    <span className={`flex min-w-0 items-center gap-3 ${className}`}>
      {logo}
      {showText ? text : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex min-w-0">
      {content}
    </Link>
  );
}
