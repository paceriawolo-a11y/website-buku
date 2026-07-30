'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  List,
  Sparkles,
  Mail,
  MapPin,
  Phone,
  Menu,
  ArrowRight,
  Mountain,
  FlaskConical,
  Scale,
  Building2,
  Heart,
  Landmark,
  Loader2,
  FileText,
} from 'lucide-react';

interface Section {
  type: 'prolog' | 'epilog' | 'chapter';
  label: string;
  title: string;
  number: number | null;
  content: string;
}

interface BookData {
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  year: number;
  frontMatter: string;
  sections: Section[];
}

interface BookCatalogItem {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  coverImage: string;
  dataFile: string;
  icon: 'novel' | 'corporate';
  badge?: string;
}

const BOOKS: BookCatalogItem[] = [
  {
    id: 'nikel-merah-putih',
    title: 'Nikel Merah Putih',
    subtitle: 'Sebuah Novel',
    author: 'Ihwan Kadir',
    description: 'Novel fiksi sosial-politik tentang konflik tambang nikel, perjuangan rakyat, dan harga kedaulatan di tanah Sulawesi.',
    coverImage: '/nikel-merah-putih-cover.png',
    dataFile: '/book-data.json',
    icon: 'novel',
    badge: 'Novel',
  },
  {
    id: 'jiwa-nwm-corp',
    title: 'Jiwa NWM Corp',
    subtitle: 'The Soul of an Indonesian Industrial Civilization',
    author: 'Ihwan Kadir',
    description: 'Corporate Bible NWM Corp — filosofi, sejarah, manifesto, konstitusi, dan visi perusahaan yang diceritakan dalam novel Nikel Merah Putih.',
    coverImage: '',
    dataFile: '/nwm-corp-data.json',
    icon: 'corporate',
    badge: 'Profil Perusahaan',
  },
];

/* ================================================================
   NAVBAR
   ================================================================ */
function Navbar({
  onReadClick,
  isReading,
  onBackToLanding,
}: {
  onReadClick: () => void;
  isReading: boolean;
  onBackToLanding: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isReading) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isReading]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isReading
          ? 'border-b border-amber-glow/10 bg-dark-deeper/95 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <button
          onClick={isReading ? onBackToLanding : undefined}
          className="flex items-center gap-2 group"
        >
          <BookOpen className="h-5 w-5 text-amber-glow" />
          <span className="text-lg font-bold tracking-tight text-warm-white">
            IHWAN <span className="text-red-accent">KADIR</span>
          </span>
        </button>

        {!isReading && (
          <>
            <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
              <a
                href="#sinopsis"
                className="hover:text-amber-glow transition-colors duration-200"
              >
                Sinopsis
              </a>
              <a
                href="#koleksi"
                className="hover:text-amber-glow transition-colors duration-200"
              >
                Koleksi
              </a>
              <a
                href="#tema"
                className="hover:text-amber-glow transition-colors duration-200"
              >
                Tema
              </a>
              <a
                href="#tentang"
                className="hover:text-amber-glow transition-colors duration-200"
              >
                Penulis
              </a>
              <a
                href="#pesan"
                className="hover:text-amber-glow transition-colors duration-200"
              >
                Pesan Buku
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={onReadClick}
                size="sm"
                className="bg-amber-glow hover:bg-amber-glow/90 text-dark-deeper font-semibold text-sm px-4"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Baca Gratis
              </Button>
              <button
                className="md:hidden text-muted-foreground hover:text-warm-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </>
        )}
      </div>

      {!isReading && mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-glow/10 bg-dark-deeper/95 backdrop-blur-xl px-6 py-4 space-y-3 animate-fade-in-up">
          <a
            href="#sinopsis"
            className="block text-sm text-muted-foreground hover:text-amber-glow transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sinopsis
          </a>
          <a
            href="#koleksi"
            className="block text-sm text-muted-foreground hover:text-amber-glow transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Koleksi
          </a>
          <a
            href="#tema"
            className="block text-sm text-muted-foreground hover:text-amber-glow transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tema Novel
          </a>
          <a
            href="#tentang"
            className="block text-sm text-muted-foreground hover:text-amber-glow transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tentang Penulis
          </a>
          <a
            href="#pesan"
            className="block text-sm text-muted-foreground hover:text-amber-glow transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pesan Buku
          </a>
          <button
            className="block w-full text-left text-sm text-amber-glow font-semibold hover:text-amber-glow/80 transition-colors"
            onClick={() => {
              onReadClick();
              setMobileMenuOpen(false);
            }}
          >
            Baca Gratis
          </button>
        </div>
      )}
    </nav>
  );
}

