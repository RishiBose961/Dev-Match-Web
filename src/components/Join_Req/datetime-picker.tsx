"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"

export default function DateTimePicker({enddate, startdate}: {enddate: string, startdate: string}) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("12:43")

  // Set min and max dates from the requirements
  const minDate = new Date(startdate)
  const maxDate = new Date(enddate)

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
    if (date) {
      const [hours, minutes] = e.target.value.split(":").map(Number)
      const newDate = new Date(date)
      newDate.setHours(hours, minutes)
      setDate(newDate)
    }
  }

//   console.log('====================================');
//   console.log("Selected Date:", date?.toISOString());
//   console.log('====================================');

//   console.log(time);
  

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const [hours, minutes] = time.split(":").map(Number)
      selectedDate.setHours(hours, minutes)
      setDate(selectedDate)
    } else {
      setDate(undefined)
    }
  }

  const formattedDateTime = date ? format(date, "PPP 'at' p") : "Select date and time"

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="space-y-2">
        <Label htmlFor="datetime" className="text-base font-medium">
          Select Date and Time
        </Label>

        <div className="grid gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="datetime"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedDateTime}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date < minDate || date > maxDate}
                initialFocus
              />
              <div className="p-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input type="time" value={time} onChange={handleTimeChange} className="w-full" />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {date && (
        <div className="rounded-lg bg-muted p-3">
          <p className="text-sm font-medium">Selected:</p>
          <p className="text-sm text-muted-foreground">{format(date, "EEEE, MMMM d, yyyy 'at' h:mm a")}</p>
        </div>
      )}
    </div>
  )
}
