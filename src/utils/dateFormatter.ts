/**
 * Parses a date string as a UTC calendar date (midnight UTC).
 *
 * TinaCMS stores dates as UTC ISO strings (e.g. "2026-06-18T05:32:25.551Z").
 * Calling `new Date(str)` and then formatting with a UTC-6 timezone would shift
 * the date back to June 17. By extracting just the YYYY-MM-DD portion and
 * parsing it at midnight UTC, we preserve the intended calendar date regardless
 * of the local timezone.
 */
function parseDateUTC(dateStr: string): Date {
  // Extract YYYY-MM-DD from ISO string or plain date string
  const datePart = dateStr.split("T")[0];
  return new Date(datePart + "T00:00:00Z");
}

export function formatEventDates(startDateStr: string, endDateStr?: string) {
  const timeZone = "UTC"; // Parse as UTC calendar date to avoid timezone shift
  const start = parseDateUTC(startDateStr);

  const getParts = (d: Date) => {
    const day = d.toLocaleDateString("es-MX", { timeZone, day: "numeric" });
    const month = d.toLocaleDateString("es-MX", { timeZone, month: "long" });
    const year = d.toLocaleDateString("es-MX", { timeZone, year: "numeric" });
    const weekday = d.toLocaleDateString("es-MX", { timeZone, weekday: "long" });

    let weekdayShort = d.toLocaleDateString("es-MX", { timeZone, weekday: "short" });
    let monthShort = d.toLocaleDateString("es-MX", { timeZone, month: "short" });

    // Clean potential trailing dots (e.g. "mié." -> "mié")
    weekdayShort = weekdayShort.replace(/\.$/, "");
    monthShort = monthShort.replace(/\.$/, "");

    return { day, month, year, weekday, weekdayShort, monthShort };
  };

  const startParts = getParts(start);

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (!endDateStr) {
    const w = cap(startParts.weekday);
    const m = cap(startParts.month);
    const mShort = cap(startParts.monthShort);
    const wShort = cap(startParts.weekdayShort);

    return {
      weekday: w,
      fullDate: `${startParts.day} de ${m} de ${startParts.year}`,
      cardDate: `${wShort} ${startParts.day} de ${mShort}`,
      archiveDate: `${startParts.day} de ${mShort}, ${startParts.year}`,
    };
  }

  const end = parseDateUTC(endDateStr);
  // Compare calendar dates (YYYY-MM-DD) in UTC
  const startDayStr = start.toISOString().slice(0, 10);
  const endDayStr = end.toISOString().slice(0, 10);

  if (startDayStr === endDayStr) {
    const w = cap(startParts.weekday);
    const m = cap(startParts.month);
    const mShort = cap(startParts.monthShort);
    const wShort = cap(startParts.weekdayShort);

    return {
      weekday: w,
      fullDate: `${startParts.day} de ${m} de ${startParts.year}`,
      cardDate: `${wShort} ${startParts.day} de ${mShort}`,
      archiveDate: `${startParts.day} de ${mShort}, ${startParts.year}`,
    };
  }

  const endParts = getParts(end);

  const startW = cap(startParts.weekday);
  const endW = cap(endParts.weekday);
  const startM = cap(startParts.month);
  const endM = cap(endParts.month);
  const startMShort = cap(startParts.monthShort);
  const endMShort = cap(endParts.monthShort);

  if (startParts.year === endParts.year) {
    if (startParts.month === endParts.month) {
      return {
        weekday: `${startW} a ${endW}`,
        fullDate: `${startParts.day} al ${endParts.day} de ${startM} de ${startParts.year}`,
        cardDate: `${startParts.day} - ${endParts.day} de ${startMShort}`,
        archiveDate: `${startParts.day} al ${endParts.day} de ${startMShort}, ${startParts.year}`,
      };
    } else {
      return {
        weekday: `${startW} a ${endW}`,
        fullDate: `${startParts.day} de ${startM} al ${endParts.day} de ${endM} de ${startParts.year}`,
        cardDate: `${startParts.day} de ${startMShort} - ${endParts.day} de ${endMShort}`,
        archiveDate: `${startParts.day} de ${startMShort} al ${endParts.day} de ${endMShort}, ${startParts.year}`,
      };
    }
  } else {
    return {
      weekday: `${startW} a ${endW}`,
      fullDate: `${startParts.day} de ${startM} de ${startParts.year} al ${endParts.day} de ${endM} de ${endParts.year}`,
      cardDate: `${startParts.day} de ${startMShort} ${startParts.year} - ${endParts.day} de ${endMShort} ${endParts.year}`,
      archiveDate: `${startParts.day} de ${startMShort} ${startParts.year} al ${endParts.day} de ${endMShort} ${endParts.year}`,
    };
  }
}

/**
 * Extracts YYYY-MM-DD from a TinaCMS ISO date string without timezone conversion.
 * Use this for date comparisons in filtering logic.
 */
export function toCalendarDate(dateStr: string): string {
  return dateStr.split("T")[0];
}
