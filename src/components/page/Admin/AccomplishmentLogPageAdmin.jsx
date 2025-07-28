import React, { useState } from "react";
import { Timer, NotebookPen, LogOut, Clock, FileText, Users, Calendar, Target, TrendingUp, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import PropTypes from 'prop-types';


// Sample data
const users = [
  {
     id: 1,
    name: "John Doe",
    latestDate: "July 26, 2025",
    timeIn: "8:00 AM",
    timeOut: "6:00 PM",
    totalHours: "9 hrs 0 mns",
    status: "Overtime",
    previousLogs: [
      {
        date: "July 25, 2025",
        timeIn: "8:00 AM",
        timeOut: "5:30 PM",
        totalHours: "8.5 hrs 0 mns",
        status: "On Time",
        details: {
          groupName: "Development Team Alpha",
          typeOfActivity: "Code Review",
          module: "Payment Processing Module",
          activity: "Reviewed pull requests for payment gateway integration...",
          targetEndDate: "July 25, 2025",
          actualEndDate: "July 25, 2025",
          currentStatus: "Completed",
          percentageOfActivity: 100,
          projectLeads: ["Sarah Johnson", "Mike Chen"]
        }
      },
      {
        date: "July 24, 2025",
        timeIn: "8:00 AM",
        timeOut: "6:00 PM",
        totalHours: "9 hrs 0 mns",
        status: "Overtime",
        details: {
          groupName: "Development Team Alpha",
          typeOfActivity: "Feature Development",
          module: "User Authentication Module",
          activity: "Implemented user authentication features including login, registration, and password reset.",
          targetEndDate: "July 24, 2025",
          actualEndDate: "July 24, 2025",
          currentStatus: "In Progress",
          percentageOfActivity: 80,
          projectLeads: ["Mike Chen"]
        }
      },
      {
        date: "July 23, 2025",
        timeIn: "8:30 AM",
        timeOut: "6:00 PM",
        totalHours: "8.5 hrs 0 mns",
        status: "On Time",
        details: {
          groupName: "Development Team Alpha",
          typeOfActivity: "Testing and Debugging",
          module: "Payment Processing Module",
          activity:
            "Conducted unit testing and debugging for the payment processing module. Fixed critical bugs identified during testing.",
          targetEndDate: "July 23, 2025",
          actualEndDate: "July 23, 2025",
          currentStatus: "Completed",
          percentageOfActivity: 100,
          projectLeads: ["Sarah Johnson"]
        }
      }
    ],
  },

  {
    id: 2,
    name: "Jane Smith",
    latestDate: "July 26, 2025",
    timeIn: "8:30 AM",
    timeOut: "6:00 PM",
    totalHours: "8 hrs 30 mns",
    status: "On Time",
    previousLogs: [
      {
        date: "July 25, 2025",
        timeIn: "8:30 AM",
        timeOut: "5:30 PM",
        totalHours: "8 hrs 0 mns",
        status: "On Time",
        details: {
          groupName: "Development Team Beta",
          typeOfActivity: "UI Design Review",
          module: "Dashboard Module",
          activity: "Reviewed UI designs for the new dashboard module and provided feedback to the design team.",
          targetEndDate: "July 25, 2025",
          actualEndDate: "July 25, 2025",
          currentStatus: "Completed",
          percentageOfActivity: 100,
          projectLeads: ["Emily Davis"]
        }
      },
      {
        date: "July 24, 2025",
        timeIn: "8:00 AM",
        timeOut: "6:00 PM",
        totalHours: "10 hrs 0 mns",
        status: "Overtime",
        details: {
          groupName: "Development Team Beta",
          typeOfActivity: "Backend Development",
          module: "Analytics Module",
          activity:
            "Developed backend APIs for the analytics module. Implemented data aggregation and reporting features.",
          targetEndDate: "July 24, 2025",
          actualEndDate: "July 24, 2025",
          currentStatus: "In Progress",
          percentageOfActivity: 70,
          projectLeads: ["Emily Davis", "Michael Brown"]
        }
      },
      {
        date: "July 23, 2025",
        timeIn: "9:00 AM",
        timeOut: "6:00 PM",
        totalHours: "9 hrs 0 mns",
        status: "On Time",
        details: {
          groupName: "Development Team Beta",
          typeOfActivity: "Code Refactoring",
          module: "User Profile Module",
          activity:
            "Refactored user profile module code to improve performance and maintainability. Updated documentation accordingly.",
          targetEndDate: "July 23, 2025",
          actualEndDate: "July 23, 2025",
          currentStatus: "Completed",
          percentageOfActivity: 100,
          projectLeads:["Emily Davis"]
        }
      }
    ],
  }
]

export default function AccomplishmentDashboard() {
  const [expandedLogs, setExpandedLogs] = useState(new Set());

  const toggleLogExpansion = (logId) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  function getCurrentStatusColor(status) {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "Overtime":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Undertime":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "On Time":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Accomplishment Log Dashboard</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>On Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Overtime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Undertime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Today's Logs - {users[0].latestDate}</h2>
          <p className="text-gray-600">Monitor employee attendance and working hours</p>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                  {/* User Name */}
                  <div className="md:col-span-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  </div>

                  {/* Date */}
                  <div className="md:col-span-1">
                    <div className="text-sm">
                      <span className="text-gray-500 block md:hidden">Date:</span>
                      <span className="text-gray-900">{user.latestDate}</span>
                    </div>
                  </div>

                  {/* Time In */}
                  <div className="md:col-span-1">
                    <div className="text-sm">
                      <span className="text-gray-500 block md:hidden">Time In:</span>
                      <span className="text-gray-900 font-medium">{user.timeIn}</span>
                    </div>
                  </div>

                  {/* Time Out */}
                  <div className="md:col-span-1">
                    <div className="text-sm">
                      <span className="text-gray-500 block md:hidden">Time Out:</span>
                      <span className="text-gray-900 font-medium">{user.timeOut}</span>
                    </div>
                  </div>

                  {/* Total Hours */}
                  <div className="md:col-span-1">
                    <div className="text-sm">
                      <span className="text-gray-500 block md:hidden">Total Hours:</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">{user.totalHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-1">
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </div>

                  {/* Logs Button */}
                  <div className="md:col-span-1 flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <FileText className="h-4 w-4" />
                          Logs
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] w-[95vw]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {user.name}'s Previous Logs
                          </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[75vh]">
                          <div className="space-y-4">
                            {user.previousLogs.map((log, index) => {
                              const logId = `${user.id}-${index}`
                              const isExpanded = expandedLogs.has(logId)

                              return (
                                <div key={index}>
                                  <Collapsible open={isExpanded} onOpenChange={() => toggleLogExpansion(logId)}>
                                    <CollapsibleTrigger asChild>
                                      <div className="w-full cursor-pointer hover:bg-gray-50 transition-colors rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                          <div className="grid grid-cols-4 gap-4 flex-1">
                                            <div className="flex items-center gap-2">
                                              <Calendar className="h-4 w-4 text-gray-400" />
                                              <span className="text-sm font-medium text-gray-900">{log.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Clock className="h-4 w-4 text-gray-400" />
                                              <span className="text-sm text-gray-600">{log.totalHours}</span>
                                            </div>
                                            <div>
                                              <Badge size="sm" className={getStatusColor(log.status)}>
                                                {log.status}
                                              </Badge>
                                            </div>
                                            <div className="flex justify-end">
                                              {isExpanded ? (
                                                <ChevronDown className="h-4 w-4 text-gray-400" />
                                              ) : (
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                      <div className="mt-2 border-t bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                          {/* Left Column */} 
                                          <div className="space-y-3">
                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Group Name
                                              </label>
                                              <p className="text-sm text-gray-900">
                                                {log.details?.groupName || "Development Team Alpha"}
                                              </p>
                                            </div>

                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Type of Activity
                                              </label>
                                              <p className="text-sm text-gray-900">
                                                {log.details?.typeOfActivity || "Development"}
                                              </p>
                                            </div>

                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Module
                                              </label>
                                              <p className="text-sm text-gray-900">
                                                {log.details?.module || "User Management System"}
                                              </p>
                                            </div>

                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Target End Date
                                              </label>
                                              <div className="flex items-center gap-2">
                                                <Target className="h-3 w-3 text-gray-400" />
                                                <p className="text-sm text-gray-900">
                                                  {log.details?.targetEndDate || log.date}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right Column */}
                                          <div className="space-y-3">
                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Actual End Date
                                              </label>
                                              <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3 text-gray-400" />
                                                <p className="text-sm text-gray-900">
                                                  {log.details?.actualEndDate || log.date}
                                                </p>
                                              </div>
                                            </div>

                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Current Status
                                              </label>
                                              <Badge
                                                size="sm"
                                                className={getCurrentStatusColor(
                                                  log.details?.currentStatus || "Completed",
                                                )}
                                              >
                                                {log.details?.currentStatus || "Completed"}
                                              </Badge>
                                            </div>

                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Percentage of Activity
                                              </label>
                                              <div className="flex items-center gap-2">
                                                <TrendingUp className="h-3 w-3 text-gray-400" />
                                                <div className="flex items-center gap-2">
                                                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                                                      style={{ width: `${log.details?.percentageOfActivity || 100}%` }}
                                                    ></div>
                                                  </div>
                                                  <span className="text-xs font-medium text-gray-900">
                                                    {log.details?.percentageOfActivity || 100}%
                                                  </span>
                                                </div>
                                              </div>
                                            </div>

                                            <div>
                                              <label className="text-xs font-medium text-gray-700 mb-1 block">
                                                Project Lead(s)
                                              </label>
                                              <div className="flex items-center gap-1 flex-wrap">
                                                <Users className="h-3 w-3 text-gray-400" />
                                                <div className="flex flex-wrap gap-1">
                                                  {(log.details?.projectLeads || ["Sarah Johnson", "Mike Chen"]).map(
                                                    (lead, leadIndex) => (
                                                      <Badge
                                                        key={leadIndex}
                                                        variant="secondary"
                                                        className="text-xs px-2 py-0.5"
                                                      >
                                                        {lead}
                                                      </Badge>
                                                    ),
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Activity Description */}
                                        <div>
                                          <label className="text-xs font-medium text-gray-700 mb-1 block">
                                            Activity Description
                                          </label>
                                          <div className="bg-white rounded border p-3">
                                            <p className="text-sm text-gray-900 leading-relaxed">
                                              {log.details?.activity ||
                                                "Completed assigned development tasks including code implementation, testing, and documentation. Collaborated with team members on project deliverables and participated in code reviews."}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                  {index < user.previousLogs.length - 1 && <Separator className="my-2" />}
                                </div>
                              )
                            })}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">On Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.status === "On Time").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overtime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {users.filter((u) => u.status === "Overtime").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Undertime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {users.filter((u) => u.status === "Undertime").length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

AccomplishmentDashboard.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      latestDate: PropTypes.string.isRequired,
      timeIn: PropTypes.string.isRequired,
      timeOut: PropTypes.string.isRequired,
      totalHours: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['On Time', 'Overtime', 'Undertime']).isRequired,
      previousLogs: PropTypes.array.isRequired
    })
  )
};

