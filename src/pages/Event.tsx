import { Button, Row, Modal } from "antd";
import Layout from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    Promise.all([fetchGuests(), fetchEvents(user.username)]);
  }, []);

  const addNewEvent = (event: IEvent) => {
    createEvent(event);
    setModalOpen(false);
  };

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setModalOpen(true)}>Add New Event</Button>
      </Row>
      <Modal
        title="New Event"
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
