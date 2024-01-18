import React from "react";
import moment from "moment";
import { DayPicker } from "react-day-picker";

const seasonEmoji = {
  winter: "❄️",
  spring: "🌸",
  summer: "🌻",
  autumn: "🍁",
};

const CommitmentCalendar = (props) => {
  const { startDate, selectedDate, setSelectedDate, currentDayCommit } = {
    ...props,
  };
  const [errorState, setErrorState] = React.useState(false);

  const getSeason = (month) => {
    const monthNumber = month.getMonth();
    if (monthNumber >= 0 && monthNumber < 3) return "winter";
    if (monthNumber >= 3 && monthNumber < 6) return "spring";
    if (monthNumber >= 6 && monthNumber < 9) return "summer";
    else return "autumn";
  };

  const formatCaption = (month) => {
    const season = getSeason(month);
    return (
      <span role="img" aria-label={season}>
        {seasonEmoji[season]} {moment(month).format("MMMM YYYY")}
      </span>
    );
  };

  return (
    <DayPicker
      mode="single"
      onSelect={(pickedDate) => {
        // The current day should not be identified as a date in the past - 23:59:59
        const pickedDateTime = new Date(pickedDate).setHours(23, 59, 59);
        // Decline dates in the past.
        if (moment(pickedDateTime).isBefore() || !pickedDate) {
          setErrorState(true);
          setSelectedDate(null);
          return;
        }
        setErrorState(false);

        // Identify if picked date is the current date
        if (pickedDate.toDateString() === new Date().toDateString()) {
          currentDayCommit(true);
        } else {
          currentDayCommit(false);
        }

        setSelectedDate(pickedDate);
      }}
      formatters={{ formatCaption }}
      fromDate={startDate}
      selected={selectedDate}
      footer={
        errorState && (
          <div className="text-xs text-theme-error">
            Selected date must be today or in the future.
          </div>
        )
      }
    />
  );
};

export default CommitmentCalendar;
