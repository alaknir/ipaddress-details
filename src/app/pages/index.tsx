import { useState } from 'react';

export default function HomePage() {
  const [report, setReport] = useState<any>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text }),
    });

    const json = await res.json();
    setReport(json);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Log Analyzer</h1>
      <input type="file" accept=".log" onChange={handleFileChange} className="mb-4" />
      {report && (
        <div className="mt-4">
          <p><strong>Unique IPs:</strong> {report.uniqueIpCount}</p>
          <p><strong>Top 3 URLs:</strong></p>
          <ul>{report.top3Urls.map((u: any, i: number) => <li key={i}>{u.key} ({u.count})</li>)}</ul>
          <p><strong>Top 3 IPs:</strong></p>
          <ul>{report.top3Ips.map((ip: any, i: number) => <li key={i}>{ip.key} ({ip.count})</li>)}</ul>
        </div>
      )}
    </div>
  );
}
