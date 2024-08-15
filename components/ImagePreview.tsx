// components/ImagePreview.tsx
import React from "react";
import Image from "next/image";

type Props = {
  images: File[];
  isDone: boolean;
};

const ImagePreview = ({ images, isDone }: Props) => {
  // console.log("isDone2", isDone);
  return (
    <div className="mt-4 flex flex-wrap  gap-4">
      {images.map((image) => {
        const src = URL.createObjectURL(image);
        return (
          <div key={image.name} className="w-48 text-center">
            <div className="relative aspect-video mb-2">
              <Image
                src={src}
                alt={image.name}
                className="object-cover rounded"
                fill
              />
            </div>
            <p className="text-sm truncate ">{image.name} {isDone ? " - uploaded": null}</p>

          </div>
        );
      })}
    </div>
  );
};

export default ImagePreview;
