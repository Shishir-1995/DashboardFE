import { useMemo } from 'react'

import { useIntl } from 'react-intl'

export interface UseLocale {
  formatMessage: (
    id: string,
    params?: Record<string, string | number | undefined>
  ) => string
}

export function useLocale(): UseLocale {
  const intl = useIntl()

  return useMemo(() => {
    return {
      formatMessage: (id, params): string => {
        return intl.formatMessage({ id }, params)
      }
    }
  }, [intl])
}

export type Locale = ReturnType<typeof useLocale>
