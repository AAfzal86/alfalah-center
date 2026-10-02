import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const src =
    variant === "light"
      ? "/logo/Al-Falah-Center-White-Green-Logo-1.svg"
      : "/logo/Al-Falah-Center-Black-Green-Logo-1.svg";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="Alfalah Center home"
    >
      <Image
        src={src}
        alt="Alfalah Center"
        width={180}
        height={56}
        className="h-11 w-auto md:h-12"
        priority
      />
    </Link>
  );
}
