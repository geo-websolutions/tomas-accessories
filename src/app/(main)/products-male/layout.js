export const metadata = {
  metadataBase: new URL('https://tomas-accessories.vercel.app/'),
  title: 'Tomas Silver & Accessories |  Male Accessories',
  description: 'اكتشف تشكيلتنا الحصرية من الذهب الصيني والفضة عيار 925. قلادات، خواتم، أقراط وأساور بتصاميم فريدة تناسب كل الأذواق.',
  keywords: [
    'ذهب صيني',
    'فضة 925',
    'مجوهرات فاخرة',
    'خواتم فضة',
    'قلادات ذهب صيني',
    'أقراط فاخرة',
    'أساور فضة',
    'اكسسوارات نسائية',
    'مجوهرات توماس',
    'تصاميم فريدة'
  ],
  openGraph: {
    type: 'website',
    url: '/products-male',
    title: 'توماس للذهب الصيني والفضة | تشكيلة المنتجات',
    description: 'تصفح مجموعتنا المتميزة من الذهب الصيني والفضة عيار 925 بأفضل الأسعار وجودة التصنيع',
    images: [
      {
        url: '/assets/icons/logo.png',
        width: 500,
        height: 200,
        alt: 'تشكيلة منتجات توماس من الذهب الصيني والفضة',
      },
    ],
    siteName: 'Tomas Silver & Accessories',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'توماس للذهب الصيني والفضة | تشكيلة المنتجات',
    description: 'تصفح مجموعتنا المتميزة من الذهب الصيني والفضة عيار 925 بأفضل الأسعار وجودة التصنيع',
    images: ['/assets/icons/logo.png'],
  },
  alternates: {
    canonical: '/products',
  },
  other: {
    'product-category': 'jewelry',
    'product-material': 'silver-925, chinese-gold',
  }
};

export default function RootLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
