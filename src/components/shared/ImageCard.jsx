import React, { useMemo } from "react";
import { IMAGE_URL } from "../../utils/constants";

const ImageCard = React.memo(
  ({
    imageId,
    alt,
    className = "",
    width = 300,
    height = 300,
    overlayContent,
    aspectRatio = "aspect-square",
  }) => {
    const imageSrc = useMemo(
      () =>
        `${IMAGE_URL}fl_lossy,f_auto,q_auto,w_${width},h_${height},c_fit/${imageId}`,
      [imageId, width, height]
    );

    return (
      <div className={`relative ${className}`}>
        <img
          className={`w-full h-full rounded-xl object-cover ${aspectRatio}`}
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
        />
        {overlayContent}
      </div>
    );
  }
);

ImageCard.displayName = "ImageCard";

export default ImageCard;