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
      ? { width: 52, height: 52 }
      : size === "lg"
        ? { width: 96, height: 96 }
        : { width: 68, height: 68 };

  return (
    <span className={classes}>
      <Image
        alt=""
        aria-hidden="true"
        className="acpc-logo-image"
        height={dimensions.height}
        src="/brand/aleppo-icpc-club-avatar.png"
        width={dimensions.width}
      />
      {subtitle ? <span className="acpc-logo-subtitle">{subtitle}</span> : null}
    </span>
  );
}
