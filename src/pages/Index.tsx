import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const AVATAR_URL =
  "https://cdn.poehali.dev/projects/4eb5a51c-2851-4f25-a703-447027f24d64/files/371318c2-af3b-4b78-bc22-ec86bdcadf3f.jpg";

const GALLERY_IMAGES = [
  "https://cdn.poehali.dev/projects/4eb5a51c-2851-4f25-a703-447027f24d64/files/bb80ea7d-b0ad-4952-8252-bfb4938bc93f.jpg",
  "https://cdn.poehali.dev/projects/4eb5a51c-2851-4f25-a703-447027f24d64/files/371318c2-af3b-4b78-bc22-ec86bdcadf3f.jpg",
  "https://cdn.poehali.dev/projects/4eb5a51c-2851-4f25-a703-447027f24d64/files/bb80ea7d-b0ad-4952-8252-bfb4938bc93f.jpg",
  "https://cdn.poehali.dev/projects/4eb5a51c-2851-4f25-a703-447027f24d64/files/371318c2-af3b-4b78-bc22-ec86bdcadf3f.jpg",
  "https://cdn.poehali.dev/projects/4eb5a51c-2851-4f25-a703-447027f24d64/files/bb80ea7d-b0ad-4952-8252-bfb4938bc93f.jpg",
  "https://cdn.poehali.dev/projects/4eb5a51c-2851-4f25-a703-447027f24d64/files/371318c2-af3b-4b78-bc22-ec86bdcadf3f.jpg",
];

const SKILLS = [
  { name: "Дизайн", level: 90 },
  { name: "Фотография", level: 85 },
  { name: "Иллюстрация", level: 75 },
  { name: "Видеосъёмка", level: 68 },
  { name: "3D-моделирование", level: 55 },
];

