import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ruth from './ruth.png';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center text-white font-serif text-xl italic">RG</div>
          <span className="font-serif text-xl font-medium tracking-tight">Ruth Goswell <span className="text-emerald-800 italic">HR</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-emerald-800 transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-emerald-800 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-900 transition-all shadow-md hover:shadow-lg">
            Free Consultation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-800 border-b border-slate-100 pb-2"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="bg-emerald-800 text-white px-6 py-4 rounded-xl text-center font-medium"
            >
              Book Free Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description, items }: { icon: any, title: string, description: string, items: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-8 rounded-2xl flex flex-col h-full"
  >
    <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-serif mb-4">{title}</h3>
    <p className="text-slate-600 mb-6 text-sm leading-relaxed">{description}</p>
    <ul className="mt-auto space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
          <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const PricingCard = ({ title, price, description, features, popular = false }: { title: string, price: string, description: string, features: string[], popular?: boolean }) => (
  <div className={`relative p-8 rounded-3xl flex flex-col h-full transition-all ${popular ? 'bg-emerald-900 text-white shadow-2xl scale-105 z-10' : 'bg-white border border-slate-200 text-slate-900'}`}>
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
        Most Popular
      </div>
    )}
    <h4 className="text-xl font-serif mb-2">{title}</h4>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-3xl font-bold">{price}</span>
      <span className={`text-sm ${popular ? 'text-emerald-200' : 'text-slate-500'}`}>/month</span>
    </div>
    <p className={`text-sm mb-8 ${popular ? 'text-emerald-100' : 'text-slate-600'}`}>{description}</p>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <CheckCircle2 size={18} className={popular ? 'text-emerald-400' : 'text-emerald-600'} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
    <a 
      href="#contact" 
      className={`w-full py-3 rounded-xl text-center font-medium transition-all ${popular ? 'bg-white text-emerald-900 hover:bg-emerald-50' : 'bg-emerald-800 text-white hover:bg-emerald-900'}`}
    >
      Get Started
    </a>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        className="w-full flex justify-between items-center text-left gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-slate-800">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-600 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50/50 rounded-bl-[200px]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Torquay & South Devon HR Support
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
              Straightforward HR for <span className="text-emerald-800 italic">independent</span> businesses.
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              No jargon. No fuss. Just practical, legally sound HR support for Torbay employers who need expert help without a full-time hire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-emerald-800 text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Book Free Consultation <ArrowRight size={18} />
              </a>
              <a href="#services" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-medium hover:bg-slate-50 transition-all flex items-center justify-center">
                View Services
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-slate-400">
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-slate-800">15+</span>
                <span className="text-xs uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-slate-800">100%</span>
                <span className="text-xs uppercase tracking-wider">Local Focus</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src={ruth}
  alt="Ruth Goswell HR Professional" 
  className="w-full h-full object-cover"
