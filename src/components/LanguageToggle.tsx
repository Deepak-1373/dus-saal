import { useLanguage } from '../i18n/LanguageProvider';

export default function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      lang={lang === 'en' ? 'hi' : 'en'}
      aria-label={t('langSwitchLabel')}
      className="inline-flex min-h-touch min-w-touch items-center justify-center rounded border-hair border-indigo px-2 text-caption font-semibold text-indigo hover:bg-indigo-bg"
    >
      {t('langName')}
    </button>
  );
}
