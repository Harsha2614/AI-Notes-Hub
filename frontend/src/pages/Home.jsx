import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  NotebookPen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import LineWaves from "../components/LineWaves";

function Home() {
  const features = [
    {
      icon: <NotebookPen className="w-6 h-6" />,
      title: "Smart Note Management",
      description:
        "Create, organize, update, and manage your notes with a clean and modern workflow.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Summaries",
      description:
        "Generate instant professional summaries of your notes using integrated AI.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Authentication",
      description:
        "JWT-based login system with protected routes and secure user access.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-60">
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#ffffff"
          color2="#ffffff"
          color3="#ffffff"
          enableMouseInteraction
          mouseInfluence={2}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl border border-white/20 backdrop-blur-md">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">AI Notes Hub</h1>
          </div>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-2xl border border-white/20 hover:bg-white hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2 rounded-2xl bg-white text-black font-medium hover:scale-105 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Productivity Platform
            </div>

            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Your Notes.
              <br />
              Smarter with AI.
            </h2>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              Organize your knowledge, secure your ideas, and let AI instantly
              summarize your notes for faster learning and better productivity.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="px-7 py-4 rounded-2xl bg-white text-black font-semibold flex items-center gap-2 hover:scale-105 transition"
              >
                Start Free
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/login"
                className="px-7 py-4 rounded-2xl border border-white/20 backdrop-blur-md hover:bg-white/10 transition"
              >
                Login
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
          >
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-white/10 border border-white/10">
                <p className="text-sm text-gray-300 mb-2">Latest AI Summary</p>
                <h3 className="text-xl font-semibold mb-3">React Revision</h3>
                <p className="text-gray-300 leading-relaxed">
                  This note explains React hooks including useState and
                  useEffect, focusing on state handling and lifecycle logic for
                  efficient frontend development.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white/10 border border-white/10">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-gray-300">Secure Notes</p>
                </div>

                <div className="p-5 rounded-3xl bg-white/10 border border-white/10">
                  <p className="text-3xl font-bold">AI</p>
                  <p className="text-sm text-gray-300">Instant Summaries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-24">
          <div className="text-center mb-14">
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Features
            </p>
            <h3 className="text-4xl font-bold mt-3">
              Built for modern productivity
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10"
              >
                <div className="mb-5 inline-flex p-4 rounded-2xl bg-white/10">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
