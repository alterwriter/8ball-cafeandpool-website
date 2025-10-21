import { useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from './lib/api.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import BookingForm from './components/BookingForm.jsx';
import MenuShowcase from './components/MenuShowcase.jsx';
import Membership from './components/Membership.jsx';
import OrderForm from './components/OrderForm.jsx';
import Footer from './components/Footer.jsx';
import LoginCard from './components/LoginCard.jsx';

function App() {
  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ['overview'],
    queryFn: api.overview,
  });

  const { data: menu } = useQuery({ queryKey: ['menu'], queryFn: api.menu });
  const { data: tiers } = useQuery({ queryKey: ['tiers'], queryFn: api.membershipTiers });

  const [auth, setAuth] = useLocalStorage('8ball-auth', undefined);

  const profileQuery = useQuery({
    queryKey: ['profile', auth?.token],
    queryFn: () => api.profile(auth.token),
    enabled: Boolean(auth?.token),
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: api.login,
    onSuccess: (data) => {
      setAuth(data);
    },
  });

  const bookingMutation = useMutation({
    mutationFn: api.booking,
  });

  const orderMutation = useMutation({
    mutationFn: api.orderFood,
  });

  const heroData = overview?.hero;
  const sections = overview?.sections;
  const contact = overview?.contact;

  const featuredPackages = useMemo(() => sections?.packages ?? [], [sections]);

  return (
    <div className="min-h-screen bg-latte/60">
      <div className="bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
        <div className="backdrop-blur-sm bg-charcoal/70">
          <header className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4 text-latte md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gold/80">Jakarta Selatan</p>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold">8Ball Café &amp; Pool House</h1>
              <p className="text-latte/80 max-w-2xl mt-2">
                Hub premium untuk billiard, artisan coffee, dan private events. Reservasi lounge favoritmu dan nikmati pairing menu signature kami.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                className="px-5 py-2 rounded-full border border-latte/30 text-sm font-medium hover:bg-latte/10 transition"
                href="#booking"
              >
                Booking Table
              </a>
              <a
                className="px-5 py-2 rounded-full bg-gold text-charcoal text-sm font-medium shadow-soft hover:shadow-none transition"
                href="#menu"
              >
                Lihat Menu
              </a>
            </div>
          </header>
          <Hero loading={loadingOverview} hero={heroData} highlights={heroData?.highlights ?? []} gallery={sections?.gallery ?? []} />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 space-y-24 py-24">
        <Section id="about" eyebrow="Our Story" title="Cafe & Billiard House dengan detail modern dan hangat">
          <p className="text-lg leading-relaxed text-slate-700">
            8Ball Café &amp; Pool House menghadirkan pengalaman hangout modern dengan kombinasi lounge interior bernuansa art deco, signature mocktail bar, dan meja billiard kelas turnamen. Kami melayani komunitas pencinta billiard, pekerja kreatif, hingga keluarga yang ingin menikmati quality time.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white/70 rounded-3xl p-6 shadow-soft border border-white/60">
                <h3 className="font-heading text-xl text-charcoal mb-2">{pkg.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-teal"></span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-semibold text-teal">Rp {pkg.pricePerHour.toLocaleString('id-ID')} / jam</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="booking" eyebrow="Booking" title="Kunci slot permainanmu">
          <BookingForm
            packages={featuredPackages}
            mutation={bookingMutation}
          />
        </Section>

        <Section id="membership" eyebrow="Membership" title="Gabung membership dan unlock benefits eksklusif">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-start">
            <Membership tiers={tiers?.tiers ?? []} profile={profileQuery.data?.member} />
            <LoginCard
              onLogin={(credentials) => loginMutation.mutate(credentials)}
              isLoading={loginMutation.isLoading}
              error={loginMutation.error?.message}
              auth={auth}
              onLogout={() => setAuth(undefined)}
              profile={profileQuery.data?.member}
              refetchProfile={profileQuery.refetch}
            />
          </div>
        </Section>

        <Section id="menu" eyebrow="Signature Menu" title="Pairing menu dari dapur kami">
          <MenuShowcase menu={menu?.menu ?? []} />
          <OrderForm menu={menu?.menu ?? []} mutation={orderMutation} />
        </Section>
      </main>

      <Footer contact={contact} />
    </div>
  );
}

export default App;
