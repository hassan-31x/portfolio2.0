import { getServerSideURL } from '@/utilities/getURL'

export default function StructuredData() {
  const url = getServerSideURL()
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}/#person`,
        name: 'Muhammad Hassan',
        url,
        jobTitle: 'AI Product Engineer',
        sameAs: [
          'https://github.com/hassan-31x',
          'https://www.linkedin.com/in/mhassan31x',
          'https://x.com/hassan_dev31',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        name: 'Muhammad Hassan · AI Product Engineer',
        url,
        inLanguage: 'en',
        author: { '@id': `${url}/#person` },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
