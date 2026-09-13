import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 95],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
