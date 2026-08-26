import { Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import About from './routes/About';
import Fix from './routes/Fix';
import Landing from './routes/Landing';
import SignIn from './routes/SignIn';
import Timeline from './routes/Timeline';
import Tracker from './routes/Tracker';
import Verdict from './routes/Verdict';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verdict" element={<Verdict />} />
        <Route path="/fix/:checkId" element={<Fix />} />
        <Route path="/fix" element={<Fix />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AppShell>
  );
}
