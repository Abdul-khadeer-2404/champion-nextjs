"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "@/app/photography/PhotoGallery.css";
import Image from "next/image";

interface Photo {
  src: string;
  thumbnail: string;
  title: string;
  description: string;
}

interface PhotoGalleryProps {
  end_url: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ end_url }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/'+end_url);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Failed to fetch photos", error);
      }
    };

    fetchData();
  }, [end_url]);

  const openModal = (photo: Photo) => {
    setCurrentPhoto(photo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentPhoto(null);
  };

  return (
    <div className="mt-[200px] mb-[50px] container">
      <div className="grid-container mt-5">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="cursor-pointer dark:shadow-custom shadow-custom-light"
            onClick={() => openModal(photo)}
          >
            <Image src={photo.src} alt={photo.title} className="lg:w-64" width={200} height={200} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>

      {currentPhoto && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Photo Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <div>
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.title}
              width={200}
              height={200}
              className="w-full h-auto"
            />
            {/* <h2 className="mt-4 text-blue-400">{currentPhoto.title}</h2>
            <p className="mt-2 text-green-400">{currentPhoto.description}</p> */}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PhotoGallery;
