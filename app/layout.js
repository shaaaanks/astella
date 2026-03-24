import { Bebas_Neue, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { AuthProvider } from '@/context/AuthContext';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-dm' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Audit AI | Cinematic Website Audit Platform',
  description: 'AI-powered website visualization and audit experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} ${mono.variable}`}>
      <body className="bg-[#050505] text-white">
        <AuthProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
