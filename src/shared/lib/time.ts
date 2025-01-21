import { getRuDeclination } from "./delination";

export const timeSpanToString = (timeSpan: string) => {
  const timeArray = timeSpan.split(":").map((x) => parseInt(x));
  const seconds = timeArray[timeArray.length - 1];
  const secondsText = getRuDeclination(seconds, {
    one: "секунда",
    few: "секунды",
    many: "секунд",
  });
  const minutes = timeArray[timeArray.length - 2];
  const minutesText = getRuDeclination(minutes, {
    one: "минута",
    few: "минуты",
    many: "минут",
  });
  const hours = timeArray[timeArray.length - 3];
  const hoursText =
    timeArray.length > 2
      ? getRuDeclination(hours, {
          one: "час",
          few: "часа",
          many: "часов",
        })
      : null;
  const time =
    hours > 0
      ? `${hours} ${hoursText} ${minutes} ${minutesText} ${seconds} ${secondsText}`
      : `${minutes} ${minutesText} ${seconds} ${secondsText}`;

  return time;
};
