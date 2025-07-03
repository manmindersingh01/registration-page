"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import {
  Code,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Layers,
  ArrowUpRight,
  Check,
  Menu,
  X,
  Star,
  ChevronRight,
  BarChart3,
  Users,
  Clock,
  Cpu,
  Database,
  Lock,
  Store,
  ShoppingCart,
  Phone,
  DollarSign,
} from "lucide-react";

import { Link } from "react-scroll";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import axios from "axios";

const FloatingElements = () => {
  const elements = ["🏪", "💰", "📱", "🚀", "⭐", "🌟", "✨", "🎯", "📈", "🛒"];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: -50,
          }}
          animate={{
            y: (typeof window !== "undefined" ? window.innerHeight : 1000) + 50,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            rotate: 360,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Fun cursor trail component
const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [
        ...prev.slice(-10),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            background: `hsl(${index * 36}, 70%, 50%)`,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      ))}
    </div>
  );
};

// Fun decorative shapes
const FunShapes = () => {
  return (
    <>
      {/* Blob shapes */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Fixed handleRegister with async/await
  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/register", {
        email: email,
      });
      console.log(res);
      alert("Thank you!");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE3BB] overflow-x-hidden relative">
      {/* Fun elements */}
      {/* <FloatingElements /> */}
      <CursorTrail />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#03A6A1] via-[#FFA673] to-[#FF4F0F] origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />
      <Navigation
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        handleRegister={handleRegister}
      />
      <HeroSection
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        handleRegister={handleRegister}
      />
      <FeaturesSection />
      <ProcessSection />
      <ShowcaseSection />
      <StatsSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      <Footer />
    </div>
  );
};

