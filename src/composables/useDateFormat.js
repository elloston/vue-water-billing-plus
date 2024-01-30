import moment from "moment";

export function useDateFormat() {
  const formatDate = (date, formatType = "ll") => {
    if (date) {
      return moment(String(date)).format(formatType);
    }
  };

  return { formatDate };
}
