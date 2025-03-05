function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true,
    timeZone: "Asia/Kuala_Lumpur",
  };

  return new Intl.DateTimeFormat("en-MY", options).format(date);
}

export default formatDateTime;
