import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import WeatherWidget from '@/components/WeatherWidget';
import SafetyTips from '@/components/SafetyTips';
import InfoSection from '@/components/InfoSection';
import HistoryLegends from '@/components/HistoryLegends';
import RouteSection from '@/components/RouteSection';
import SunsetGuide from '@/components/SunsetGuide';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import FAQSection from '@/components/FAQSection';
import NearbySection from '@/components/NearbySection';
import VisitorServices from '@/components/VisitorServices';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <WeatherWidget />
        <SafetyTips />
        <InfoSection />
        <HistoryLegends />
        <RouteSection />
        <NearbySection />
        <VisitorServices />
        <SunsetGuide />
        <Gallery />
        <Reviews />
        <SourcesSection />
        <FAQSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
