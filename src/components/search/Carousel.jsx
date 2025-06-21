import { IMAGE_URL } from "../../utils/constants";

const Carousel = ({ data }) => {
  const items = data?.gridElements?.infoWithStyle?.info || [];
  const title = data?.header?.title;

  if (!data || items.length === 0) return null;

  return (
    <section className="my-6">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

      <div className="flex gap-4 overflow-x-auto">
        {items.map(({ imageId }, index) => (
          <div key={index} className="min-w-[100px]">
            <img
              src={`${IMAGE_URL}${imageId}`}
              alt={`carousel-item-${index}`}
              className="rounded-lg w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
