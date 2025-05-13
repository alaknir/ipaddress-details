export type ParsedLog = {
    ip: string;
    url: string;
  };
  
  export function parseLogLine(line: string): ParsedLog | null {
    const regex = /^(\d{1,3}(?:\.\d{1,3}){3}).*?"(?:GET|POST) (.*?) HTTP\/\d\.\d"/;
    const match = line.match(regex);
  
    if (!match) return null;
  
    return {
      ip: match[1],
      url: match[2],
    };
  }
  