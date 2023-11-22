// pages/index.tsx
"use client"
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';

// Dummy data for the gallery items
const galleryItems = [
  {
    id: 1,
    title: 'Villas',
    imageSrc: '/assets/gallery/villas.jpg',
  },
  {
    id: 2,
    title: 'Dining',
    imageSrc: '/assets/gallery/dining.jpg',
  },
  {
    id: 3,
    title: 'Conferences & Meetings',
    imageSrc: '/assets/gallery/conference.jpg',
  },
  {
    id: 4,
    title: 'Service & Facilities',
    imageSrc: '/assets/gallery/gym.jpg',
  },
  {
    id: 5,
    title: 'Wedding Package',
    imageSrc: '/assets/gallery/wedding.jpg',
  },
];

export default function Gallery() {
  const isLg = useResponsive('lg');

  return (
    <div className={`grid ${isLg ? 'grid-cols-3' : 'grid-cols-1'} gap-4 p-4`}>
     <div className="absolute bottom-0 left-0 right-0 px-4 py- opacity-70 rounded-sm">
            <h3 className="text-xl text-white">
                Hey, I Am The Big Boss</h3>
            <p className="mt-2 text-sm text-gray-300">Some description text. Some dummy text here. Welcome to Tvk.dev.
            </p>
        </div>
      {galleryItems.map((item) => (
         <></>
      ))}
    </div>
  );
}
