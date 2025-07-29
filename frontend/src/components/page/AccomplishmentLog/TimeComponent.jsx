import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, Play, Pause, Coffee, StopCircle } from "lucide-react";
import AccomplishmentModal from "./AccomplishmentModal";
import { useTimer } from "@/context/AccomplishmentLogContext";

const TimeComponent = () => {
  const {
    currentTime,
    isTimedIn,
    setIsTimedIn,
    isOnBreak,
    setIsOnBreak,
    hoursWorked,
    setHoursWorked,
    logs,
    setLogs,
  } = useTimer();

  const [isTimeOutModalOpen, setIsTimeOutModalOpen] = useState(false);

  const addLog = (message) => {
    const newLog = {
      id: Date.now().toString(),
      message,
      timestamp: currentTime.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleTimeInOut = () => {
    if (isTimedIn) {
      setIsTimeOutModalOpen(true);
    } else {
      setIsTimedIn(true);
      addLog("**User** has timed in");
    }
  };

  const handleAccomplishmentSubmit = () => {
    setIsTimedIn(false);
    setIsOnBreak(false);
    addLog("**User** has timed out and submitted daily accomplishments");
    setHoursWorked(0);
    setIsTimeOutModalOpen(false);
  };

  const handleBreak = () => {
    if (isOnBreak) {
      setIsOnBreak(false);
      addLog("**User**  has ended break");
    } else {
      setIsOnBreak(true);
      addLog("**User** has started break");
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatCurrentTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Time Display Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Current Time</span>
            </div>
            <div className="text-3xl font-mono font-bold">
              {formatCurrentTime(currentTime)}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Hours Worked Today
              </div>
              <div className="text-4xl font-mono font-bold text-primary">
                {formatTime(hoursWorked)}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                {isTimedIn && (
                  <>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isOnBreak ? "bg-yellow-500" : "bg-green-500"
                      }`}
                    />
                    <span>{isOnBreak ? "On Break" : "Working"}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <Card>
        <CardContent className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isTimedIn ? (
              <Button
                onClick={handleTimeInOut}
                size="lg"
                variant="destructive"
                className="h-16 text-lg font-semibold"
              >
                <StopCircle className="mr-2 h-5 w-5" />
                Time Out
              </Button>
            ) : (
              <Button
                onClick={handleTimeInOut}
                size="lg"
                variant="default"
                className="h-16 text-lg font-semibold bg-green-500 hover:bg-green-700"
              >
                <Play className="mr-2 h-5 w-5" />
                Time In
              </Button>
            )}

            <Button
              onClick={handleBreak}
              size="lg"
              variant={isOnBreak ? "secondary" : "outline"}
              disabled={!isTimedIn}
              className="h-16 text-lg font-semibold"
            >
              {isOnBreak ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  End Lunch Break
                </>
              ) : (
                <>
                  <Coffee className="mr-2 h-5 w-5" />
                  Start Lunch Break
                </>
              )}
            </Button>
          </div>
          {isTimedIn && (
            <AccomplishmentModal
              isOpen={isTimeOutModalOpen}
              onClose={() => setIsTimeOutModalOpen(false)}
              onSubmit={handleAccomplishmentSubmit}
            />
          )}
        </CardContent>
      </Card>

      {/* Activity Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full">
            {logs.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No activity logged yet
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex justify-between items-start p-3 bg-muted/50 rounded-lg"
                  >
                    <span className="text-sm">{log.message}</span>
                    <span className="text-xs text-muted-foreground font-mono ml-4 flex-shrink-0">
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeComponent;
