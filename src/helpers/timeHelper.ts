function extractDateAndTime(isoString: string) {
    const dateObj = new Date(isoString);
  
    // Date: "Oct 12, 2023"
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const date = dateObj.toLocaleDateString('en-US', dateOptions);
  
    // Time: "8:19 AM"
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    const time = dateObj.toLocaleTimeString('en-US', timeOptions);
  
    return { date, time };
  }
export const timeHelper = {
    
}  