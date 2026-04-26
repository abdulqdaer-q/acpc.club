import Image from "next/image";

type AcpcLogoProps = {
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function AcpcLogo({
  subtitle,
  size = "md",
  className
}: AcpcLogoProps) {
  const classes = [
    "acpc-logo",
    `acpc-logo-${size}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

  const dimensions =
    size === "sm"
      ? { width: 54, height: 58 }
      : size === "lg"
        ? { width: 88, height: 94 }
        : { width: 68, height: 73 };

  return (
    <span className={classes}>
      <Image
        alt=""
        aria-hidden="true"
        className="acpc-logo-image"
        height={dimensions.height}
        src="/brand/aleppo-cpc-lidia.svg"
        width={dimensions.width}
      />
      {subtitle ? <span className="acpc-logo-subtitle">{subtitle}</span> : null}
    </span>
  );
}
