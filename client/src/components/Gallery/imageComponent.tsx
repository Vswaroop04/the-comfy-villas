// ImageComponent1.jsx
// Dummy data for the gallery items
import Image from "next/image";
const galleryItems = [
  {
    id: 1,
    title: "Villas",
    imageSrc: "/assets/gallery/long.png",
  },
  {
    id: 2,
    title: "Dining",
    imageSrc: "/assets/gallery/Dining.png",
  },
  {
    id: 3,
    title: "Conferences & Meetings",
    imageSrc: "/assets/gallery/Conferences.png",
  },
  {
    id: 4,
    title: "Service & Facilities",
    imageSrc: "/assets/gallery/Services.png",
  },
  {
    id: 5,
    title: "Wedding Package",
    imageSrc: "/assets/gallery/Wedding.png",
  },
];

export const ImageComponent1 = () => {
  return (
    <div className="relative max-w-full rounded-lg ml-10">
      <Image
        src={galleryItems[0].imageSrc}
        alt="Gallery image"
        className="rounded-lg shadow-lg"
        width={400}
        height={100}
      />
      <p className="absolute top-2 left-4 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
        {galleryItems[0].title}
      </p>
    </div>
  );
};

export default ImageComponent1;

// ImageComponent1.jsx
export const ImageComponent2 = () => {
  return (
    <div className="relative h-auto max-w-full rounded-lg">
      <Image
        width={400}
        height={224}
        src={galleryItems[1].imageSrc}
        alt="Gallery image"
        className="rounded-lg shadow-lg"
      />
      <p className="absolute top-2 left-4 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
        {galleryItems[1].title}
      </p>
    </div>
  );
};

// ImageComponent1.jsx
export const ImageComponent3 = () => {
  return (
    <div className="relative h-auto max-w-full rounded-lg">
      <Image
        width={400}
        height={50}
        src={galleryItems[2].imageSrc}
        alt="Gallery image"
        className="rounded-lg shadow-lg"
      />
      <p className="absolute top-2 left-4 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
        {galleryItems[2].title}
      </p>
    </div>
  );
};

// ImageComponent1.jsx
export const ImageComponent4 = () => {
  return (
    <div className="relative h-auto max-w-full rounded-lg ">
      <Image
        width={400}
        height={50}
        src={galleryItems[3].imageSrc}
        alt="Gallery image"
        className="rounded-lg shadow-lg"
      />
      <p className="absolute top-2 left-4 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
        {galleryItems[3].title}
      </p>
    </div>
  );
};

// ImageComponent1.jsx
export const ImageComponent5 = () => {
  return (
    <div className="relative h-auto max-w-full rounded-lg">
      <Image
        width={400}
        height={50}
        src={galleryItems[4].imageSrc}
        alt="Gallery image"
        className="rounded-lg shadow-lg"
      />
      <p className="absolute top-2 left-4 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
        {galleryItems[4].title}
      </p>
    </div>
  );
};
