import Image from "next/image";

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function BrandLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={classNames("relative h-12 w-[158px] sm:h-14 sm:w-[184px]", className)}>
      <Image
        src="/logo.jpg"
        alt="Brookshores Safaris logo"
        fill
        priority={priority}
        sizes="(max-width: 640px) 158px, 184px"
        className="object-contain object-left"
      />
    </div>
  );
}
