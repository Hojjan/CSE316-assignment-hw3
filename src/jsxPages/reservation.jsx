import React, { useState, useEffect } from "react";
import '../cssPages/reservation.css'
import axios from 'axios';

const facilities = [
    { src: '/gym.jpg', name: 'Gym', alt: 'gym', desc: 'A place used for physical activity', days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', par: '1 - 5', loc: 'A101', suny: false},
    { src: '/auditorium.jpg', name: 'Auditorium', alt: 'auditorium', desc: 'A place for large events', days: 'Mon, Tue, Wed, Thu', par: '10 - 40', loc: 'A234', suny: false},
    { src: '/pool.jpg', name: 'Swimming Pool', alt: 'pool', desc: 'A place for physical activity', days: 'Sat, Sun', par: '1 - 8', loc: 'B403', suny: false },
    { src: '/seminar.jpg', name: 'Seminar Room', alt: 'seminar', desc: 'A place for large meetings', days: 'Mon, Wed, Fri', par: '10 - 30', loc: 'B253', suny: false },
    { src: '/conference.jpg', name: 'Conference Room', alt: 'conference', desc: 'A place for small but important meetings', days: 'Mon, Tue, Wed, Thu, Fri', par: '1 - 10', loc: 'C1033', suny: true },
    { src: '/library.jpg', name: 'Library', alt: 'library', desc: 'A quiet place', days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', par: '1 - 20', loc: 'A1011', suny: true }
];

const calculateDayOfWeek = (day, month, year) => {
  if (month === 1) { //for January, set month to 13 and subtract 1 from year
      month = 13;
      year -= 1;
  } else if (month === 2) { //for January, set month to 14 and subtract 2 from year
      month = 14;
      year -= 1;
  }

  const q = day;
  const m = month;
  const k = year % 100; // last two digits of the year
  const j = Math.floor(year / 100); // first two digits of the year

  const d = (q + Math.floor(13 * (m + 1) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) + (5 * j)) % 7;
  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return days[d];
};

function Reservation(){
    const [selectedFacility, setSelectedFacility] = useState('Gym'); //default should be Gym

    const [numPeople, setNumPeople] = useState(''); //use 4 states for getting inputs from reservation
    const [date, setDate] = useState('');
    const [suny, setSuny] = useState('SUNY');
    const [purpose, setPurpose] = useState('');
    const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    // 백엔드 API 호출
    axios.get('http://localhost:3001/api/facilities') // API 엔드포인트를 사용하여 데이터를 가져옴
      .then((response) => {
        console.log('API 데이터:', response.data);
        setFacilities(response.data); // 응답 데이터를 images 상태로 설정
      })
      .catch((error) => {
        console.error('Error fetching facility data:', error);
      });
  }, []);

    const handleFacilityChange = (event) => {
      setSelectedFacility(event.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      //이 부분 DB에서 불러오는걸로 바꾸기
      const reservsList = localStorage.getItem('reservationsList')
      const strdReserv = JSON.parse(reservsList) || [];


      const slctedFacData = facilities.find(facility => facility.facility_name === selectedFacility);

      const location = slctedFacData.location;
      const src = slctedFacData.img_src;

      const minPar = slctedFacData.min_capacity;
      const maxPar = slctedFacData.max_capacity;

      const inputDate = new Date(date); // Date input
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Checking if the input is in right form
      if (isNaN(numPeople) || numPeople.trim() === "") {
        alert('Error: no input or wrong type of input');
        return;
      }

      // Checking capacity & participant numbers
      const numVPeople = parseInt(numPeople);
      if (numVPeople < minPar || numVPeople > maxPar) {
          alert('Capacity error: Invalid participant count.');
          return;
      }


      // If date input is past, alert error
      if (inputDate < today) {
          alert('You cannot make a reservation for a past date.');
          return;
      }
      
      const year = inputDate.getFullYear();
      const month = inputDate.getMonth() + 1;
      const day = inputDate.getDate();

      const dayOfWeek = calculateDayOfWeek(day, month, year);
      
      // Checking available day
      if (!slctedFacData.availiable_days.includes(dayOfWeek)) {
          alert('Day error: Invalid day of the week');
          return;
      }

      // Checking only for SUNY or Not
      if (slctedFacData.suny_flag === true && suny === 'Non-SUNY') {
        alert(`This facility is available only for SUNY Korea members.`);
        return;
      }

      // Checking if there is a reservation for same facility
      if (strdReserv.find(res => res.facility === selectedFacility)) {
          alert('You already have a reservation for this facility.');
          return;
      }

      // Checking if there is another reservation for same date
      if (strdReserv.find(res => res.date === date)) {
          alert('You already have a reservation for another facility on same date.');
          return;
      }

      const newReservation = { facility: selectedFacility, date, numPeople, suny, purpose, src, location};


      // Make update list by adding new information
      const updatedReservations = [...strdReserv, newReservation];

      localStorage.setItem('reservationsList', JSON.stringify(updatedReservations));
      alert('Reservation successful!');
    };
  
    // selecting proper image for a facility
    const slctedFacData = facilities.find(facility => facility.name === selectedFacility);

    return(
    
    <div className="wholeReservation"> 
      <div className="imgWdesc">
        <div className="menu-container">
          <select id="facility-select" onChange={handleFacilityChange}>
            {facilities.map((facility) => (
              <option key={facility.name} value={facility.name}>
                {facility.name}
              </option>
            ))}
            </select>
        </div>

        <div>
          {slctedFacData && (
            <div className="imageList">
                <img src={slctedFacData.src} alt={slctedFacData.alt}  />
                <div className="facility-details">
                    <h2>{slctedFacData.name}</h2>
                    <p>{slctedFacData.desc}</p>
                    <p><img src={'/calendar.png'} alt={'calendar icon'} />{slctedFacData.days}</p>
                    <p><img src={'/location.png'} alt={'location icon'} />{slctedFacData.loc}</p>
                    <p><img src={'/people.png'} alt={'people icon'} />{slctedFacData.par}</p>
                    <p><img src={'/exclamation.png'} alt={'availiablity icon'} />{slctedFacData.suny ? 'Only available for SUNY' : 'Available to All'}</p>

                </div>
            </div>
          )}
          
        </div>
      </div>

      <div className="context">
        <div className="datePickerContainer">
          <p>Date to be Used:</p>
          <input type="date" id="datePicker" value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>

        <div className="peopleContainer">
          <p>Number of People:</p>
          <input type="text" className="people" value={numPeople} onChange={(e) => setNumPeople(e.target.value)}/>
        </div>

        <div className="buttonContainer">
          <div className="radio-options">
            <p><input type="radio" name="suny" value="yes" checked={suny === 'SUNY'} onChange={() => setSuny('SUNY')}/>SUNY Korea</p>
            <p><input type="radio" name="suny" value="no" checked={suny === 'Non-SUNY'} onChange={() => setSuny('Non-SUNY')}/>Non-SUNY Korea</p>
          </div>
        </div>

        <div className="text-container">
          <p>Purpose of Use:</p>
          <textarea id="user-input" onChange={(e) => setPurpose(e.target.value)}></textarea>
        </div>
        
        <button type="submit" onClick={handleSubmit}>submit</button>
      </div>

    </div>

    
    );



    
}



export default Reservation;