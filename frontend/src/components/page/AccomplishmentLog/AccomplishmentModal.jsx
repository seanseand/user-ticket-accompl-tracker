import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function AccomplishmentModal({ isOpen, onClose, onSubmit }) {
  const [accomplishment, setAccomplishment] = useState({
    groupName: "",
    activitiesType: "",
    module: "",
    dateAssigned: undefined,
    activities: [],
    targetEndDate: undefined,
    actualEndDate: undefined,
    status: "",
    percentageOfActivities: 0,
    projectHeads: [],
  });

  const [currentProjectHead, setCurrentProjectHead] = useState("");

  const addProjectHead = () => {
    if (
      currentProjectHead.trim() &&
      !accomplishment.projectHeads.includes(currentProjectHead.trim())
    ) {
      setAccomplishment((prev) => ({
        ...prev,
        projectHeads: [...prev.projectHeads, currentProjectHead.trim()],
      }));
      setCurrentProjectHead("");
    }
  };

  const removeProjectHead = (headToRemove) => {
    setAccomplishment((prev) => ({
      ...prev,
      projectHeads: prev.projectHeads.filter((head) => head !== headToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addProjectHead();
    }
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(accomplishment);
    setAccomplishment({
      groupName: "",
      activitiesType: "",
      module: "",
      dateAssigned: undefined,
      activities: [],
      targetEndDate: undefined,
      actualEndDate: undefined,
      status: "",
      percentageOfActivities: 0,
      projectHeads: [],
    });
    setCurrentProjectHead("");
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Daily Accomplishments</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">
                Group Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="groupName"
                value={accomplishment.groupName}
                onChange={(e) =>
                  setAccomplishment((prev) => ({
                    ...prev,
                    groupName: e.target.value,
                  }))
                }
                placeholder="Enter group name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activitiesType">
                Type of Activities<span className="text-red-500">*</span>
              </Label>
              <Select
                value={accomplishment.activitiesType}
                onValueChange={(value) =>
                  setAccomplishment((prev) => ({
                    ...prev,
                    activitiesType: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activities type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brts-preparation">
                    BRTS Preparation
                  </SelectItem>
                  <SelectItem value="brts-testing">BRTS Testing</SelectItem>
                  <SelectItem value="brts-re-testing">
                    BRTS Re-Testing
                  </SelectItem>
                  <SelectItem value="brss-testing">BRSS Testing</SelectItem>
                  <SelectItem value="environment-testing">
                    Environment Testing
                  </SelectItem>
                  <SelectItem value="user-guide-manual">
                    User Guide/Manual Preparation
                  </SelectItem>
                  <SelectItem value="other-activities">
                    Other Activities
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="module">Module</Label>
              <Input
                id="module"
                value={accomplishment.module}
                onChange={(e) =>
                  setAccomplishment((prev) => ({
                    ...prev,
                    module: e.target.value,
                  }))
                }
                placeholder="Enter module name"
              />
            </div>
            <div className="space-y-2">
              <Label>Date Assigned</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {accomplishment.dateAssigned
                      ? format(accomplishment.dateAssigned, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={accomplishment.dateAssigned}
                    onSelect={(date) =>
                      setAccomplishment((prev) => ({
                        ...prev,
                        dateAssigned: date,
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">
              Activities<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="activities"
              value={accomplishment.activities}
              onChange={(e) =>
                setAccomplishment((prev) => ({
                  ...prev,
                  activities: e.target.value,
                }))
              }
              placeholder="Describe your activities for the day..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Target End Date<span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {accomplishment.targetEndDate
                      ? format(accomplishment.targetEndDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={accomplishment.targetEndDate}
                    onSelect={(date) =>
                      setAccomplishment((prev) => ({
                        ...prev,
                        targetEndDate: date,
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>
                Actual End Date<span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {accomplishment.actualEndDate
                      ? format(accomplishment.actualEndDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={accomplishment.actualEndDate}
                    onSelect={(date) =>
                      setAccomplishment((prev) => ({
                        ...prev,
                        actualEndDate: date,
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">
                Current Status<span className="text-red-500">*</span>
              </Label>
              <Select
                value={accomplishment.status}
                onValueChange={(value) =>
                  setAccomplishment((prev) => ({
                    ...prev,
                    status: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="not-yet-started">
                    Not Yet Started
                  </SelectItem>
                  <SelectItem value="reassigned">Reassigned</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">Percentage of Activities (%)</Label>
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                value={accomplishment.percentageOfActivities}
                onChange={(e) =>
                  setAccomplishment((prev) => ({
                    ...prev,
                    percentageOfActivities:
                      Number.parseInt(e.target.value) || 0,
                  }))
                }
                disabled={accomplishment.status !== "ongoing"}
                placeholder="0-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectHeads">
              Project Heads<span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="projectHeads"
                  value={currentProjectHead}
                  onChange={(e) => setCurrentProjectHead(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter project head name and press Enter"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addProjectHead}
                  variant="outline"
                  size="sm"
                >
                  Add
                </Button>
              </div>
              {accomplishment.projectHeads.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {accomplishment.projectHeads.map((head, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {head}
                      <button
                        type="button"
                        onClick={() => removeProjectHead(head)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit & Time Out</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
