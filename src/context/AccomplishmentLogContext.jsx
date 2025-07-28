import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import PropTypes from "prop-types";

const AccomplishmentLogContext = createContext();

export const TimerProvider = ({ children }) => {
  // Initialize state from sessionStorage if available
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isTimedIn, setIsTimedIn] = useState(() =>
    JSON.parse(sessionStorage.getItem("isTimedIn") || "false")
  );
  const [isOnBreak, setIsOnBreak] = useState(() =>
    JSON.parse(sessionStorage.getItem("isOnBreak") || "false")
  );
  const [hoursWorked, setHoursWorked] = useState(() =>
    Number(sessionStorage.getItem("hoursWorked") || 0)
  );
  const [logs, setLogs] = useState(() =>
    JSON.parse(sessionStorage.getItem("logs") || "[]")
  );
  const intervalRef = useRef(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Persist state to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("isTimedIn", JSON.stringify(isTimedIn));
  }, [isTimedIn]);

  useEffect(() => {
    sessionStorage.setItem("isOnBreak", JSON.stringify(isOnBreak));
  }, [isOnBreak]);

  useEffect(() => {
    sessionStorage.setItem("hoursWorked", hoursWorked);
  }, [hoursWorked]);

  useEffect(() => {
    sessionStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  // Handle hours worked timer
  useEffect(() => {
    if (isTimedIn && !isOnBreak) {
      intervalRef.current = setInterval(
        () => setHoursWorked((prev) => prev + 1),
        1000
      );
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimedIn, isOnBreak]);

  const contextValue = React.useMemo(
    () => ({
      currentTime,
      setCurrentTime,
      isTimedIn,
      setIsTimedIn,
      isOnBreak,
      setIsOnBreak,
      hoursWorked,
      setHoursWorked,
      logs,
      setLogs,
    }),
    [currentTime, isTimedIn, isOnBreak, hoursWorked, logs]
  );

  return (
    <AccomplishmentLogContext.Provider value={contextValue}>
      {children}
    </AccomplishmentLogContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useTimer = () => useContext(AccomplishmentLogContext);
