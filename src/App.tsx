import { Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import TextLink from './components/TextLink';
import About from './routes/About';
import Fix from './routes/Fix';
import Landing from './routes/Landing';
import SignIn from './routes/SignIn';
import Timeline from './routes/Timeline';
import Tracker from './routes/Tracker';
import Verdict from './routes/Verdict';

const ROUTES = [
  { path: '/', label: 'Landing', element: <Landing /> },
  { path: '/sign-in', label: 'Sign in', element: <SignIn /> },
  { path: '/verdict', label: 'The verdict', element: <Verdict /> },
  { path: '/fix', label: 'Fix the broken condition', element: <Fix /> },
  { path: '/timeline', label: 'Employment timeline', element: <Timeline /> },
  { path: '/tracker', label: 'Tracker', element: <Tracker /> },
  { path: '/about', label: 'About', element: <About /> },
];

export default function App() {
  return (
    <AppShell>
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {/* DUS-202 fills this in; the verdict's rows already route here. */}
        <Route path="/fix/:checkId" element={<Fix />} />
      </Routes>

      {/* Scaffold route index. DUS-301 replaces this with the real landing screen. */}
      <nav aria-label="Screens" className="mt-10 border-t border-rule pt-4">
        <ul>
          {ROUTES.map(({ path, label }) => (
            <li key={path}>
              <TextLink to={path}>{label}</TextLink>
            </li>
          ))}
        </ul>
      </nav>
    </AppShell>
  );
}
