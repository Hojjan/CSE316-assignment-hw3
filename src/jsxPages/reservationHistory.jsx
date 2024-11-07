import React, { useEffect, useState } from "react";
import '../cssPages/reservationHistory.css'
import axios from "axios";

function ReservationList() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // 서버에서 예약 목록을 가져오는 GET 요청
        axios.get('http://localhost:3001/api/reservation')
            .then((response) => {setReservations(response.data);}) // 서버로부터 받은 데이터로 상태 업데이트
            .catch((error) => {console.error('Error fetching reservation data:', error);});
    }, []);
    

    const handleRemoveReservation = (id) => {
        // 예약 취소 API를 호출하여 DB에서 해당 예약을 삭제
        axios.delete(`http://localhost:3001/api/reservation/${id}`)
            .then(() => {
                // 성공적으로 삭제 후, UI 업데이트
                setReservations(reservations.filter(reservation => reservation.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting reservation:', error);
            });
    };

    let content;
    /* Actually I could have put this code into return, but I was just curious of using if and else function */
    if (reservations.length === 0) {
        content = <div className="noRsrv">
                    <h2>No Reservation Yet</h2>
                </div>
    } 
    else {
        content = (
            <div className="wholeRsrv">
                {reservations.map((reservation, index) => (
                    <div key={index} className="reservationItem">
                        <img src={reservation.image_src} alt={reservation.reservation_name} className="rsrvedFacImg" />
                        <div className="itemContents">
                            <h2>{reservation.reservation_name}</h2>
                            <div className="descriptions">
                                {/* If nothing in purpose box, print - */}
                                <div className="descriptionItems"><img src={'/sticky_note.png'} alt={'stickyNote icon'}/>
                                    <p className="purpose">{reservation.purpose ? reservation.purpose : '-'}</p>
                                </div>

                                <div className="descriptionItems"><img src={'/calendar.png'} alt={'calendar icon'}/><p>{reservation.reservation_date}</p></div>

                                {/* If participant number is 1, only put my name */}
                                <div className="descriptionItems"><img src={'/people.png'} alt={'people icon'}/><p>{reservation.user_name} {reservation.user_number - 1 > 0 && `+ ${reservation.user_number - 1}`}</p></div>
                                <div className="descriptionItems"><img src={'/location.png'} alt={'location icon'}/><p>{reservation.location}</p></div>
                                <div className="descriptionItems"><img src={'/person_check.png'} alt={'availability icon'}/><p>{reservation.is_suny}</p></div>
                                <button className="cancelBtn" onClick={() => handleRemoveReservation(reservation.id)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default ReservationList;
