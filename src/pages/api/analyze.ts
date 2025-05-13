import type { NextApiRequest, NextApiResponse } from 'next';
import { parseLogLine, ParsedLog } from '@/lib/parser';
import { generateReport } from '@/lib/report';

function isParsedLog(log: ParsedLog | null): log is ParsedLog {
  return log !== null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { content } = req.body;
  if (typeof content !== 'string') {
    return res.status(400).json({ error: 'Invalid content' });
  }

  const lines = content.split('\n');
  const parsedLogs = lines.map(parseLogLine).filter(isParsedLog);  
  const report = generateReport(parsedLogs);

  return res.status(200).json(report);
}