/>
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-emerald-600" size={20} />
                <span className="font-bold text-sm">CIPD Qualified</span>
              </div>
              <p className="text-xs text-slate-500">Expert advice you can trust for your business and team.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Does this sound familiar?</h2>
          <p className="text-slate-600">Running a business is hard enough without the stress of complex employment law.</p>
        </div>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: AlertCircle, text: "I need to deal with an employee issue but don't know where to start." },
            { icon: FileText, text: "Our contracts are years out of date and I'm worried about compliance." },
            { icon: MessageSquare, text: "I need to handle a difficult disciplinary or grievance properly." },
            { icon: Users, text: "We're growing fast and need proper HR foundations for our team." },
            { icon: Clock, text: "I'm spending too much time on staff issues and not enough on my business." },
            { icon: HelpCircle, text: "I want expert HR support but can't justify a full-time hire." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4 items-start">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                <item.icon size={20} />
              </div>
              <p className="text-slate-700 font-medium leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-emerald-800 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">What We Do</span>
              <h2 className="text-4xl md:text-6xl font-serif">Practical HR solutions for <span className="italic">every</span> stage.</h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm">From one-off projects to ongoing monthly support, we tailor our services to fit your unique business needs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={ShieldCheck}
              title="Compliance & Contracts"
              description="Ensure your business is protected with up-to-date employment contracts and staff handbooks tailored to your industry."
              items={["Employment Contracts", "Staff Handbooks", "Policy Development", "HR Audits"]}
            />
            <ServiceCard 
              icon={MessageSquare}
              title="Employee Relations"
              description="Expert guidance through difficult workplace situations, ensuring processes are fair, legal, and professional."
              items={["Disciplinaries", "Grievances", "Performance Management", "Absence Management"]}
            />
            <ServiceCard 
              icon={Users}
              title="Growth & Change"
              description="Support for businesses evolving their team structure or handling sensitive organizational changes."
              items={["Redundancy Support", "Restructuring", "Recruitment Advice", "Onboarding Processes"]}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Meet Ruth Goswell</h2>
            <div className="space-y-6 text-emerald-100 leading-relaxed">
              <p>
                With over 15 years of experience in UK Human Resources, I've seen first-hand the challenges that independent business owners face when managing people.
              </p>
              <p>
                I founded this consultancy to provide Torquay and South Devon businesses with a different kind of HR: one that is practical, commercial, and completely free of corporate jargon.
              </p>
              <p>
                My goal is to take the weight of HR off your shoulders, giving you the confidence that your business is compliant and your team is well-managed, so you can focus on what you do best.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="text-emerald-400" />
              </div>
              <div>
                <p className="font-serif text-xl">Ruth Goswell</p>
                <p className="text-xs uppercase tracking-widest text-emerald-400">Founder & Principal Consultant</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border-8 border-emerald-800/50">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000" 
                  alt="Ruth Goswell working" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-emerald-500 text-white p-8 rounded-2xl shadow-xl hidden lg:block">
                <p className="text-4xl font-serif mb-1 italic">"Practical advice for real-world business."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Simple, transparent support.</h2>
            <p className="text-slate-600">Expert HR support shouldn't be a luxury. Choose the plan that fits your current team size and needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              title="HR Advice Line"
              price="£149"
              description="Perfect for small teams who just need someone to call when issues arise."
              features={[
                "Unlimited email support",
                "Monthly 30-min advice call",
                "Standard contract templates",
                "Policy update alerts",
                "Next-day response time"
              ]}
            />
            <PricingCard 
              title="HR Support"
              price="£299"
              popular={true}
              description="Our most popular plan for growing businesses with 5-20 employees."
              features={[
                "Everything in Advice Line",
                "Bespoke Staff Handbook",
                "Disciplinary/Grievance guidance",
                "Performance review templates",
                "Quarterly HR health check",
                "Same-day response priority"
              ]}
            />
            <PricingCard 
              title="HR Partner"
              price="£495"
              description="Comprehensive support for businesses who want a fully outsourced HR department."
              features={[
                "Everything in HR Support",
                "On-site support (1 day/mo)",
                "Full recruitment management",
                "Custom training sessions",
                "Strategic HR planning",
                "Dedicated WhatsApp support"
              ]}
            />
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">Need a one-off project? <a href="#contact" className="text-emerald-800 font-bold underline">Contact us for a custom quote.</a></p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Common Questions</h2>
            <p className="text-slate-600 mb-8">Everything you need to know about working with an outsourced HR consultant.</p>
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-bold">Still have questions?</p>
                  <p className="text-sm text-slate-500">Call Ruth directly for a quick chat.</p>
                </div>
              </div>
              <a href="tel:01803000000" className="block w-full py-4 bg-emerald-800 text-white text-center rounded-xl font-medium hover:bg-emerald-900 transition-all">
                01803 000 000
              </a>
            </div>
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="Why should I use an HR consultant instead of a solicitor?"
              answer="Solicitors are great for litigation, but they can be expensive and often provide very risk-averse, 'black and white' advice. As an HR consultant, I provide practical, commercial advice that helps you manage people day-to-day while staying legal. I focus on preventing problems before they reach a solicitor's desk."
            />
            <FAQItem 
              question="Do I have to sign a long-term contract?"
              answer="No. While many clients prefer the peace of mind of a monthly retainer, I also offer project-based support for one-off needs like a redundancy process or a new staff handbook. My retainers have a simple 30-day notice period."
            />
            <FAQItem 
              question="What size businesses do you work with?"
              answer="I specialize in small independent businesses, typically with between 5 and 50 employees. This is the 'sweet spot' where you have enough staff to need proper HR, but aren't big enough to hire a full-time HR Manager."
            />
            <FAQItem 
              question="Are you based in Torquay?"
              answer="Yes, I am based locally in Torquay and work with businesses across the Torbay and South Devon area, including Paignton, Brixham, Newton Abbot, and Totnes. I believe local support is better because I can be on-site when you need me."
            />
            <FAQItem 
              question="How quickly can you help me with a problem?"
              answer="For urgent matters, I aim to respond to my retainer clients within 4 hours. For general enquiries, I always respond within one working day. I know that when a staff issue arises, you need answers fast."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-emerald-800 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Get In Touch</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Let's talk about your <span className="italic text-emerald-800">team</span>.</h2>
              <p className="text-slate-600 mb-12 leading-relaxed">
                Whether you have an urgent employee issue or just want to ensure your business is compliant, I'm here to help. Book a free 20-minute consultation to discuss your needs.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Email</p>
                    <p className="font-medium">hello@ruthgoswellhr.co.uk</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                    <p className="font-medium">01803 000 000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Office</p>
                    <p className="font-medium">Torquay, South Devon</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 md:p-12 rounded-[40px] border border-slate-100">
              <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                    <input type="text" name="name" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Name</label>
                    <input type="text" name="business" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="The Beach Cafe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">How can I help?</label>
                  <textarea name="message" required rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none" placeholder="Tell me a little about your HR needs..."></textarea>
                </div>
                <button type="submit" className="w-full bg-emerald-800 text-white py-4 rounded-xl font-bold hover:bg-emerald-900 transition-all shadow-lg hover:shadow-xl">
                  Send Enquiry
                </button>
                <p className="text-[10px] text-center text-slate-400">By submitting this form, you agree to our privacy policy. We aim to respond within 24 hours.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-serif text-xl italic">RG</div>
              <span className="font-serif text-2xl font-medium tracking-tight">Ruth Goswell <span className="text-emerald-500 italic">HR</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Providing practical, straightforward HR support for independent businesses across Torquay, Paignton, Brixham, and South Devon.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer">
                <span className="text-xs font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Services</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">HR Advice Line</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Contracts & Policies</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Employee Relations</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Redundancy Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Ruth</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Ruth Goswell HR. All rights reserved.</p>
          <p>Registered in England & Wales. CIPD Member.</p>
        </div>
      </footer>
    </div>
  );
}
