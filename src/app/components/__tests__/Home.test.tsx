import { TextEncoder } from 'util';
(global as unknown as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../templates/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
}

describe('Home', () => {
    it('renderiza correctamente el título principal', () => {
        renderWithProviders(<Home />);
        expect(screen.getByText(/Populares/i)).toBeInTheDocument();
    });

    it('renderiza el contenedor principal', () => {
        renderWithProviders(<Home />);
        expect(screen.getByTestId('home-main-container')).toBeInTheDocument();
    });
});
