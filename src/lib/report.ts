import { ParsedLog } from './parser';

export function generateReport(logs: ParsedLog[]) {
  const ipCount = new Map<string, number>();
  const urlCount = new Map<string, number>();
  const uniqueIps = new Set<string>();

  for (const log of logs) {
    uniqueIps.add(log.ip);
    ipCount.set(log.ip, (ipCount.get(log.ip) || 0) + 1);
    urlCount.set(log.url, (urlCount.get(log.url) || 0) + 1);
  }

  const top3 = (map: Map<string, number>) =>
    [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, count]) => ({ key, count }));

  return {
    uniqueIpCount: uniqueIps.size,
    top3Urls: top3(urlCount),
    top3Ips: top3(ipCount),
  };
}
