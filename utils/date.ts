export const formatDate = (
  date: Date | string,
  partial: "year" | "month" | "day" | "full" = "full",
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const baseOptions: Record<typeof partial, Intl.DateTimeFormatOptions> = {
    year: { year: "numeric" },
    month: { month: "long" },
    day: { day: "2-digit" },
    full: {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  };

  const formatOptions = options || baseOptions[partial];

  return dateObj.toLocaleDateString("en-EN", formatOptions);
};
