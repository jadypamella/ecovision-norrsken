import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { SafetyProblems } from '@/components/landing/SafetyProblems';
import { VSSTechnology } from '@/components/landing/VSSTechnology';
import { CTA } from '@/components/landing/CTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <SafetyProblems />
      <VSSTechnology />
      <CTA />
    </Layout>
  );
};

export default Index;
