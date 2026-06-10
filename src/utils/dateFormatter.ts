export function formatEventDates(startDateStr: string, endDateStr?: string) {
  const timeZone = "America/Tegucigalpa";
  const start = new Date(startDateStr);

  const getParts = (d: Date) => {
    const day = d.toLocaleDateString("es-MX", { timeZone, day: "numeric" });
    const month = d.toLocaleDateString("es-MX", { timeZone, month: "long" });
    const year = d.toLocaleDateString("es-MX", { timeZone, year: "numeric" });
    const weekday = d.toLocaleDateString("es-MX", { timeZone, weekday: "long" });
    
    let weekdayShort = d.toLocaleDateString("es-MX", { timeZone, weekday: "short" });
    let monthShort = d.toLocaleDateString("es-MX", { timeZone, month: "short" });
    
    // Clean potential trailing dots
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

  const end = new Date(endDateStr);
  const startDayStr = start.toLocaleDateString("en-CA", { timeZone });
  const endDayStr = end.toLocaleDateString("en-CA", { timeZone });

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
