/**
 * SEO Component
 * Manages document head for SEO
 */

import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title = 'Glowlogy - Premium Spa & Wellness',
  description = 'Experience tranquility and rejuvenation at Glowlogy. Premium spa and wellness services for your complete well-being.',
  image = '/og-image.jpg',
  url = '',
}) => {
  const siteUrl = 'https://glowlogy.com';
  const fullUrl = `${siteUrl}${url}`;
  const fullTitle = title.includes('Glowlogy') ? title : `${title} | Glowlogy`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Additional */}
      <meta name="theme-color" content="#8B5A2B" />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