/* ================================================================
   HERO SECTION
   ================================================================ */
function HeroSection({ onReadClick }: { onReadClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-deeper via-dark-surface to-dark-deeper" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-glow/5 blur-[120px] animate-subtle-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-red-accent/5 blur-[100px] animate-subtle-glow"
        style={{ animationDelay: '1.5s' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Column */}
        <div className="flex-1 text-center lg:text-left">
          <div className="animate-fade-in-up">
            <p className="text-amber-glow text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Novel karya Ihwan Kadir
            </p>
          </div>
          <h1 className="animate-fade-in-up-delay-1 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-2">
            <span className="text-warm-white">NIKEL</span>
            <br />
            <span className="text-red-accent">MERAH</span>{' '}
            <span className="text-warm-white">PUTIH</span>
          </h1>
          <div className="animate-fade-in-up-delay-2 mt-6">
            <div className="inline-block border-l-2 border-amber-glow/60 pl-4">
              <p className="text-lg sm:text-xl text-muted-foreground italic font-light">
                &ldquo;Kedaulatan tidak diberikan. Ia diperjuangkan.&rdquo;
              </p>
            </div>
          </div>
          <p className="animate-fade-in-up-delay-2 mt-6 text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Sebuah novel fiksi sosial-politik yang mengisahkan konflik tambang nikel,
            perjuangan rakyat, dan harga kedaulatan di tanah Sulawesi.
          </p>
          <div className="animate-fade-in-up-delay-3 mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button
              onClick={onReadClick}
              size="lg"
              className="bg-amber-glow hover:bg-amber-glow/90 text-dark-deeper font-bold text-base px-8 h-12 shadow-lg shadow-amber-glow/20 hover:shadow-amber-glow/30 transition-shadow"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Baca Gratis
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-amber-glow/30 text-amber-glow hover:bg-amber-glow/10 hover:text-amber-glow font-semibold text-base px-8 h-12 transition-colors"
            >
              <a href="#sinopsis">
                Baca Sinopsis
                <ChevronDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Book Cover Column */}
        <div className="animate-fade-in-up-delay-2 flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-8 rounded-2xl bg-amber-glow/10 blur-2xl" />
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-amber-glow/20 to-red-accent/10 blur-xl" />
            <div className="relative animate-float">
              <Image
                src="/nikel-merah-putih-cover.png"
                alt="Sampul buku Nikel Merah Putih karya Ihwan Kadir"
                width={320}
                height={480}
                className="rounded-lg shadow-2xl shadow-black/60 w-[260px] sm:w-[320px] h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-amber-glow/50" />
      </div>
    </section>
  );
}

/* ================================================================
   SINOPSIS SECTION
   ================================================================ */
