/**
 * Returns the current time formatted in 24-hour HH:MM format.
 */
export const formatTimeHrMin = (date: Date) => {
    return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
};
