//ISO시간대로 저장된 시간을 한국시간대로 변환
export function formatDate(isoString) {
  return new Date(isoString).toLocaleString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function getKoreanDate(date = new Date()) {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
}
