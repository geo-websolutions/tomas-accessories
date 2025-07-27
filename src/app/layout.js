import "./globals.css";

export const metadata = {
  title: 'Tomas Silver & Accessories | Home',
  description: 'مجدي نسيم للفضة - رائدة في تجارة الفضيات والمجوهرات. اكتشف مجموعتنا الفريدة من الخواتم، الساعات، القلادات والمزيد من الاكسسوارات و الفضة عيار 925.',
  keywords: ['فضة', 'مجوهرات', 'خواتم', 'ساعات', 'قلادات', 'فضة مصرية', 'فضة عيار 925', 'دهب صينى', "اكسسوارات" ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: '',
    title: 'Tomas Silver & Accessories',
    description: 'اكتشف مجموعتنا الفريدة من الاكسسوارات المصنوعة من الذهب الصينى و الفضة عيار 925.',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Tomas Silver & Accessories',
      },
    ],
    siteName: 'Tomas Silver & Accessories',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomas Silver & Accessories',
    description: 'اكتشف مجموعتنا الفريدة من الاكسسوارات المصنوعة من الذهب الصينى و الفضة عيار 925.',
    images: [''],
  },
  other: {
    'font-preload': 'https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap',
  },
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
