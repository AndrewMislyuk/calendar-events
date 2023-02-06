import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs): string =>
  dayjs(date).format("YYYY.MM.DD");
