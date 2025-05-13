import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/pages/index';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        uniqueIpCount: 2,
        top3Urls: [{ key: '/home', count: 3 }],
        top3Ips: [{ key: '1.1.1.1', count: 4 }],
      }),
  })
) as jest.Mock;

describe('HomePage', () => {
  it('renders and uploads a file', async () => {
    const mockText = '127.0.0.1 - - [10/Jul/2018:22:21:28 +0200] "GET /home HTTP/1.1" 200 1234';

    const file = new File([mockText], 'test.log', { type: 'text/plain' });
    file.text = jest.fn().mockResolvedValue(mockText);

    render(<HomePage />);   

    const input = screen.getByLabelText(/upload/i); 
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/Unique IPs:/i)).toBeInTheDocument();
      expect(screen.getByText(/\/home \(3\)/)).toBeInTheDocument();
    });
  });
});