const Navigation = ({
  email,
  setEmail,
  phone,
  setPhone,
  handleRegister,
}: {
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  handleRegister: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(
        typeof window !== "undefined" ? window.scrollY > 20 : false
      );
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.img
              src="/logo.png"
              alt="Codepup"
              className="w-10 h-10"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] bg-clip-text text-transparent">
              Codepup 🐶
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {["Benefits", "How It Works", "Success Stories"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-700 hover:text-[#03A6A1] text-sm transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={`${item.toLowerCase().replace(/\s+/g, "-")}`}
                    smooth={true}
                    duration={700}
                    offset={-80}
                    spy={true}
                    activeClass="text-[#03A6A1] font-bold"
                    className="cursor-pointer transition-colors"
                  >
                    {item}
                  </Link>
                  {/* Fun hover emoji */}
                  <motion.span
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    {index === 0 ? "💰" : index === 1 ? "🎯" : "🎉"}
                  </motion.span>
                </motion.a>
              )
            )}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-[#FF4F0F] to-[#FFA673] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative bg-gradient-to-r from-[#FF4F0F] to-[#FFA673] text-white px-8 py-3 rounded-lg font-mono font-semibold shadow-lg hover:shadow-xl transition-all overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Get Early Access - FREE</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        🚀
                      </motion.span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Join the Waitlist! 🎉</DialogTitle>
                    <DialogDescription>
                      Be the first to know when Codepup launches! Get early
                      access to our AI-powered store builder ✨
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>What happens next?</strong>
                        <br />
                        You'll be the first to get access when we launch, plus
                        exclusive early-bird pricing! 🎯
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Maybe Later</Button>
                    </DialogClose>
                    <Button
                      onClick={handleRegister}
                      type="submit"
                      className="bg-gradient-to-r from-[#03A6A1] to-[#FFA673] hover:from-[#FFA673] hover:to-[#FF4F0F]"
                    >
                      Join Waitlist! 🎉
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Fun sparkles on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-white"
                    animate={{
                      x: [0, i % 2 ? 20 : -20],
                      y: [0, -20],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    style={{
                      left: `${25 * i}%`,
                      top: "50%",
                    }}
                  >
                    ✨
                  </motion.span>
                ))}
              </motion.div>
            </motion.button>
          </div>

          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection = ({
  email,
  setEmail,
  phone,
  setPhone,
  handleRegister,
}: {
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  handleRegister: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Fun shapes */}
      <FunShapes />

      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, #03A6A1 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #03A6A1 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, #03A6A1 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
        />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 80% 80%, #FFA673 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #FFA673 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #FFA673 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#03A6A1] rounded-full"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#03A6A1 1px, transparent 1px), linear-gradient(90deg, #03A6A1 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Fun animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-8"
            >
              <motion.div
                className="flex items-center space-x-2 bg-[#03A6A1]/10 border border-[#03A6A1]/20 px-4 py-2 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(3, 166, 161, 0.4)",
                    "0 0 0 10px rgba(3, 166, 161, 0)",
                    "0 0 0 0 rgba(3, 166, 161, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#03A6A1] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#03A6A1]"></span>
                </span>
                <span className="text-xs font-mono text-[#03A6A1] uppercase tracking-wider">
                  Perfect for Small Shops 🏪
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              className="font-mono text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block">Build Your Dream</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-[#03A6A1] via-[#FFA673] to-[#FF4F0F] bg-clip-text text-transparent">
                  Online Store
                </span>
                {/* Fun shop emoji */}
                <motion.span
                  className="absolute -top-8 right-0 text-3xl"
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏪
                </motion.span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F]"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              <span className="block text-2xl lg:text-3xl mt-2">
                in Minutes! 💰
              </span>
            </motion.h1>

            <motion.p
              className="text-base lg:text-lg text-gray-600 mb-8 leading-relaxed font-mono"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <strong>No technical knowledge needed!</strong> AI-powered
              platform that creates complete online stores with payment
              processing, inventory management, and customer support. Just like
              Marcus from Chicago - his electronics store sales increased by
              60%! 📈
            </motion.p>

            {/* Add logo in hero section */}
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="relative p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.img
                  src="/logo.png"
                  alt="Codepup"
                  className="w-16 h-16 mx-auto"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] text-white text-xs px-2 py-1 rounded-full">
                  Powered by AI 🤖
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="relative bg-gradient-to-r from-[#FF4F0F] to-[#FFA673] text-white px-8 py-3 rounded-lg font-mono font-semibold shadow-lg hover:shadow-xl transition-all overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>Get Early Access - FREE</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          🚀
                        </motion.span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Join the Waitlist! 🎉</DialogTitle>
                      <DialogDescription>
                        Be the first to know when Codepup launches! Get early
                        access to our AI-powered store builder ✨
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>What happens next?</strong>
                          <br />
                          You'll be the first to get access when we launch, plus
                          exclusive early-bird pricing! 🎯
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Maybe Later</Button>
                      </DialogClose>
                      <Button
                        onClick={handleRegister}
                        type="submit"
                        className="bg-gradient-to-r from-[#03A6A1] to-[#FFA673] hover:from-[#FFA673] hover:to-[#FF4F0F]"
                      >
                        Join Waitlist! 🎉
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "500+", label: "Happy Shopkeepers", icon: "🏪" },
                { value: "24/7", label: "Online Sales", icon: "💰" },
                { value: "FREE", label: "Setup Cost", icon: "🎉" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group relative"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <motion.div
                    className="text-2xl mb-1"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="font-mono text-xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  {/* Fun popup on hover */}
                  <motion.div
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  >
                    <span className="text-xs bg-yellow-300 px-2 py-1 rounded-full">
                      {index === 0
                        ? "Growing fast!"
                        : index === 1
                        ? "Never close!"
                        : "No cost!"}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative lg:h-[600px]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ opacity }}
          >
            <div className="relative w-full h-full">
              {/* Fun floating emoji around the preview */}
              {["🏪", "💰", "📱", "✨"].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  animate={{
                    x: [0, 20, -20, 0],
                    y: [0, -20, 20, 0],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    top: `${25 * i}%`,
                    right: `${10 + i * 5}%`,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}

              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#03A6A1]/5 via-[#FFA673]/5 to-[#FF4F0F]/5 rounded-3xl border border-gray-200"
                animate={{
                  borderColor: [
                    "#e5e7eb",
                    "#03A6A1",
                    "#FFA673",
                    "#FF4F0F",
                    "#e5e7eb",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-white rounded-lg shadow-2xl p-4 w-72"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Store className="w-4 h-4 text-[#03A6A1]" />
                    <span className="text-sm font-semibold">
                      राजू जी किराना स्टोर
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Rice - 25kg</span>
                      <span className="text-xs font-bold text-green-600">
                        ₹1,200
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Dal - 1kg</span>
                      <span className="text-xs font-bold text-green-600">
                        ₹85
                      </span>
                    </div>
                    <div className="bg-green-50 p-2 rounded text-center">
                      <span className="text-xs font-bold text-green-700">
                        Online Order Processing! 🛒
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity }}
                  className="absolute bottom-8 left-8 bg-white rounded-xl shadow-xl p-6 w-64"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-gray-600">
                      Daily Earnings 💰
                    </span>
                    <span className="text-xs font-mono text-green-500">
                      +50% ↗️
                    </span>
                  </div>
                  <div className="h-20 flex items-end space-x-2">
                    {[40, 60, 45, 70, 65, 80, 75].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#03A6A1] to-[#03A6A1]/50 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                        whileHover={{
                          scale: 1.1,
                          background:
                            "linear-gradient(to top, #FFA673, #FFA673)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.p
                    className="font-mono text-gray-400 text-sm text-center"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    [ Your shop's online store preview 🏪 ]<br />
                    <span className="text-xs">
                      Just like this, but with your products!
                    </span>
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "SSL Security",
      description:
        "Bank-grade encryption with SSL certificates to protect customer data and transactions",
      gradient: "from-[#03A6A1] to-[#03A6A1]/70",
      emoji: "🔒",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "User Authentication",
      description:
        "Dedicated signup/login pages with secure customer account management",
      gradient: "from-[#FFA673] to-[#FFA673]/70",
      emoji: "👤",
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Catalog Management",
      description:
        "Advanced product catalog with categories, filters, and inventory tracking",
      gradient: "from-[#FF4F0F] to-[#FF4F0F]/70",
      emoji: "📦",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Payment Gateway",
      description:
        "Multiple payment options - cards, PayPal, Apple Pay, Google Pay integration",
      gradient: "from-[#03A6A1] to-[#FFA673]",
      emoji: "💳",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Analytics Dashboard",
      description:
        "Real-time sales analytics, customer insights, and performance metrics",
      gradient: "from-[#FFA673] to-[#FF4F0F]",
      emoji: "📊",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "SEO Optimized",
      description:
        "Built-in SEO tools, meta tags, and search engine optimization features",
      gradient: "from-[#FF4F0F] to-[#03A6A1]",
      emoji: "🌍",
    },
  ];

  return (
    <section ref={ref} id="benefits" className="relative py-24 overflow-hidden">
      {/* Seamless gradient transition from hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFE3BB] via-white to-[#FFE3BB]/30" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [-200, 200],
            y: [100, -100],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-0 w-96 h-96 bg-[#03A6A1]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <Store className="w-4 h-4 text-[#03A6A1]" />
            <span className="text-xs font-mono text-[#03A6A1] uppercase tracking-wider">
              Benefits for Your Shop
            </span>
          </motion.div>

          <h2 className="font-mono text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Shopkeepers Love
            <span className="block bg-gradient-to-r from-[#03A6A1] via-[#FFA673] to-[#FF4F0F] bg-clip-text text-transparent">
              Going Online 🚀
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono">
            Join 500+ happy shopkeepers who increased their sales by 40-60% 📈
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Fun floating emoji on hover */}
                <motion.span
                  className="absolute top-4 right-4 text-2xl opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.emoji}
                </motion.span>

                <motion.div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="font-mono text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="font-mono text-sm text-gray-600">
                  {feature.description}
                </p>

                {/* Fun confetti effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#03A6A1", "#FFA673", "#FF4F0F"][
                          i % 3
                        ],
                        left: `${20 + i * 15}%`,
                        top: "80%",
                      }}
                      animate={{
                        y: [-100, 0],
                        opacity: [1, 0],
                        scale: [0, 1],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Background pattern on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{
                    backgroundImage: `linear-gradient(45deg, #03A6A1 25%, transparent 25%), linear-gradient(-45deg, #03A6A1 25%, transparent 25%)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      code: "share()",
      title: "Share Your Shop Details",
      description:
        "Tell us about your products, location, and how you want to sell",
      icon: "📝",
      funText: "Super easy! 🌟",
    },
    {
      number: "02",
      code: "build()",
      title: "We Build Your Store",
      description:
        "Our team creates everything - website, payment system, WhatsApp setup",
      icon: "🔨",
      funText: "We do everything! ✨",
    },
    {
      number: "03",
      code: "earn()",
      title: "Start Earning More",
      description:
        "Customers order online, you deliver or they pickup - simple!",
      icon: "💰",
      funText: "Ka-ching! 🎉",
    },
  ];

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-24 overflow-hidden"
    >
      {/* Gradient transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFE3BB]/30 via-[#FFA673]/10 to-white" />

      {/* Animated lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#03A6A1]/20 to-transparent"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <ChevronRight className="w-4 h-4 text-[#FF4F0F]" />
            <span className="text-xs font-mono text-[#FF4F0F] uppercase tracking-wider">
              How It Works
            </span>
          </motion.div>

          <h2 className="font-mono text-3xl lg:text-4xl font-bold text-gray-900">
            From Local Shop to
            <span className="block bg-gradient-to-r from-[#FF4F0F] to-[#FFA673] bg-clip-text text-transparent">
              Online Success in 3 Steps 🎯
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono mt-4">
            No technical knowledge needed - we handle everything for you!
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line with fun dots */}
          <div className="absolute top-1/2 left-0 right-0 hidden lg:block">
            <div className="h-px bg-gradient-to-r from-[#03A6A1]/20 via-[#FFA673]/20 to-[#FF4F0F]/20" />
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-[#03A6A1] to-[#FFA673] rounded-full"
                style={{ left: `${20 * i + 10}%`, top: "-6px" }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center relative overflow-hidden group">
                  {/* Fun ribbon */}
                  <motion.div
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FFA673] to-[#FF4F0F] text-white text-xs px-4 py-1 rounded-full transform rotate-12"
                    animate={{ rotate: [12, 15, 12] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {step.funText}
                  </motion.div>

                  {/* Background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#03A6A1]/5 to-[#FFA673]/5"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ scale: 2 }}
                  />

                  <motion.div
                    className="text-6xl mb-4 relative z-10"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 10, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {step.icon}
                  </motion.div>

                  <div className="font-mono text-xs text-[#03A6A1] mb-2 relative z-10">
                    {step.code}
                  </div>

                  <motion.div
                    className="font-mono text-sm text-gray-400 mb-4 relative z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>

                  <h3 className="font-mono text-xl font-semibold text-gray-900 mb-3 relative z-10">
                    {step.title}
                  </h3>

                  <p className="font-mono text-sm text-gray-600 relative z-10">
                    {step.description}
                  </p>

                  {/* Fun hover effect - confetti burst */}
                  <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: ["#03A6A1", "#FFA673", "#FF4F0F"][
                            i % 3
                          ],
                          left: "50%",
                          top: "50%",
                        }}
                        animate={{
                          x: [0, (i % 2 ? 1 : -1) * (20 + i * 10)],
                          y: [0, -30 - i * 10],
                          opacity: [1, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="showcase" className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#03A6A1]/5 to-[#FFE3BB]/30" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#FFA673 1px, transparent 1px), linear-gradient(90deg, #FFA673 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <Sparkles className="w-4 h-4 text-[#FFA673]" />
            <span className="text-xs font-mono text-[#FFA673] uppercase tracking-wider">
              Real Examples
            </span>
          </motion.div>

          <h2 className="font-mono text-3xl lg:text-4xl font-bold text-gray-900">
            See What Your
            <span className="block bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] bg-clip-text text-transparent">
              Online Store Looks Like 🎨
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono mt-4">
            Just like these successful shops, yours will look professional and
            attract customers!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative group"
          >
            <div className="bg-gradient-to-br from-[#03A6A1]/10 to-[#FFA673]/10 rounded-3xl p-1 h-96">
              <div className="bg-white rounded-3xl h-full p-8 relative overflow-hidden">
                {/* Success sticker */}
                <motion.div
                  className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12"
                  animate={{ rotate: [12, 15, 12] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  +60% Sales! 🔥
                </motion.div>

                <div className="absolute top-4 left-4">
                  <div className="flex space-x-2">
                    <motion.div
                      className="w-3 h-3 bg-red-400 rounded-full"
                      whileHover={{ scale: 1.5 }}
                    />
                    <motion.div
                      className="w-3 h-3 bg-yellow-400 rounded-full"
                      whileHover={{ scale: 1.5 }}
                    />
                    <motion.div
                      className="w-3 h-3 bg-green-400 rounded-full"
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🏪
                    </motion.div>
                    <div className="font-mono text-lg font-bold text-gray-900 mb-2">
                      Sam's Electronics Store
                    </div>
                    <div className="font-mono text-sm text-gray-400 mb-4">
                      samelectronics.store
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-semibold">iPhone 15 Pro</div>
                        <div className="text-green-600">$999</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-semibold">MacBook Air</div>
                        <div className="text-green-600">$1,299</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-[#03A6A1]/0 to-[#FFA673]/0 group-hover:from-[#03A6A1]/10 group-hover:to-[#FFA673]/10 transition-all duration-300" />
              </div>
            </div>
          </motion.div>

          {/* Side showcases */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#FFA673]/10 to-[#FF4F0F]/10 rounded-2xl p-1 h-44">
                <div className="bg-white rounded-2xl h-full p-6 relative overflow-hidden">
                  {/* WhatsApp badge */}
                  <motion.div
                    className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📱 WhatsApp
                  </motion.div>

                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        className="text-4xl mb-2"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        📱
                      </motion.div>
                      <div className="font-mono text-xs text-gray-400 mb-1">
                        WhatsApp Orders
                      </div>
                      <p className="font-mono text-sm text-gray-500">
                        Easy ordering for customers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#03A6A1]/10 to-[#03A6A1]/20 rounded-2xl p-1 h-44">
                <div className="bg-white rounded-2xl h-full p-6 relative overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        className="text-4xl mb-2"
                        animate={{
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💳
                      </motion.div>
                      <div className="font-mono text-xs text-gray-400 mb-1">
                        UPI Payments
                      </div>
                      <p className="font-mono text-sm text-gray-500">
                        Instant payment collection
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "500+", label: "Happy Shopkeepers", suffix: "", icon: "🏪" },
    { value: "50", label: "Avg Sales Increase", suffix: "%", icon: "📈" },
    { value: "24/7", label: "Online Sales", suffix: "", icon: "⏰" },
    { value: "FREE", label: "Setup Cost", suffix: "", icon: "🎉" },
  ];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFE3BB]/30 via-[#FF4F0F]/10 to-white" />

      {/* Fun floating shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              ["#03A6A1", "#FFA673", "#FF4F0F"][i % 3]
            }20, transparent)`,
            left: `${15 * i}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Real Results from
            <span className="block bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] bg-clip-text text-transparent">
              Real Shopkeepers 📊
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -10 }}
              className="text-center group relative"
            >
              {/* Fun background circle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#03A6A1]/10 to-[#FFA673]/10 group-hover:from-[#FFA673]/20 group-hover:to-[#FF4F0F]/20 transition-all" />
              </motion.div>

              <motion.div
                className="text-5xl mb-4 relative z-10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
              >
                {stat.icon}
              </motion.div>

              <div className="font-mono relative z-10">
                <motion.span
                  className="text-4xl font-bold bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-2xl text-gray-600">{stat.suffix}</span>
              </div>

              <div className="font-mono text-sm text-gray-600 uppercase tracking-wider mt-2 relative z-10">
                {stat.label}
              </div>

              {/* Fun tooltip on hover */}
              <motion.div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#03A6A1] to-[#FFA673] text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                {index === 0
                  ? "Growing daily! 🎉"
                  : index === 1
                  ? "Amazing results! ⚡"
                  : index === 2
                  ? "Never miss a sale! 💰"
                  : "Completely free! 🤝"}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Marcus Johnson",
      role: "Electronics Store Owner, Chicago",
      content:
        "My online store was built in just 15 minutes! Sales increased by 60% in the first month. The AI understood exactly what I needed for my electronics business.",
      rating: 5,
      gradient: "from-[#03A6A1] to-[#03A6A1]/70",
      avatar: "👨‍💼",
    },
    {
      name: "Sarah Chen",
      role: "Fashion Boutique, San Francisco",
      content:
        "During the pandemic, my online store kept my business alive. I now get orders from across the country. The payment system works perfectly with all major cards.",
      rating: 5,
      gradient: "from-[#FFA673] to-[#FFA673]/70",
      avatar: "👩‍💼",
    },
    {
      name: "David Rodriguez",
      role: "Sporting Goods Store, Miami",
      content:
        "I was skeptical at first, but the results speak for themselves. Monthly revenue increased by $8,000-$10,000. The admin panel makes managing inventory so easy.",
      rating: 5,
      gradient: "from-[#FF4F0F] to-[#FF4F0F]/70",
      avatar: "👨‍💻",
    },
  ];

  return (
    <section
      ref={ref}
      id="success-stories"
      className="relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFA673]/5 to-[#FFE3BB]/30" />

      {/* Floating quotes with fun animation */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl text-[#03A6A1]/10 font-serif"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
          >
            "
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <Users className="w-4 h-4 text-[#03A6A1]" />
            <span className="text-xs font-mono text-[#03A6A1] uppercase tracking-wider">
              Success Stories
            </span>
          </motion.div>

          <h2 className="font-mono text-3xl lg:text-4xl font-bold text-gray-900">
            Real Shopkeepers,
            <span className="block bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] bg-clip-text text-transparent">
              Real Success Stories 🎉
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono mt-4">
            See how other shopkeepers transformed their business and started
            earning more
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div
                className={`bg-gradient-to-br ${testimonial.gradient} p-px rounded-2xl`}
              >
                <div className="bg-white rounded-2xl p-8 h-full relative overflow-hidden">
                  {/* Fun avatar */}
                  <motion.div
                    className="absolute -top-8 -right-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {testimonial.avatar}
                  </motion.div>

                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <Star className="w-4 h-4 fill-[#FFA673] text-[#FFA673]" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="font-mono text-sm text-gray-700 mb-6 italic relative z-10">
                    "{testimonial.content}"
                    <motion.span
                      className="text-lg ml-2 inline-block"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💯
                    </motion.span>
                  </p>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-mono font-semibold text-gray-900 flex items-center">
                      {testimonial.name}
                      <span className="ml-2 text-xl">{testimonial.avatar}</span>
                    </p>
                    <p className="font-mono text-xs text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple pricing section */}
        {/* <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-br from-[#03A6A1] to-[#FF4F0F] rounded-3xl p-1 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8">
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💰
              </motion.div>
              <h3 className="font-mono text-2xl font-bold text-gray-900 mb-4">
                Simple Pricing - No Hidden Costs
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-[#03A6A1]">FREE</span>
                <span className="text-xl text-gray-600"> Setup</span>
              </div>
              <div className="text-lg text-gray-700 mb-6">
                Then just <strong className="text-[#FF4F0F]">₹299/month</strong>{" "}
                - Cancel anytime
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Complete website with your products
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  WhatsApp ordering system
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  UPI/Card payment collection
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  24/7 support in Hindi/English
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Money-back guarantee!</strong> If you don't get more
                  customers in the first month, we'll refund your money.
                </p>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

const CTASection = ({
  email,
  setEmail,
  phone,
  setPhone,
  handleRegister,
}: {
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  handleRegister: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#03A6A1] via-[#FFA673] to-[#FF4F0F]">
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-black"
        />
      </div>

      {/* Fun animated particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [
                -100,
                -(typeof window !== "undefined" ? window.innerHeight : 1000),
              ],
              x: [0, i % 2 === 0 ? 50 : -50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
            style={{
              left: `${5 + i * 6}%`,
              bottom: 0,
            }}
          >
            <span className="text-2xl">
              {["🌟", "✨", "⭐", "💫", "🎉", "🏪", "💰"][i % 7]}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="font-mono text-4xl lg:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Ready to Launch Your
          <motion.span
            className="block"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            E-commerce Empire? 🚀
          </motion.span>
        </motion.h2>

        <motion.p
          className="font-mono text-lg text-white/90 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join 500+ entrepreneurs building with Codepup 🎪
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-10 py-4 rounded-lg font-mono font-bold text-lg shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden group"
          >
            <Dialog>
              <DialogTrigger asChild>
                <button className="relative bg-gradient-to-r from-[#FF4F0F] to-[#FFA673] text-white px-8 py-3 rounded-lg font-mono font-semibold shadow-lg hover:shadow-xl transition-all overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Get Early Access - FREE</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🚀
                    </motion.span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Join the Waitlist! 🎉</DialogTitle>
                  <DialogDescription>
                    Be the first to know when Codepup launches! Get early access
                    to our AI-powered store builder ✨
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>What happens next?</strong>
                      <br />
                      You'll be the first to get access when we launch, plus
                      exclusive early-bird pricing! 🎯
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Maybe Later</Button>
                  </DialogClose>
                  <Button
                    onClick={handleRegister}
                    type="submit"
                    className="bg-gradient-to-r from-[#03A6A1] to-[#FFA673] hover:from-[#FFA673] hover:to-[#FF4F0F]"
                  >
                    Join Waitlist! 🎉
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.1 }}
            />
          </motion.button>

          <motion.div
            className="flex items-center text-white/90"
            whileHover={{ scale: 1.02 }}
          >
            <Phone className="w-5 h-5 mr-2" />
            <span className="font-mono">or call us: +1 (555) 123-4567</span>
          </motion.div>
        </motion.div>

        <motion.p
          className="font-mono text-sm text-white/70 mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          No setup cost • 1 month free trial • Cancel anytime • 24/7 support 🎈
        </motion.p>

        {/* Fun celebration emojis */}
        <motion.div
          className="absolute bottom-10 left-10 text-4xl"
          animate={{
            y: [0, -20, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎊
        </motion.div>
        <motion.div
          className="absolute top-10 right-10 text-4xl"
          animate={{
            y: [0, 20, 0],
            rotate: [10, -10, 10],
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          🏪
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.img
                src="/logo.png"
                alt="Codepup"
                className="w-8 h-8"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="text-xl font-mono font-bold">Codepup</span>
            </div>
            <p className="font-mono text-sm text-gray-400">
              Building the future of e-commerce with AI-powered solutions since
              2020.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono font-semibold mb-4 text-[#FFA673]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Benefits", "How It Works", "Success Stories", "Pricing"].map(
                (link) => (
                  <li key={link}>
                    <motion.a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="font-mono text-sm text-gray-400 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono font-semibold mb-4 text-[#FFA673]">
              Support
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <span className="w-4 h-4 mr-2">📧</span>
                help@codepup.com
              </li>
              <li className="text-sm text-gray-400">24/7 Customer Support</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-mono font-semibold mb-4 text-[#FFA673]">
              Business Types
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>🏪 Retail Stores</li>
              <li>🛍️ Fashion Boutiques</li>
              <li>💊 Health & Wellness</li>
              <li>👗 Clothing Stores</li>
              <li>🔧 Hardware Stores</li>
              <li>📱 Electronics Shops</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-gray-400">
            &copy; 2025 Codepup. Made with ❤️ for entrepreneurs worldwide.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Home;
