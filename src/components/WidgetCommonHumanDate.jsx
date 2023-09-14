const WidgetCommonHumanDate = ({date}) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (typeof date === "string") {
    return <>{new Date(Date.parse(date)).toLocaleString("id-ID", options)}</>;
  }
  if (date) {
    return <>{date.toLocaleString("id-ID", options)}</>;
  }

  return "";
};

export default WidgetCommonHumanDate;
