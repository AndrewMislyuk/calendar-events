import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventsActionEnum, SetEventsAction, SetGuestsAction } from "./type";

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: EventsActionEnum.SET_GUESTS,
    payload,
  }),
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventsActionEnum.SET_EVENTS,
    payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const { data } = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(data));
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") ?? "[]";
      const json = JSON.parse(events) as IEvent[];

      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") ?? "[]";
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(
        (f: IEvent) => f.author === username || f.guest === username
      );
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e);
    }
  },
};
