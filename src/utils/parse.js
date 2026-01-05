export function parseDateString(datetime) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  const formatted = new Intl.DateTimeFormat("ko-KR", options).format(datetime);

  return formatted;
}

export function parsePressData(rawData) {
  return rawData.map((item, index) => ({
    id: index,
    logo: item.logo,
    name: item.press,
  }));
}
