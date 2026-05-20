import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, X as XIcon, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

// Use the images the user shared via the hitster-ai site
const GALLERY_IMAGES = [
  { src: `${import.meta.env.BASE_URL}image_opt (1).jpeg`, alt: "Editorial styling" },
  { src: `${import.meta.env.BASE_URL}image_opt (2).jpeg`, alt: "Surreal photography" },
  { src: `${import.meta.env.BASE_URL}image_opt (3).jpeg`, alt: "Conceptual art" },
  { src: `${import.meta.env.BASE_URL}image_opt (4).jpeg`, alt: "Creative direction" },
  { src: `${import.meta.env.BASE_URL}image_opt (5).jpeg`, alt: "Surrealist composition" },
  { src: `${import.meta.env.BASE_URL}image_opt (6).jpeg`, alt: "Brand image" },
  { src: `${import.meta.env.BASE_URL}image_opt (7).jpeg`, alt: "Fashion campaign" },
  { src: `${import.meta.env.BASE_URL}image_opt.jpeg`, alt: "Photorealistic portrait" },
  { src: `${import.meta.env.BASE_URL}ivan 004_opt.jpeg`, alt: "Product visualization" },
  { src: `${import.meta.env.BASE_URL}diana 003_opt.jpeg`, alt: "Fashion portrait" },
  { src: `${import.meta.env.BASE_URL}flesh-mafazine-2.jpg`, alt: "Visual transformation" },
  { src: `${import.meta.env.BASE_URL}Ivan Aguirre Portafolios 36_opt.jpeg`, alt: "Landscape composition" },
  { src: `${import.meta.env.BASE_URL}INSTAGRAM  MARIANA TREVIÑO3_opt.jpeg`, alt: "Conceptual art" },
  { src: `${import.meta.env.BASE_URL}CleanShot 2026-05-18 at 21_opt.jpeg`, alt: "Brand image" },
  { src: `${import.meta.env.BASE_URL}77461487238731_opt.jpeg`, alt: "Surrealist composition" },
  { src: `${import.meta.env.BASE_URL}WhatsApp Image 2026-05-18 at 15_opt.jpeg`, alt: "Editorial fashion" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when lightbox or mobile menu is open
  useEffect(() => {
    if (lightboxIndex !== null || mobileMenuOpen || privacyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxIndex, mobileMenuOpen, privacyModalOpen]);

  return (
    <div id="top" className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans selection:bg-[#F27D26] selection:text-white">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col z-50 relative">
            <span className="text-xl font-medium tracking-tight">Ivan Aguirre</span>
          </motion.div>

          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest font-semibold text-white/60">
            <a href="#about" className="hover:text-[#F27D26] transition-colors">Visión</a>
            <a href="#gallery" className="hover:text-[#F27D26] transition-colors">Galería</a>
            <a href="#contact" className="hover:text-[#F27D26] transition-colors">Contacto</a>
          </div>

          <button className="md:hidden text-white z-50 relative p-2 -mr-2 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
            >
              {["#about:Visión", "#gallery:Galería", "#contact:Contacto"].map((item) => {
                const [href, label] = item.split(":");
                return (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest font-semibold text-white/80 hover:text-[#F27D26] transition-colors">
                    {label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <header id="about" className="relative h-[100svh] flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
            className="flex h-full min-w-max"
          >
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
              <div key={i} className="h-full w-[100vw] sm:w-[50vw] md:w-[33.333vw] lg:w-[25vw] flex-shrink-0 border-r border-white/5">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-50 grayscale-[30%] brightness-75" />
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter leading-[0.9] text-white">Ivan Aguirre</h2>
          </motion.div>
        </div>
      </header>

      {/* Selling Point Section */}
      <section className="py-24 md:py-44 px-6 bg-gradient-to-b from-black to-[#0a0a0a] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#F27D26] font-bold">Maestro de la Luz & Fashion</span>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-medium tracking-tight leading-[0.9] text-balance">
              El maestro del <span className="text-white/40 italic">fashion</span> <br className="hidden md:block" /> y del surrealismo en México.
            </h1>
            <div className="space-y-6 text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
              <p className="text-justify">
                A través de una visión única y una técnica impecable, Ivan Aguirre transforma campañas fotográficas en obras de arte. Su enfoque surrealista y dominio de la iluminación ayudan a las marcas a comunicar su esencia con una identidad visual inconfundible.
              </p>
              <p className="text-justify">
                Elevando el posicionamiento en la industria de la moda y más allá. Desde producciones para revistas de alto perfil hasta campañas internacionales de belleza.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery — Static Layout matching Hitster Ai */}
      <section id="gallery" className="py-16 md:py-40 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end border-b border-white/10 pb-10 md:pb-16">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#F27D26] font-bold">Galería Fotográfica</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] text-balance">
                Moda, luz y surrealismo.
              </h2>
            </div>
            <div className="space-y-5 text-white/60 font-light leading-relaxed text-justify">
              <p>
                Un portafolio selecto que refleja texturas, identidad y conceptualización artística tanto en publicidad de alto impacto como en arte editorial.
              </p>
              <p className="text-[#F27D26]/80 font-normal text-xs uppercase tracking-widest mt-4">
                Ver más detalles enviando un mensaje directo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-square bg-white/5 rounded-xl overflow-hidden border border-white/10 cursor-pointer shadow-lg"
                aria-label={`Ver imagen ${i + 1} en grande`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/70 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center pt-8 md:pt-12">
            <a href="https://drive.google.com/file/d/1Gm5iAnViubT_CLdTrUk2d2KM8txSUbDr/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-4 border border-white/20 bg-white/5 hover:bg-[#F27D26] hover:border-[#F27D26] px-10 py-5 rounded-full transition-all duration-500 overflow-hidden">
              <span className="relative z-10 text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white">Portafolios</span>
              <ArrowRight size={18} className="relative z-10 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-md p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer z-10"
            >
              <XIcon size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#F27D26] border border-white/15 text-white rounded-full p-3 transition-all cursor-pointer z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#F27D26] border border-white/15 text-white rounded-full p-3 transition-all cursor-pointer z-10"
            >
              <ChevronRight size={22} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25 }}
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
            />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/40 font-bold">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(GALLERY_IMAGES.length).padStart(2, "0")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-40 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-16">
          <div className="space-y-4 md:space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#F27D26] font-bold">Contacto</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-balance">Colaboremos.</h2>
            <p className="text-base sm:text-xl text-white/50 font-light max-w-2xl mx-auto text-justify">
              Para llevar la visión de tu campaña o editorial al siguiente nivel, escríbenos a continuación.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            action="https://formsubmit.co/baez@hitster.page"
            method="POST"
            className="flex flex-col gap-4 md:gap-6 w-full max-w-xl mx-auto text-left"
          >
            <input type="hidden" name="_next" value="https://ferbaez.github.io/Ivan-Aguirre/" />
            <input type="hidden" name="_subject" value="Nuevo contacto desde el sitio web de Ivan Aguirre" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold ml-1">Nombre</label>
              <input type="text" name="name" id="name" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white text-base focus:outline-none focus:border-[#F27D26] focus:bg-white/10 transition-all font-light placeholder:text-white/20" placeholder="Tu nombre" />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold ml-1">Correo</label>
              <input type="email" name="email" id="email" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white text-base focus:outline-none focus:border-[#F27D26] focus:bg-white/10 transition-all font-light placeholder:text-white/20" placeholder="tu@correo.com" />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold ml-1">Mensaje</label>
              <textarea name="message" id="message" required rows={5} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white text-base focus:outline-none focus:border-[#F27D26] focus:bg-white/10 transition-all resize-none font-light placeholder:text-white/20" placeholder="¿De qué trata tu proyecto?" />
            </div>

            <div className="mt-2 md:mt-4">
              <button type="submit" className="w-full bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-[#F27D26] hover:text-white transition-all shadow-xl">Enviar mensaje</button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-50 hover:opacity-100 transition-opacity duration-700">
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#F27D26]">Ivan Aguirre</span>
            <span className="text-xs text-white/60">© 2026 todos los derechos reservados Hitster Media</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest font-bold items-center">
            <button onClick={() => setPrivacyModalOpen(true)} className="hover:text-[#F27D26] transition-colors underline underline-offset-4 cursor-pointer">Aviso de Privacidad</button>
            <a href="#top" className="flex items-center gap-1.5 hover:text-[#F27D26] transition-colors">Volver arriba <ArrowUpRight size={12} /></a>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      <AnimatePresence>
        {privacyModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md" onClick={() => setPrivacyModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[#111] border border-white/10 rounded-2xl p-5 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left text-white/70">
              <button onClick={() => setPrivacyModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 p-2 rounded-full cursor-pointer"><XIcon size={20} /></button>
              <h2 className="text-2xl font-medium text-white mb-6">Aviso de Privacidad</h2>
              <p className="mb-4 text-justify font-light">
                Este es un portafolio fotográfico. La información recopilada mediante el formulario de contacto (nombre y correo electrónico) es estrictamente utilizada para responder a consultas sobre colaboraciones y proyectos de fotografía. Tus datos no son cedidos, ni vendidos, ni usados para correos comerciales masivos. 
                <br /><br />Para cualquier aclaración o modificación sobre tus datos personales, puedes contactar al correo principal del estudio.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
