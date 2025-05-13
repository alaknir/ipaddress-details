import { generateReport } from '@/lib/report';
import { ParsedLog } from '@/lib/parser';

describe('generateReport', () => {
  const logs: ParsedLog[] = [
    { ip: '1.1.1.1', url: '/home' },
    { ip: '1.1.1.1', url: '/about' },
    { ip: '2.2.2.2', url: '/home' },
    { ip: '3.3.3.3', url: '/home' },
    { ip: '3.3.3.3', url: '/contact' },
  ];

  it('calculates unique IPs, top URLs, and top IPs', () => {
    const report = generateReport(logs);

    expect(report.uniqueIpCount).toBe(3);
    expect(report.top3Urls[0]).toEqual({ key: '/home', count: 3 });
    expect(report.top3Ips[0]).toEqual({ key: '1.1.1.1', count: 2 });
  });
});
