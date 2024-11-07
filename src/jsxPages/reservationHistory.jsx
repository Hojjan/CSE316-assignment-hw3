import React, { useEffect, useState } from "react";
import '../cssPages/reservationHistory.css'

function ReservationList() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        /* Called stored reservation lists from localStorage and update*/
        const storedReservations = JSON.parse(localStorage.getItem('reservationsList')) || [];
        setReservations(storedReservations); 
    }, []);

    const handleRemoveReservation = (indexToRemove) => {
        // Remove a reservation from the list by using index
        const updatedReservations = reservations.filter((_, index) => index !== indexToRemove);

        // save updated reservation lists to local storage
        localStorage.setItem('reservationsList', JSON.stringify(updatedReservations));
        setReservations(updatedReservations);
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
                        <img src={reservation.src} alt={reservation.facility} className="rsrvedFacImg" />
                        <div className="itemContents">
                            <h2>{reservation.facility}</h2>
                            <div className="descriptions">
                                {/* If nothing in purpose box, print - */}
                                <div className="descriptionItems"><img src={'/sticky_note.png'} alt={'stickyNote icon'}/>
                                    <p className="purpose">{reservation.purpose ? reservation.purpose : '-'}</p>
                                </div>

                                <div className="descriptionItems"><img src={'/calendar.png'} alt={'calendar icon'}/><p>{reservation.date}</p></div>

                                {/* If participant number is 1, only put my name */}
                                <div className="descriptionItems"><img src={'/people.png'} alt={'people icon'}/><p>Hochan Jun {reservation.numPeople - 1 > 0 && `+ ${reservation.numPeople - 1}`}</p></div>
                                <div className="descriptionItems"><img src={'/location.png'} alt={'location icon'}/><p>{reservation.location}</p></div>
                                <div className="descriptionItems"><img src={'/person_check.png'} alt={'availability icon'}/><p>{reservation.suny}</p></div>
                                <button className="cancelBtn" onClick={() => handleRemoveReservation(index)}>Cancel</button>
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
