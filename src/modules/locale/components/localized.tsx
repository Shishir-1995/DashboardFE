import { FormattedMessage } from 'react-intl'

interface LocalizedProps {
  text: string
  params?: Record<string, string | number | React.ReactNode>
}

const Localized: React.FC<LocalizedProps> = ({ text, params }) => {
  return <FormattedMessage id={text} values={params} />
}

export default Localized