function SinopsisSection() {
  return (
    <section id="sinopsis" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-deeper via-dark-surface to-dark-deeper" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <p className="text-amber-glow text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Tentang Buku
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white">Sinopsis</h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-amber-glow/50" />
        </div>
        <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
          <p>
            Di tanah Sulawesi yang kaya akan nikel, sebuah pabrik smelter raksasa berdiri megah —
            menyala di kegelapan malam seperti kota yang tak pernah tidur. Di balik kilau logam dan
            janji kemakmuran, tersembunyi cerita-cerita yang jarang terdengar: air sungai yang pernah
            jernih kini keruh, tanah yang pernah subur perlahan mengering, dan rakyat kecil yang
            terjepit di antara derap industri dan kehidupan yang mereka kenal.
          </p>
          <p>
            <span className="text-warm-white font-medium">Nikel Merah Putih</span> mengisahkan
            perjalanan tokoh-tokoh yang terjebak dalam pusaran konflik antara kepentingan korporasi,
            ambisi politik, dan survival masyarakat adat. Dari laboratorium penelitian hingga ruang
            rapat direksi, dari pinggir sungai yang tercemar hingga gedung-gedung ibu kota — novel
            ini menyorot sisi gelap industri ekstraktif yang mempengaruhi jutaan kehidupan.
          </p>
          <p>
            Lebih dari sekadar cerita tentang tambang, ini adalah narasi tentang{' '}
            <span className="text-amber-glow">kedaulatan</span> — atas tanah, atas sumber daya,
            atas masa depan suatu bangsa. Ketika sebuah negara mengandalkan kekayaan alamnya, siapa
            sesungguhnya yang berdaulat?
          </p>
        </div>

        {/* Theme Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: '🏭',
              title: 'Industri & Lingkungan',
              desc: 'Dampak smelter nikel terhadap ekosistem dan kehidupan masyarakat sekitar tambang',
            },
            {
              icon: '⚔️',
              title: 'Konflik & Kedaulatan',
              desc: 'Perjuangan rakyat melawan korporasi besar dan taruhan politik di balik tambang',
            },
            {
              icon: '🌍',
              title: 'Indonesia Kontemporer',
              desc: 'Cerminan realitas industri ekstraktif di era modern Indonesia',
            },
          ].map((theme) => (
            <div
              key={theme.title}
              className="rounded-xl border border-amber-glow/10 bg-dark-surface/50 p-6 hover:border-amber-glow/25 hover:bg-dark-surface/80 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{theme.icon}</div>
              <h3 className="text-warm-white font-semibold mb-2">{theme.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{theme.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   HIGHLIGHTS SECTION (Statistics)
   ================================================================ */
function HighlightsSection() {
  const stats = [
    { number: '42', label: 'Bagian', desc: '1 Prolog, 40 Bab, dan 1 Epilog — alur yang padat dan menegangkan' },
    { number: '54.600+', label: 'Kata', desc: 'Narasi mendalam yang mengajak pembaca merasakan tanah Sulawesi' },
    { number: '2026', label: 'Terbit', desc: 'Karya terbaru yang relevan dengan isu terkini Indonesia' },
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-dark-deeper" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((item) => (
            <div key={item.label} className="space-y-2">
              <p className="text-4xl sm:text-5xl font-black text-amber-glow">{item.number}</p>
              <p className="text-warm-white font-semibold text-lg">{item.label}</p>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   BOOKSHELF SECTION
   ================================================================ */
function BookshelfSection({ onReadBook }: { onReadBook: (bookId: string) => void }) {
  return (
    <section id="koleksi" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-deeper via-dark-surface to-dark-deeper" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-amber-glow text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Karya Lengkap
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white">Koleksi Buku</h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-amber-glow/50" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Jelajahi karya-karya Ihwan Kadir — dari novel fiksi hingga dokumen
            korporasi yang menjadi bagian dari dunia cerita.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BOOKS.map((book) => (
            <div
              key={book.id}
              className="group relative rounded-2xl border border-amber-glow/10 bg-dark-surface/30 p-6 sm:p-8 hover:border-amber-glow/25 hover:bg-dark-surface/60 transition-all duration-300 flex flex-col sm:flex-row gap-6"
            >
              <div className="flex-shrink-0">
                {book.coverImage ? (
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-lg bg-amber-glow/10 blur-lg" />
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={140}
                      height={200}
                      className="relative rounded-md shadow-xl w-[120px] sm:w-[140px] h-auto"
                    />
                  </div>
                ) : (
                  <div className="w-[120px] sm:w-[140px] h-[190px] sm:h-[200px] rounded-lg bg-gradient-to-br from-amber-glow/20 via-dark-surface to-red-accent/10 border border-amber-glow/20 flex flex-col items-center justify-center gap-3">
                    <Building2 className="h-12 w-12 text-amber-glow/60" />
                    <span className="text-amber-glow/80 text-xs font-semibold tracking-wider uppercase px-3 text-center">
                      {book.badge}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  {book.badge && (
                    <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-amber-glow bg-amber-glow/10 px-2.5 py-1 rounded-full mb-3">
                      {book.badge}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-warm-white mb-1">
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground/70 text-sm italic mb-1">
                    {book.subtitle}
                  </p>
                  <p className="text-amber-glow/80 text-xs font-medium mb-4">
                    {book.author}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {book.description}
                  </p>
                </div>
                <div className="mt-5">
                  <Button
                    onClick={() => onReadBook(book.id)}
                    size="sm"
                    className="w-full sm:w-auto bg-amber-glow hover:bg-amber-glow/90 text-dark-deeper font-semibold text-sm"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Baca Gratis
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TEMA NOVEL SECTION (NEW)
   ================================================================ */
function TemaSection() {
  const themes = [
    {
      icon: Mountain,
      title: 'Tambang & Kedaulatan',
      desc: 'Pertaruhan tanah adat dan sumber daya alam antara kepentingan korporasi global dan hak masyarakat lokal di Sulawesi Tenggara.',
    },
    {
      icon: FlaskConical,
      title: 'Riset & Kebenaran',
      desc: 'Perjuangan seorang peneliti yang mencari kebenaran ilmiah di tengah tekanan politik dan kepentingan bisnis yang membutakan.',
    },
    {
      icon: Scale,
      title: 'Politik & Korporasi',
      desc: 'Gelimang kekuasaan di ruang rapat direksi dan ruang legislatif, di mana keputusan besar diambil tanpa suara rakyat.',
    },
    {
      icon: Heart,
      title: 'Cinta & Pengorbanan',
      desc: 'Ikatan manusia yang teruji oleh konflik — antara cinta tanah air, cinta keluarga, dan cinta yang tak pernah dinamai.',
    },
    {
      icon: Building2,
      title: 'Industri & Lingkungan',
      desc: 'Dampak smelter nikel terhadap sungai, udara, dan kehidupan masyarakat yang bergantung pada alam — sebuah dilema pembangunan.',
    },
    {
      icon: Landmark,
      title: 'Warisan & Masa Depan',
      desc: 'Surat yang tak sampai, kotak logam berisi rahasia, dan pertanyaan yang diwariskan lintas generasi tentang makna keadilan.',
    },
  ];

  return (
    <section id="tema" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-deeper via-dark-surface to-dark-deeper" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-amber-glow text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Lapisan Cerita
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white">Tema Novel</h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-amber-glow/50" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Nikel Merah Putih bukan sekadar cerita tentang tambang. Ia adalah jalinan tema yang
            saling bertautan — membentuk gambaran utuh tentang Indonesia kontemporer.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.title}
                className="group rounded-xl border border-amber-glow/10 bg-dark-surface/30 p-6 hover:border-amber-glow/25 hover:bg-dark-surface/70 transition-all duration-300"
              >
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-amber-glow/10 text-amber-glow group-hover:bg-amber-glow/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-warm-white font-semibold mb-2">{theme.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{theme.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   AUTHOR SECTION
   ================================================================ */
function AuthorSection() {
  return (
    <section id="tentang" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-deeper via-dark-surface to-dark-deeper" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <p className="text-amber-glow text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Penulis
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white">
            Tentang Ihwan Kadir
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-amber-glow/50" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-amber-glow/10 blur-lg" />
              <Image
                src="/foto-penulis.png"
                alt="Ihwan Kadir"
                width={160}
                height={160}
                className="relative w-40 h-40 rounded-full object-cover border-2 border-amber-glow/20"
              />
            </div>
          </div>
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-2xl font-bold text-warm-white">Ihwan Kadir</h3>
            <p className="text-amber-glow font-medium">Penulis & Pegiat Sosial</p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ihwan Kadir adalah penulis Indonesia yang mengangkat isu-isu sosial, politik, dan
                lingkungan hidup melalui karya fiksinya. Dengan latar belakang yang dekat dengan
                realitas masyarakat di wilayah pertambangan, ia mampu menyajikan cerita yang autentik
                dan menyentuh.
              </p>
              <p>
                <span className="text-warm-white italic">Nikel Merah Putih</span> adalah karya
                terbarunya yang lahir dari pengamatan panjang terhadap dampak industri nikel di
                Indonesia — sebuah narasi fiksi yang terinspirasi dari kisah nyata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ORDER SECTION
   ================================================================ */
function OrderSection() {
  return (
    <section id="pesan" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-deeper via-dark-surface to-dark-deeper" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-glow/5 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="mb-12">
          <Sparkles className="mx-auto h-8 w-8 text-amber-glow mb-4" />
          <p className="text-amber-glow text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Dukung Penulis
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-4">
            Pesan Buku Fisik
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Baca gratis di sini, atau dukung penulis dengan memesan buku fisiknya.
            Setiap pembelian mendukung kelangsungan karya sastra Indonesia.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-500 text-white font-bold text-base px-8 h-14 w-full sm:w-auto shadow-lg shadow-green-600/20 hover:shadow-green-500/30 transition-shadow"
          >
            <a
              href="https://wa.me/6281241684750?text=Halo%2C%20saya%20tertarik%20memesan%20buku%20Nikel%20Merah%20Putih%20karya%20Ihwan%20Kadir"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Pesan via WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-amber-glow/30 text-amber-glow hover:bg-amber-glow/10 hover:text-amber-glow font-semibold text-base px-8 h-14 w-full sm:w-auto transition-colors"
          >
            <a href="mailto:ihwankadir@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Hubungi via Email
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
  return (
    <footer className="relative border-t border-amber-glow/10 bg-dark-deeper">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <BookOpen className="h-4 w-4 text-amber-glow" />
              <span className="font-bold text-warm-white">
                IHWAN <span className="text-red-accent">KADIR</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Penulis novel Indonesia. Mengangkat isu sosial, politik, dan lingkungan
              melalui fiksi yang bermakna.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span>0812-4168-4750</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              <span>ihwankadir@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>Sulawesi Tenggara, Indonesia</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-amber-glow/5 text-center">
          <p className="text-muted-foreground/50 text-xs">
            &copy; {new Date().getFullYear()} Ihwan Kadir. Semua hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   BOOK READER
   ================================================================ */
function BookReader({
  bookData,
  onBack,
}: {
  bookData: BookData;
  onBack: () => void;
}) {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalItems = bookData.sections.length + 1;

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    if (scrollHeight === clientHeight) {
      setReadingProgress(100);
      return;
    }
    setReadingProgress(
      Math.min((scrollTop / (scrollHeight - clientHeight)) * 100, 100),
    );
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setReadingProgress(0);
  }, [currentSection]);

  const goNext = () => {
    if (currentSection < totalItems - 1) setCurrentSection(currentSection + 1);
  };
  const goPrev = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  const getSectionLabel = (idx: number) => {
    if (idx === 0) return 'Halaman Awal';
    const s = bookData.sections[idx - 1];
    if (s.type === 'prolog') return 'PROLOG';
    if (s.type === 'epilog') return 'EPILOG';
    if (s.label && s.label.startsWith('BAB ')) return `BAB ${s.number}`;
    return s.label || `${s.number}`;
  };

  const getSectionTitle = (idx: number) => {
    if (idx === 0) return bookData.title;
    return bookData.sections[idx - 1].title;
  };

  /* ---- Render front matter ---- */
  const renderFrontMatter = () => {
    const isNWM = bookData.title.includes('NWM');
    const lines = bookData.frontMatter.split('\n');
    const parts: { type: string; text: string }[] = [];
    let currentType = '';
    let currentText: string[] = [];
    const headers = isNWM
      ? ['PERSEMBAHAN']
      : [
          'HALAMAN HAK CIPTA',
          'HALAMAN PERSEMBAHAN',
          'EPIGRAF',
          'KATA PENGANTAR',
          'CATATAN PENULIS',
          'DAFTAR ISI',
        ];

    for (const line of lines) {
      const trimmed = line.trim();
      if (headers.includes(trimmed)) {
        if (currentText.length > 0)
          parts.push({ type: currentType, text: currentText.join('\n') });
        currentType = trimmed;
        currentText = [];
      } else if (trimmed !== '' && !trimmed.startsWith('---')) {
        currentText.push(line);
      } else {
        if (currentText.length > 0) currentText.push('');
      }
    }
    if (currentText.length > 0)
      parts.push({ type: currentType, text: currentText.join('\n') });

    // If NWM Corp, render a simplified cover-style front matter
    if (isNWM) {
      return (
        <div className="space-y-8">
          <div className="text-center space-y-3 mb-10">
            <p className="text-amber-glow text-xs font-semibold tracking-[0.3em] uppercase">
              NWM INSTITUTE
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-warm-white">
              {bookData.title}
            </h2>
            <p className="text-muted-foreground italic">{bookData.subtitle}</p>
            <p className="text-amber-glow/80 text-sm font-medium">
              {bookData.author} · {bookData.year}
            </p>
          </div>
          {parts
            .filter((p) => p.type !== 'DAFTAR ISI')
            .map((part, i) => (
              <div key={i}>
                {part.type && (
                  <h3 className="text-amber-glow text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                    {part.type}
                  </h3>
                )}
                {part.text
                  .split('\n')
                  .filter((l) => l.trim())
                  .map((para, j) => {
                    if (/^[\u201c\u201e"\u00ab]/.test(para)) {
                      return (
                        <blockquote
                          key={j}
                          className="border-l-2 border-amber-glow/40 pl-4 my-4 text-muted-foreground italic"
                        >
                          {para}
                        </blockquote>
                      );
                    }
                    return (
                      <p
                        key={j}
                        className="text-muted-foreground leading-relaxed mb-3"
                      >
                        {para}
                      </p>
                    );
                  })}
              </div>
            ))}
          <p className="text-muted-foreground/40 text-xs text-center pt-6 border-t border-amber-glow/10">
            {bookData.publisher} · {bookData.year}
          </p>
        </div>
      );
    }

    // Default: novel front matter
    return (
      <div className="space-y-10">
        {parts
          .filter((p) => p.type !== 'DAFTAR ISI')
          .map((part, i) => (
            <div key={i}>
              <h3 className="text-amber-glow text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                {part.type}
              </h3>
              {part.text
                .split('\n')
                .filter((l) => l.trim())
                .map((para, j) => {
                  if (para.startsWith('NIKEL')) {
                    return (
                      <h2
                        key={j}
                        className="text-3xl sm:text-4xl font-black text-warm-white mb-2"
                      >
                        NIKEL <span className="text-red-accent">MERAH</span> PUTIH
                      </h2>
                    );
                  }
                  if (para === 'MERAH PUTIH') {
                    return null;
                  }
                  if (para === 'Sebuah Novel')
                    return (
                      <p key={j} className="text-muted-foreground italic mb-1">
                        Sebuah Novel
                      </p>
                    );
                  if (
                    para === 'Ihwan Kadir' ||
                    para.startsWith('IHWAN')
                  )
                    return (
                      <p
                        key={j}
                        className="text-warm-white font-semibold"
                      >
                        Ihwan Kadir
                      </p>
                    );
                  if (/^[\u201c\u201e"\u00ab]/.test(para)) {
                    return (
                      <blockquote
                        key={j}
                        className="border-l-2 border-amber-glow/40 pl-4 my-4 text-muted-foreground italic"
                      >
                        {para}
                      </blockquote>
                    );
                  }
                  if (
                    para.startsWith('Diterbitkan oleh') ||
                    para.startsWith('——') ||
                    para === '———————' ||
                    para === '——————————'
                  )
                    return null;
                  if (
                    [
                      'Poros Musyawarah Masyarakat Blok Lapao-pao',
                      'PORMMAL',
                      '2026',
                      'Penulis',
                    ].includes(para)
                  ) {
                    return (
                      <p
                        key={j}
                        className="text-muted-foreground/60 text-sm"
                      >
                        {para}
                      </p>
                    );
                  }
                  return (
                    <p
                      key={j}
                      className="text-muted-foreground leading-relaxed mb-3"
                    >
                      {para}
                    </p>
                  );
                })}
            </div>
          ))}
      </div>
    );
  };

  /* ---- Render chapter content ---- */
  const renderSectionContent = () => {
    const section = bookData.sections[currentSection - 1];
    const paragraphs = section.content.split('\n').filter((l) => l.trim() !== '');
    const label = section.type === 'prolog'
      ? 'PROLOG'
      : section.type === 'epilog'
        ? 'EPILOG'
        : section.label && section.label.startsWith('BAB ')
          ? `BAB ${section.number}`
          : section.label || '';

    return (
      <div>
        {label && (
          <h2 className="text-amber-glow text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            {label}
          </h2>
        )}
        <h3 className="text-2xl sm:text-3xl font-bold text-warm-white mb-8">
          {section.title}
        </h3>
        {paragraphs.map((para, i) => {
          if (/^[\u201c\u201e"\u00ab]/.test(para)) {
            return (
              <blockquote
                key={i}
                className="border-l-2 border-amber-glow/40 pl-4 my-5 text-muted-foreground italic"
              >
                {para}
              </blockquote>
            );
          }
          return (
            <p
              key={i}
              className="text-muted-foreground leading-[1.85] mb-4 text-base sm:text-[17px]"
            >
              {para}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 bg-dark-deeper flex">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-dark-surface">
        <div
          className="h-full bg-gradient-to-r from-amber-glow to-red-accent transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-72 bg-dark-surface border-r border-amber-glow/10 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-bold text-warm-white">
              Daftar Isi
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-muted-foreground hover:text-warm-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => {
                setCurrentSection(0);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                currentSection === 0
                  ? 'bg-amber-glow/15 text-amber-glow font-semibold'
                  : 'text-muted-foreground hover:text-warm-white hover:bg-white/5'
              }`}
            >
              Halaman Awal
            </button>
            {bookData.sections.map((s, i) => (
              <button
                key={s.label}
                onClick={() => {
                  setCurrentSection(i + 1);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentSection === i + 1
                    ? 'bg-amber-glow/15 text-amber-glow font-semibold'
                    : 'text-muted-foreground hover:text-warm-white hover:bg-white/5'
                }`}
              >
                <span className="text-muted-foreground/60 mr-2">
                  {s.type === 'prolog'
                    ? 'Pr'
                    : s.type === 'epilog'
                      ? 'Ep'
                      : s.label && s.label.startsWith('BAB ')
                        ? `${s.number}.`
                        : ''}
                </span>
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-amber-glow/10 bg-dark-deeper/80 backdrop-blur-xl sticky top-0 z-30">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-warm-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
          <div className="text-center min-w-0">
            <p className="text-xs text-muted-foreground/60">
              {getSectionLabel(currentSection)}
            </p>
            <p className="text-sm text-warm-white font-medium truncate max-w-[200px] sm:max-w-none">
              {getSectionTitle(currentSection)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-muted-foreground hover:text-warm-white transition-colors"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-10 sm:py-16">
            {currentSection === 0 ? renderFrontMatter() : renderSectionContent()}
          </div>

          {/* Navigation */}
          <div className="max-w-2xl mx-auto px-6 sm:px-10 pb-12 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentSection === 0}
              className="border-amber-glow/20 text-amber-glow hover:bg-amber-glow/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </Button>
            <span className="text-xs text-muted-foreground/50">
              {currentSection + 1} / {totalItems}
            </span>
            <Button
              variant="outline"
              onClick={goNext}
              disabled={currentSection === totalItems - 1}
              className="border-amber-glow/20 text-amber-glow hover:bg-amber-glow/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   LOADING SCREEN
   ================================================================ */
function LoadingScreen({ message }: { message?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-deeper">
      <Loader2 className="h-8 w-8 text-amber-glow animate-spin mb-4" />
      <p className="text-muted-foreground text-sm">{message || 'Memuat...'}</p>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function Home() {
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  const loadBook = useCallback((bookId: string) => {
    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) return;
    setLoading(true);
    setActiveBookId(bookId);
    fetch(book.dataFile)
      .then((r) => r.json())
      .then((data) => {
        setBookData(data);
        setLoading(false);
        setIsReading(true);
        document.body.style.overflow = 'hidden';
      })
      .catch(() => setLoading(false));
  }, []);

  const startReading = () => {
    loadBook('nikel-merah-putih');
  };

  const stopReading = () => {
    setIsReading(false);
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  };

  if (loading) return <LoadingScreen message={activeBookId === 'jiwa-nwm-corp' ? 'Memuat dokumen...' : 'Memuat novel...'} />;

  return (
    <div className="min-h-screen flex flex-col bg-dark-deeper">
      <Navbar
        onReadClick={startReading}
        isReading={isReading}
        onBackToLanding={stopReading}
      />
      <main className="flex-1">
        {isReading && bookData ? (
          <BookReader bookData={bookData} onBack={stopReading} />
        ) : (
          <>
            <HeroSection onReadClick={startReading} />
            <SinopsisSection />
            <HighlightsSection />
            <BookshelfSection onReadBook={loadBook} />
            <TemaSection />
            <AuthorSection />
            <OrderSection />
          </>
        )}
      </main>
      {!isReading && <Footer />}
    </div>
  );
}
