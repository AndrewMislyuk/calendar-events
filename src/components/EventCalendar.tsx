import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { FC } from "react";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  function dateCellRender(value: Dayjs) {
    const formatedDate = formatDate(value);
    const currentDayEvents = props.events.filter(
      (f: IEvent) => f.date === formatedDate
    );

    return (
      <div>
        {currentDayEvents.map((m: IEvent, index: number) => (
          <div key={index}>{m.description}</div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default EventCalendar;
