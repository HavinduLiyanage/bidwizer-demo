'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import { PLANS, type PlanTier } from '@/lib/entitlements'

const pricingPlans: { id: PlanTier; popular?: boolean }[] = [
  { id: 'FREE', popular: false },
  { id: 'STANDARD', popular: false },
  { id: 'PREMIUM', popular: true }
]

const faqs = [
  {
    question: 'Can I try before making a commitment?',
    answer: 'Absolutely! We offer a 14-day free trial on all our paid plans. No credit card required, and you can upgrade, downgrade, or cancel anytime.'
  },
  {
    question: 'Do you support LKR as a billing currency?',
    answer: 'Yes, we accept payments in both USD and LKR. Pricing will be automatically converted using the current exchange rate at the time of purchase.'
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges or credits to your account.'
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes, we take data security very seriously. All data is encrypted in transit and at rest. We are compliant with industry security standards and conduct regular security audits.'
  },
  {
    question: 'What kind of AI tools is provided?',
    answer: 'Our AI tools include document summarization, question answering with citations, compliance checking, bid writing assistance, and competitive analysis powered by advanced language models.'
  }
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <>
      <SiteHeader />
      <main>
        {/* Video Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="container">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold uppercase text-navy-900 md:text-4xl lg:text-5xl">
                SEE HOW BIDWIZER HELPS YOU WIN MORE TENDERS
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                Discover opportunities, streamline bidding, and win more tenders with AI-powered insights.
                Watch our demo to see how teams are transforming their tendering process.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="btn btn-primary mt-6">Explore with plan</button>
              </motion.div>

              {/* Video Player */}
              <motion.div
                className="mt-12 aspect-video overflow-hidden rounded-2xl bg-slate-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex h-full items-center justify-center">
                  <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl transition-transform hover:scale-110">
                    <Play className="ml-1 h-8 w-8 text-primary" fill="currentColor" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-blue-50 py-20">
          <div className="container">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Pricing
              </p>
              <h2 className="mt-2 text-3xl font-bold uppercase text-navy-900 md:text-4xl">
                Flexible plans for every bidding team
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Choose the plan that fits your tendering needs
              </p>

              {/* Billing Toggle */}
              {/* <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white p-1 shadow-sm">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-primary text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                    billingPeriod === 'yearly'
                      ? 'bg-primary text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Yearly
                </button>
              </div> */}
            </motion.div>

            {/* Pricing Cards */}
            <div className="mt-12 grid gap-6 md:grid-cols-3 items-start">
              {pricingPlans.map((planRef, idx) => {
                const plan = PLANS[planRef.id]
                const isPopular = planRef.popular

                return (
                  <motion.div
                    key={planRef.id}
                    className={`relative rounded-2xl bg-white p-8 shadow-sm h-full flex flex-col ${isPopular ? 'ring-2 ring-blue-500 shadow-lg' : 'ring-1 ring-slate-200'
                      }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold text-white">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        {plan.name}
                      </h3>

                      {/* Tagline based on play type (optional hardcoded or derived) */}
                      <p className="mt-2 text-xs font-medium text-blue-500">
                        {planRef.id === 'FREE' ? 'Try BidWizer with limited previews' :
                          planRef.id === 'STANDARD' ? 'Best for solo bidders' :
                            'Most popular for teams'}
                      </p>

                      <div className="mt-6 mb-2">
                        <span className="text-4xl font-bold text-navy-900">
                          Rs {plan.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 block mt-1">PER MONTH</span>
                        <span className="text-sm text-slate-400">~${Math.round(plan.price / 300)}</span> {/* Approx conversion */}
                      </div>

                      {planRef.id === 'FREE' && (
                        <span className="text-xs font-medium text-slate-500 block mb-6">7-day free trial</span>
                      )}
                    </div>

                    <ul className="mt-6 space-y-4 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-left">
                          <div className="mt-1">
                            <Check className="h-4 w-4 text-blue-500" strokeWidth={3} />
                          </div>
                          <span className="text-sm text-slate-700 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.div
                      className="mt-8"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={`/register/bidder/step1?plan=${planRef.id}`}
                        className={`btn w-full rounded-full py-3 text-sm font-semibold ${isPopular
                            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                            : 'border border-slate-200 bg-white text-navy-900 hover:bg-slate-50'
                          }`}
                      >
                        {planRef.id === 'FREE' ? 'Start free trial' : 'Get started'}
                      </Link>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Logo Strip */}
        <section className="border-y border-slate-200 bg-white py-12">
          <div className="container">
            <p className="mb-8 text-center text-xs uppercase tracking-widest text-slate-500">
              Trusted by leading businesses in Sri Lanka
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {['Webflow', 'Relume', 'Webflow', 'Relume', 'Webflow', 'Relume'].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                  <span className="font-bold text-navy-900">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white py-20">
          <div className="container">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold uppercase text-navy-900 md:text-4xl">FAQS</h2>
              <p className="mt-3 text-slate-600">
                Common questions about our tender platform and how we can help grow your business
              </p>
            </motion.div>

            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-navy-900">{faq.question}</h3>
                  <p className="mt-2 text-slate-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-navy-900 py-20">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold uppercase text-white md:text-4xl">
                READY TO SIMPLIFY YOUR TENDERING PROCESS?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/80">
                Start using our tender management platform and see why hundreds of businesses trust BidWizer
              </p>
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register/bidder/step1" className="btn btn-primary">
                  Start free account
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
