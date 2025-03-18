import Image from "next/image";

type CardProps = {
  image: string;
  title: string;
  description?: string;
  className?: string;
};

export default function Card({
  image,
  title,
  description,
  className,
}: CardProps) {
  return (
    <div
      className={`relative group w-80 h-48 rounded-3xl overflow-hidden shadow-lg ${className || ""} cursor-pointer`}
    >
      <Image src={image} alt={title} fill sizes="80" className="object-cover" />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && <p className="text-sm mt-2">{description}</p>}
      </div>
    </div>
  );
}
