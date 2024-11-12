import { parseAsString, useQueryState } from "nuqs";

export function useCalendarEventDisclosure() {
  const [selectedDate, setSelectedDate] = useQueryState(
    "selectedDate",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  return {
    selectedDate,
    setSelectedDate,
  };
}
