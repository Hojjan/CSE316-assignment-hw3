import React from "react";
import '../cssPages/reservation.css'

function Reservation(){
    return(
        <div>
            <div classNameName="container">
                <div className="menu-container">
                    <select id="facility-select">
                        <option value="Gym">Gym</option>
                        <option value="Auditorium">Auditorium</option>
                        <option value="Swimming Pool">Swimming Pool</option>
                        <option value="Seminar Room">Seminar Room</option>
                        <option value="Conference Room">Conference Room</option>
                        <option value="Library">Library</option>
                    </select>
                </div>

                <div id="imageList" className="facility-info"></div>
            </div>
            <div className="context">
                <div className="date-picker-container">
                    <label htmlFor="date">Date to be Used:</label>
                    <input type="date" id="date-picker" className="date-picker" />
                </div>

                <div className="people-container">
                    <label htmlFor="num-people">Number of People:</label>
                    <input type="text" id="num-people" name="num-people" min="1" max="100" />
                </div>

                <div className="button-container">
                    <p>Are you affiliated with SUNY Korea?</p>
                    <div className="radio-options">
                        <label>
                            <input type="radio" name="affiliated" value="yes" id="yes-option" />
                            Yes
                        </label>
                
                        <label>
                            <input type="radio" name="affiliated" value="no" id="no-option" />
                            No
                        </label>
                    </div>
                </div>

                <div className="text-container">
                    <label htmlFor="user-input">Purpose of Use:</label>
                    <textarea id="user-input"></textarea>
                </div>

                <button type="submit">submit</button>
            </div>
        </div>
        
    );
}

export default Reservation;