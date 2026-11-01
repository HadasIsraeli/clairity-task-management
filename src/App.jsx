import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { SessionProvider } from './state/SessionContext';

export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <AppRouter />
      </SessionProvider>
    </BrowserRouter>
  );
}
