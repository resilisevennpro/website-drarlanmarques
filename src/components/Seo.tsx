import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://drarlanneuro.com';

export const Seo = ({
  title,
  description,
  path,
  canonicalPath,
  image = '/images/wp/drarlan-bg2.webp',
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  /** Use quando a página tem conteúdo duplicado de outra (ex: /bio == /) para apontar o canonical para o original. */
  canonicalPath?: string;
  image?: string;
  jsonLd?: object | object[];
}) => {
  const url = `${SITE_URL}${path}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath ?? path}`;
  const imageUrl = `${SITE_URL}${image}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Dr. Arlan Marques" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

// --- Schema.org reutilizáveis ---

export const SITE_ORIGIN = SITE_URL;

export const physicianSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Arlan Marques',
  image: `${SITE_URL}/images/wp/drarlan-bg10.webp`,
  url: SITE_URL,
  telephone: '+5592991989910',
  medicalSpecialty: ['Neurosurgery', 'PainMedicine'],
  identifier: 'CRM 4962 | RQE 2634',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Coronel Teixeira, 6225',
    addressLocality: 'Manaus',
    addressRegion: 'AM',
    addressCountry: 'BR',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Universidade Federal do Amazonas (UFAM)' },
    { '@type': 'CollegeOrUniversity', name: 'Hospital das Clínicas da USP' },
  ],
  sameAs: ['https://www.instagram.com/dr.arlanmarques/'],
};

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
