import { Link, Route, Routes } from 'react-router-dom';
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
    <div className="mx-auto max-w-screen-sm px-4 py-6">
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>

      {/* Scaffold route index. DUS-104 replaces this with the real shell. */}
      <nav aria-label="Screens" className="mt-8 border-t pt-4">
        <ul>
          {ROUTES.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className="flex min-h-12 items-center underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
