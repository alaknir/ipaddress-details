import { parseLogLine } from '../lib/parser';

test('parses log line correctly', () => {
  const line = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574`;
  expect(parseLogLine(line)).toEqual({
    ip: '177.71.128.21',
    url: '/intranet-analytics/',
  });
});
