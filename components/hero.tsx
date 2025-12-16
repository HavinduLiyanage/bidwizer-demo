import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 -mt-20 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

      <div className="container relative z-10 flex flex-col items-center py-16 text-center md:py-28">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Tender Revolution<br className="hidden md:block" />
          Powered by Intelligent<br className="hidden md:block" />
          Technology
        </motion.h1>

        <motion.p 
          className="mt-4 max-w-2xl text-base text-white/70 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Discover opportunities, streamline bidding, and win more tenders with AI-powered insights.
        </motion.p>

        <motion.div 
          className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/pricing" className="btn btn-primary w-full sm:w-auto">
              Explore tenders <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/publisher/register" className="btn btn-ghost w-full sm:w-auto">Publish tender</Link>
          </motion.div>
        </motion.div>

        {/* Overlapping tiles */}
        <div className="relative mt-16 w-full max-w-5xl">
          <div className="relative hidden h-[320px] w-full md:block">
            {[
              { src: "/tiles/tile-1.svg", position: "left-[6%] top-10 w-[38%] rotate-[-3deg] z-10", tone: "bg-card/80" },
              { src: "/tiles/tile-2.svg", position: "left-1/2 top-0 w-[42%] -translate-x-1/2 z-20", tone: "bg-card/90" },
              { src: "/tiles/tile-3.svg", position: "right-[6%] top-12 w-[38%] rotate-[4deg] z-10", tone: "bg-card/80" }
            ].map((tile) => (
              <div
                key={tile.src}
                className={`absolute ${tile.position} rounded-xl ${tile.tone} p-3 shadow-tile ring-1 ring-white/10 backdrop-blur`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={tile.src} alt="" fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:hidden">
            {[1, 2, 3].map((tile) => (
              <div
                key={tile}
                className="rounded-xl bg-card/80 p-3 shadow-tile ring-1 ring-white/10 backdrop-blur"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={`/tiles/tile-${tile}.svg`} alt="" fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* logos strip */}
        <motion.div 
          className="mt-16 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        >
          <p className="text-center text-xs uppercase tracking-widest text-white/55">
            Trusted by leading organizations in Sri Lanka
          </p>
          <motion.div 
            className="mt-4 grid grid-cols-2 place-items-center gap-6 opacity-70 md:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1.6
                }
              }
            }}
          >
            {[1,2,3,4].map(n => (
              <motion.div 
                key={n} 
                className="h-6 w-28 bg-white/10"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
