import React from 'react';

const photos = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/9c7c0992e330c1f3a6aa383f880961f548462276aee96b179e162e3a14a93b6e?apiKey=f7a84a3244c847b980b62828a7d406c5&",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/8f54dbf5c1b59ef30d217ef52350c4bec7f7d124b0893fdf30e7159195ddd271?apiKey=f7a84a3244c847b980b62828a7d406c5&",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/c8400e71d7b38241222d0c562e3efc389d864fb80e7b82089b06a0e903686749?apiKey=f7a84a3244c847b980b62828a7d406c5&",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/9c7c0992e330c1f3a6aa383f880961f548462276aee96b179e162e3a14a93b6e?apiKey=f7a84a3244c847b980b62828a7d406c5&",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d54bbd1f9c5a7ff46e93b8065029c633e96a2e8eb8f82625ce34123950f47f4f?apiKey=f7a84a3244c847b980b62828a7d406c5&",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/c8400e71d7b38241222d0c562e3efc389d864fb80e7b82089b06a0e903686749?apiKey=f7a84a3244c847b980b62828a7d406c5&",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/22014f68df5772f75b076cc82ccec5f1fefec6563c7f3e0ab4a107d5eddccc8d?apiKey=f7a84a3244c847b980b62828a7d406c5&"
];

const EventPhotos = () => {
  return (
    <div className="event-photos">
      {photos.map((src, index) => (
        <div key={index} className="photo-container" style={{ position: 'relative' }}>
          <img
            src={src}
            alt={`Event photo ${index + 1}`}
            className="event-photo"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df93c3fe5d2ce138f7424b28f00d949adb92d1ac0debf03d4906193c6123f68?apiKey=f7a84a3244c847b980b62828a7d406c5&"
            alt="Share"
            className="share-icon"
            style={{
              position: 'absolute',
              top: '0px',
              right: '5px',
              width: '40px',
              height: '40px',
              cursor: 'pointer'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default EventPhotos;
