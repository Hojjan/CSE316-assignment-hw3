import React from 'react';
import '../cssPages/facilityList.css'; // CSS 파일 연결

function facilityList(){
  const images = [
    { src: '/gym.jpg', name: 'Gym', alt: 'gym', desc: 'A place used for physical activity', days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', par: '1 - 5', loc: 'A101', suny: false},
    { src: '/auditorium.jpg', name: 'Auditorium', alt: 'auditorium', desc: 'A place for large events', days: 'Mon, Tue, Wed, Thu', par: '10 - 40', loc: 'A234', suny: false},
    { src: '/pool.jpg', name: 'Swimming Pool', alt: 'pool', desc: 'A place for physical activity', days: 'Sat, Sun', par: '1 - 8', loc: 'B403', suny: false },
    { src: '/seminar.jpg', name: 'Seminar Room', alt: 'seminar', desc: 'A place for large meetings', days: 'Mon, Wed, Fri', par: '10 - 30', loc: 'B253', suny: false },
    { src: '/conference.jpg', name: 'Conference Room', alt: 'conference', desc: 'A place for small but important meetings', days: 'Mon, Tue, Wed, Thu, Fri', par: '1 - 10', loc: 'C1033', suny: true },
    { src: '/library.jpg', name: 'Library', alt: 'library', desc: 'A quiet place', days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', par: '1 - 20', loc: 'A1011', suny: true }
  ];

  return (
    <div className="imageContainer">
      {images.map((image, index) => (
        <div key={index} className="image-box">
          <img src={image.src} alt={image.alt} />
          <h2>
            {image.name}
          </h2>
          <p>
            {image.desc}
          </p>
          <p>
            <img src={'/calendar.png'} alt={'calendar icon'} />{image.days}
          </p>
          <p>
            <img src={'/people.png'} alt={'people icon'} />{image.par}
          </p>
          <p>
            <img src={'/location.png'} alt={'location icon'} />{image.loc}
          </p>
          <p>
            <img src={'/exclamation.png'} alt={'exclamation icon'} />{image.suny ? 'Only available for SUNY' : 'Available to All'}</p>
        </div>
      ))}
    </div>
  );
};

export default facilityList;