const ACHIEVEMENTS = [
  {
    icon: "Trophy",
    title: "Победитель конкурса",
    desc: "Международный фестиваль дизайна 2024",
    year: "2024",
  },
  {
    icon: "Star",
    title: "Лучший проект года",
    desc: "По версии профессионального сообщества",
    year: "2023",
  },
  {
    icon: "Award",
    title: "100+ довольных клиентов",
    desc: "За 5 лет профессиональной практики",
    year: "2019–2024",
  },
  {
    icon: "Layers",
    title: "250 завершённых проектов",
    desc: "Брендинг, фото, иллюстрация, UX",
    year: "всего",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);

  const aboutInView = useInView();
  const skillsInView = useInView();
  const achievementsInView = useInView();
  const galleryInView = useInView();
  const contactInView = useInView();

  const navItems = [
    { id: "profile", label: "Профиль" },
    { id: "about", label: "О себе" },
    { id: "skills", label: "Навыки" },
    { id: "gallery", label: "Галерея" },
    { id: "achievements", label: "Достижения" },
    { id: "contacts", label: "Контакты" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-warm-50 font-golos">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-100/80 backdrop-blur-md border-b border-warm-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cormorant text-xl font-semibold text-gold-700 tracking-wide italic">
            Анна Смирнова
          </span>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-golos tracking-wide transition-colors ${
                  activeSection === item.id
                    ? "text-gold-600 font-medium"
                    : "text-warm-500 hover:text-gold-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-gold-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-warm-100 border-t border-warm-200 px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-sm tracking-wide transition-colors ${
                  activeSection === item.id
                    ? "text-gold-600 font-medium"
                    : "text-warm-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO / PROFILE ── */}
      <section
        id="profile"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{ background: "var(--grad-hero)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-8 w-px h-32 bg-gold-400/30" />
          <div className="absolute top-1/4 right-8 w-px h-32 bg-gold-400/30" />
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-px bg-gold-400/40" />
          <div
            className="absolute -top-10 -right-10 w-80 h-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #d4a574 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #c9915a 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <div className="flex justify-center mb-8 fade-up fade-up-delay-1">
            <div className="avatar-ring shadow-2xl">
              <div className="rounded-full overflow-hidden w-36 h-36 md:w-44 md:h-44">
                <img src={AVATAR_URL} alt="Аватар" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="fade-up fade-up-delay-2 flex justify-center mb-4">
            <span className="text-xs tracking-[0.25em] uppercase text-gold-600 font-golos border border-gold-300 px-4 py-1.5 rounded-full bg-white/40">
              Творческий специалист
            </span>
          </div>

          <h1 className="fade-up fade-up-delay-3 font-cormorant text-5xl md:text-7xl font-light text-warm-900 leading-tight mb-4">
            Анна <span className="italic text-gold-600">Смирнова</span>
          </h1>

          <p className="fade-up fade-up-delay-4 font-golos text-warm-500 text-lg font-light mb-8 leading-relaxed">
            Дизайнер · Фотограф · Иллюстратор
          </p>

          <div className="fade-up fade-up-delay-5 flex justify-center gap-5 mb-10">
            {[
              { icon: "Instagram", label: "Instagram" },
              { icon: "Youtube", label: "YouTube" },
              { icon: "Send", label: "Telegram" },
            ].map((s) => (
              <button
                key={s.label}
                className="w-10 h-10 rounded-full bg-white/60 border border-warm-200 flex items-center justify-center text-gold-600 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 shadow-sm"
                title={s.label}
              >
                <Icon name={s.icon} size={16} />
              </button>
            ))}
          </div>

          <div className="fade-up fade-up-delay-6">
            <button
              onClick={() => scrollTo("contacts")}
              className="font-golos px-8 py-3 bg-gold-600 text-white rounded-full text-sm tracking-wide hover:bg-gold-700 transition-colors shadow-lg"
            >
              Связаться со мной
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-500/60">
          <span className="text-xs tracking-widest uppercase font-golos">Scroll</span>
          <div className="w-px h-8 bg-gold-400/40 animate-pulse" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        ref={aboutInView.ref}
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: "var(--grad-about)" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${aboutInView.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="avatar-ring-square inline-block shadow-xl">
              <div className="overflow-hidden" style={{ borderRadius: "0.875rem" }}>
                <img
                  src={AVATAR_URL}
                  alt="О себе"
                  className="w-full max-w-sm aspect-[4/5] object-cover block"
                />
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${aboutInView.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-gold-500 mb-4 font-golos">О себе</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-warm-900 mb-6 leading-tight">
              Создаю красоту<br />
              <span className="italic text-gold-600">из простых вещей</span>
            </h2>
            <p className="font-golos text-warm-500 leading-relaxed mb-5">
              Меня зовут Анна, я творческий специалист с более чем 5-летним опытом в дизайне,
              фотографии и иллюстрации. Моя работа — это поиск гармонии между формой и содержанием.
            </p>
            <p className="font-golos text-warm-500 leading-relaxed mb-8">
              Работаю с брендами, частными клиентами и культурными организациями. Верю, что каждый
              проект — это история, которую стоит рассказать через визуальный язык.
            </p>
            <div className="flex gap-8">
              {[["5+", "лет опыта"], ["250+", "проектов"], ["100+", "клиентов"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-cormorant text-3xl font-semibold text-gold-600">{num}</p>
                  <p className="text-xs text-warm-400 font-golos tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        ref={skillsInView.ref}
        className="relative py-24 px-6"
        style={{ background: "var(--grad-skills)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-14 transition-all duration-700 ${skillsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-gold-500 mb-3 font-golos">Компетенции</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-warm-900">
              Мои <span className="italic text-gold-600">навыки</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.name}
                className={`transition-all duration-700 ${skillsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-golos text-sm text-warm-700 font-medium tracking-wide">{skill.name}</span>
                  <span className="font-cormorant text-lg text-gold-500 font-medium">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-warm-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full skill-bar"
                    style={{
                      "--skill-w": `${skill.level}%`,
                      background: "linear-gradient(90deg, #c9915a, #e8c49a)",
                      animationPlayState: skillsInView.visible ? "running" : "paused",
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 flex flex-wrap gap-3 justify-center transition-all duration-700 delay-700 ${skillsInView.visible ? "opacity-100" : "opacity-0"}`}
          >
            {["Figma", "Adobe CC", "Cinema 4D", "Lightroom", "Procreate", "Blender", "After Effects"].map((tag) => (
              <span
                key={tag}
                className="font-golos text-xs px-4 py-2 border border-gold-300 text-gold-700 rounded-full bg-white/50 hover:bg-gold-50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section
        id="gallery"
        ref={galleryInView.ref}
        className="relative py-24 px-6"
        style={{ background: "var(--grad-gallery)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-14 transition-all duration-700 ${galleryInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-gold-500 mb-3 font-golos">Работы</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-warm-900">
              Моя <span className="italic text-gold-600">галерея</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div
                key={i}
                className={`gallery-item rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-700 ${galleryInView.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{ transitionDelay: `${i * 80 + 100}ms` }}
              >
                <div className="aspect-[4/3] relative group">
                  <img src={src} alt={`Работа ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/20 transition-colors duration-300 flex items-center justify-center">
                    <Icon name="ZoomIn" size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-10 transition-all duration-700 delay-700 ${galleryInView.visible ? "opacity-100" : "opacity-0"}`}
          >
            <button className="font-golos text-sm text-gold-600 border border-gold-300 px-8 py-3 rounded-full hover:bg-gold-50 transition-colors">
              Смотреть все работы
            </button>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section
        id="achievements"
        ref={achievementsInView.ref}
        className="relative py-24 px-6"
        style={{ background: "var(--grad-achievements)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-14 transition-all duration-700 ${achievementsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-gold-500 mb-3 font-golos">Результаты</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-warm-900">
              Мои <span className="italic text-gold-600">достижения</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                className={`relative bg-white/60 backdrop-blur-sm border border-warm-200 rounded-2xl p-7 hover:shadow-lg hover:border-gold-300 transition-all duration-500 group ${achievementsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: "radial-gradient(circle at top right, #c9915a, transparent 70%)" }}
                />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon name={a.icon} size={20} className="text-white" fallback="Star" />
                  </div>
                  <div>
                    <p className="font-golos font-semibold text-warm-800 mb-1">{a.title}</p>
                    <p className="font-golos text-sm text-warm-400 mb-2">{a.desc}</p>
                    <span className="font-cormorant text-sm italic text-gold-500">{a.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section
        id="contacts"
        ref={contactInView.ref}
        className="relative py-28 px-6 overflow-hidden"
        style={{ background: "var(--grad-contact)" }}
      >
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #c9915a 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #e8c49a 0%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-700 ${contactInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-gold-400 mb-3 font-golos">Связаться</p>
            <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white mb-4">
              Давайте <span className="italic text-gold-400">создадим</span>
              <br />что-то вместе
            </h2>
            <p className="font-golos text-white/50 text-base">Открыта к сотрудничеству и новым проектам</p>
          </div>

          <div
            className={`grid sm:grid-cols-3 gap-5 mb-12 transition-all duration-700 delay-200 ${contactInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {[
              { icon: "Mail", label: "Почта", value: "anna@example.com" },
              { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
              { icon: "MapPin", label: "Город", value: "Москва, Россия" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center">
                  <Icon name={c.icon} size={18} className="text-gold-400" />
                </div>
                <p className="text-xs uppercase tracking-widest text-white/30 font-golos">{c.label}</p>
                <p className="font-golos text-sm text-white/80">{c.value}</p>
              </div>
            ))}
          </div>

          <div
            className={`bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-700 delay-400 ${contactInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs text-white/40 font-golos tracking-wide mb-2">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 font-golos focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 font-golos tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  placeholder="ivan@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 font-golos focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs text-white/40 font-golos tracking-wide mb-2">Сообщение</label>
              <textarea
                rows={4}
                placeholder="Расскажите о вашем проекте..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 font-golos focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
              />
            </div>
            <button className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-700 text-white font-golos text-sm tracking-wide rounded-xl hover:from-gold-600 hover:to-gold-800 transition-all duration-300 shadow-lg">
              Отправить сообщение
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-warm-900 py-8 px-6 text-center" style={{ backgroundColor: "#261a10" }}>
        <p className="font-cormorant text-warm-400 italic text-lg mb-1" style={{ color: "#9a7a5a" }}>
          Анна Смирнова
        </p>
        <p className="font-golos text-xs tracking-widest uppercase" style={{ color: "#5a4030" }}>
          © 2024 · Все права защищены
        </p>
      </footer>
    </div>
  );
}
