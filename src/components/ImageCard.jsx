import Image from "next/image";
import React from "react";

const ImageCard = ({ image }) => {
  return (
    <div className="w-full h-auto rounded-lg overflow-hidden">
      <Image
        src={image}
        alt="Onboarding Screen"
        width={280}
        height={600}
        className="object-contain w-full h-auto max-w-full"
        style={{
          maxHeight: "calc(100vh - 200px)",
        }}
        sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 280px"
      />
    </div>
  );
};

export default ImageCard;
