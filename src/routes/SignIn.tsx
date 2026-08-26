import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Field from '../components/Field';
import { PERSONAS } from '../data/personas';
import { withPersona } from '../lib/fix';
import { codeError, isAcceptedCode } from '../lib/signin';
import { resolvePersona } from '../lib/verdict';

export default function SignIn() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(PERSONAS[0].id);
  const [code, setCode] = useState('123456');
  const [submitted, setSubmitted] = useState(false);

  const selected = resolvePersona(selectedId);
  const error = submitted ? codeError(code) : null;

  function signIn() {
    setSubmitted(true);
    if (isAcceptedCode(code)) navigate(withPersona('/verdict', selectedId));
  }

  return (
    <div>
      <h1 className="mb-4 text-display-l text-ink">Sign in</h1>

      <Field label="UAN" value={selected.mockUan} readOnly hint="A demo number. Not a real UAN format." mono />

      <Field
        label="Six-digit code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        inputMode="numeric"
        maxLength={6}
        hint="Any six digits work. No code is sent, and no EPFO system is contacted."
        mono
      />

      {error ? (
        <p role="alert" className="mb-4 text-caption text-uncounted">
          {error}
        </p>
      ) : null}

      <Button onClick={signIn}>Continue</Button>

      <div className="my-6 flex items-center gap-3 text-label uppercase text-ink-3">
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        Or try a scenario
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
      </div>

      <ul>
        {PERSONAS.map((persona) => (
          <li key={persona.id} className="mb-2">
            <button
              type="button"
              onClick={() => {
                setSelectedId(persona.id);
                navigate(withPersona('/verdict', persona.id));
              }}
              className={`flex min-h-touch w-full items-center justify-between gap-3 rounded border-hair p-3 text-left ${
                persona.id === selectedId ? 'border-indigo bg-indigo-bg' : 'border-rule bg-card'
              }`}
            >
              <span>
                <span className="block text-body font-semibold text-ink">{persona.displayName}</span>
                <span className="block text-caption text-ink-2">{persona.scenarioLabel}</span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-body-l text-ink-3">
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
