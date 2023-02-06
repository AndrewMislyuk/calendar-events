import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Dayjs } from "dayjs";
import React, { FC, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

interface ISelectOptions {
  value: string;
  label: string;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    guest: "",
    date: "",
    description: "",
  } as IEvent);
  const { user } = useTypedSelector((store) => store.auth);
  const selectOptions: ISelectOptions[] = [];

  props.guests.forEach((m: IUser) => {
    selectOptions.push({
      value: m.username,
      label: m.username,
    });
  });

  const selectDate = (date: Dayjs | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date as Dayjs) });
    }
  };

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event Description"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
          type="text"
        />
      </Form.Item>
      <Form.Item
        label="Event date"
        name="date"
        rules={[rules.required(), rules.isDateAfter("not valid date")]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>

      <Form.Item label="Event guest" name="guest" rules={[rules.required()]}>
        <Select
          onChange={(guest: string) => setEvent({ ...event, guest })}
          options={selectOptions}
        ></Select>
      </Form.Item>

      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
