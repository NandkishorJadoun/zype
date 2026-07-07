export const formatTime = (date: Date) => {
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    } as const;

    return new Date(date).toLocaleTimeString(
        "en-US",
        options,
    );
} 