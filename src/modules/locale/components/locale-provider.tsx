import { useEffect, useState } from 'react';

import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';

import { Languages } from '../../../locale/languages';

const cache = createIntlCache();

interface Props {
  children: React.ReactNode;
}

const LocaleProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessage] = useState<Record<string, string>>({});

  useEffect(() => {
    (async function loadLocale(): Promise<void> {
      try {
        const data = await Languages['en-IN'].load();
        setMessage(data.messages);
      } catch (error) {
        console.debug('Something went wrong');
      }
    })();
  }, []);

  const intl = createIntl({ messages, locale: 'en-IN', onError: () => {} }, cache);

  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};

export default LocaleProvider;
