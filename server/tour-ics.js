import { format } from "date-fns";

export function createTourIcs({ parentName, preferredDate, preferredTime }) {
  const start = new Date(`${preferredDate}T${preferredTime}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const dtstamp = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");
  const dtstart = format(start, "yyyyMMdd'T'HHmmss");
  const dtend = format(end, "yyyyMMdd'T'HHmmss");
  const uid = `${dtstart}-${Math.random().toString(36).slice(2)}@springbase.com.ng`;

  const lines = [
    "BEGIN:VCALENDAR",
    "PRODID:-//Springbase Schools//Campus Tour//EN",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    "SUMMARY:Campus Tour - Springbase Schools",
    `DESCRIPTION:Scheduled by ${parentName || "Parent"}. The school will confirm.`,
    "LOCATION:Springbase Schools Campus",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return {
    filename: "springbase-campus-tour.ics",
    content: lines.join("\r\n"),
  };
}


