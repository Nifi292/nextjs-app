import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Custom input component that only displays the calendar icon
  const CustomInput = ({ value, onClick }) => (
    <div className="custom-datepicker-input" onClick={onClick}>
      <i className="fa fa-calendar" /> {/* Use any calendar icon here */}
    </div>
  );

  // Custom rendering for each day in the calendar
  const renderDayContents = (day) => {
    return day;
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center py-10">
      <div style={{ width: "100%" }}>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          customInput={<CustomInput />}
          renderDayContents={renderDayContents}
          inline
        />
      </div>
    </div>
  );
}