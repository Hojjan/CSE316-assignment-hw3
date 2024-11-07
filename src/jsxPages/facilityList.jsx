import React, {useEffect, useState} from 'react';
import '../cssPages/facilityList.css';
import axios from 'axios';

function FacilityList(){

  const [images, setImages] = useState([]);

  useEffect(() => {
    // 백엔드 API 호출
    axios.get('http://localhost:3001/api/facilities') // API 엔드포인트를 사용하여 데이터를 가져옴
      .then((response) => {
        console.log('API 데이터:', response.data);
        setImages(response.data); // 응답 데이터를 images 상태로 설정
      })
      .catch((error) => {
        console.error('Error fetching facility data:', error);
      });
  }, []);
  
  return (
    <div className="imageContainer">
      {/* find the right source by using map function */}
      {images.length > 0 ? images.map((image, index) => (
        <div key={index} className="image-box">
          {/* facility photo */}
          <img src={image.img_src} alt={image.facility_name}/>

          {/* Facility Information */}
          <h2>{image.facility_name}</h2>
          <p>{image.facility_desc}</p>
          <p><img src={'/calendar.png'} alt={'calendar icon'} />{image.available_days}</p>
          <p><img src={'/people.png'} alt={'people icon'} />{image.min_capacity}-{image.max_capacity}</p>
          <p><img src={'/location.png'} alt={'location icon'} />{image.location}</p>
          <p><img src={'/exclamation.png'} alt={'exclamation icon'} />{image.suny_flag ? 'Only available for SUNY' : 'Available to All'}</p>
        </div>
      )) : (
        <p>Loading facilities...</p> // 데이터 로드 중 표시할 메시지
      )}
    </div>
  );
};

export default FacilityList;
