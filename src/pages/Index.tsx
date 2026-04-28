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
  { name: "Дизайн",           level: 90 },
  { name: "Фотография",       level: 85 },
  { name: "Иллюстрация",      level: 75 },
  { name: "Видеосъёмка",      level: 68 },
  { name: "3D-моделирование", level: 55 },
];

const ACHIEVEMENTS = [
  { icon: "Trophy", title: "Победитель конкурса",      desc: "Международный фестиваль дизайна 2024", year: "2024"      },
  { icon: "Star",   title: "Лучший проект года",       desc: "По версии профессионального сообщества", year: "2023"    },
  { icon: "Award",  title: "100+ довольных клиентов",  desc: "За 5 лет профессиональной практики",  year: "2019–2024" },
  { icon: "Layers", title: "250 завершённых проектов", desc: "Брендинг, фото, иллюстрация, UX",      year: "всего"    },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);

  const aboutInView        = useInView();
  const skillsInView       = useInView();
  const achievementsInView = useInView();
  const galleryInView      = useInView();
  const contactInView      = useInView();

  const navItems = [
    { id: "profile",      label: "Профиль"    },
    { id: "about",        label: "О себе"     },
    { id: "skills",       label: "Навыки"     },
    { id: "gallery",      label: "Галерея"    },
    { id: "achievements", label: "Достижения" },
    { id: "contacts",     label: "Контакты"   },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const s = document.getElementById(navItems[i].id);
        if (s && s.offsetTop <= scrollY) { setActiveSection(navItems[i].id); break; }
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
    <div className="min-h-screen font-golos" style={{ backgroundColor: "#0a0a0a", color: "#f0f0f0" }}>

      {/* ── NAV ── */}
      <nav style={{ backgroundColor: "rgba(6,6,6,0.9)", borderBottom: "1px solid #1a1a1a", backdropFilter: "blur(14px)" }}
        className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-cormorant text-lg font-semibold tracking-wide italic" style={{ color: "#f0f0f0" }}>
              Iliya Beietreu
            </span>
            <span className="font-golos text-xs tracking-[0.2em]" style={{ color: "#3a3a3a" }}>@canout</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="nav-link text-sm font-golos tracking-wide transition-colors"
                style={{ color: activeSection === item.id ? "#ffffff" : "#555" }}>
                {item.label}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2" style={{ color: "#888" }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #181818" }}
            className="md:hidden px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="text-left text-sm tracking-wide"
                style={{ color: activeSection === item.id ? "#fff" : "#555" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="profile" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 scanlines"
        style={{ background: "var(--grad-hero)" }}>

        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.035 }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * 9.09}%`, backgroundColor: "#fff" }} />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">

          {/* Lightning ring avatar */}
          <div className="flex justify-center mb-8 fade-up fade-up-delay-1">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="avatar-ring">
                <div className="avatar-ring-glow" />
                <div className="avatar-ring-inner rounded-full overflow-hidden"
                  style={{ width: 164, height: 164 }}>
                  <img src={AVATAR_URL} alt="Iliya Beietreu"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%) contrast(1.15)" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="fade-up fade-up-delay-2 flex justify-center mb-5">
            <span className="text-xs tracking-[0.28em] uppercase font-golos px-4 py-1.5 rounded-full"
              style={{ color: "#666", border: "1px solid #222", backgroundColor: "rgba(255,255,255,0.02)" }}>
              @canout
            </span>
          </div>

          <h1 className="fade-up fade-up-delay-3 font-cormorant leading-tight mb-3 electric-name"
            style={{ fontSize: "clamp(3rem, 9vw, 6rem)", fontWeight: 300, color: "#f5f5f5" }}>
            Iliya{" "}
            <span className="italic" style={{ color: "#ffffff" }}>Beietreu</span>
          </h1>

          <p className="fade-up fade-up-delay-4 font-golos text-base font-light mb-8"
            style={{ color: "#444", letterSpacing: "0.12em" }}>
            Дизайнер · Фотограф · Иллюстратор
          </p>

          <div className="fade-up fade-up-delay-5 flex justify-center gap-4 mb-10">
            {[
              { icon: "Instagram", label: "Instagram" },
              { icon: "Youtube",   label: "YouTube"   },
              { icon: "Send",      label: "Telegram"  },
            ].map((s) => (
              <button key={s.label} title={s.label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid #222", color: "#666" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#555"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#222"; (e.currentTarget as HTMLElement).style.color = "#666"; }}>
                <Icon name={s.icon} size={15} />
              </button>
            ))}
          </div>

          <div className="fade-up fade-up-delay-6">
            <button onClick={() => scrollTo("contacts")}
              className="font-golos px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
              style={{ backgroundColor: "#ececec", color: "#0a0a0a" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ececec"; }}>
              Связаться
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(255,255,255,0.15)" }}>
          <span className="text-xs tracking-widest uppercase font-golos">Scroll</span>
          <div className="w-px h-8 animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" ref={aboutInView.ref} className="relative py-24 px-6"
        style={{ background: "var(--grad-about)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className={`transition-all duration-700 ${aboutInView.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="avatar-ring-square inline-block">
              <div className="avatar-ring-square-inner overflow-hidden" style={{ borderRadius: "0.875rem" }}>
                <img src={AVATAR_URL} alt="Iliya Beietreu" className="block w-full max-w-sm"
                  style={{ aspectRatio: "4/5", objectFit: "cover", filter: "grayscale(100%) contrast(1.1)" }} />
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${aboutInView.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <p className="text-xs tracking-[0.2em] uppercase mb-4 font-golos" style={{ color: "#333" }}>О себе</p>
            <h2 className="font-cormorant font-light leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8e8e8" }}>
              Нахожу форму<br />
              <span className="italic" style={{ color: "#888" }}>в контрасте и тишине</span>
            </h2>
            <p className="font-golos leading-relaxed mb-4" style={{ color: "#555" }}>
              Меня зовут <span style={{ color: "#ccc" }}>Iliya Beietreu</span>, в сети —{" "}
              <span style={{ color: "#888" }}>@canout</span>. Более 5 лет работаю на стыке дизайна,
              фотографии и визуального сторителлинга.
            </p>
            <p className="font-golos leading-relaxed mb-8" style={{ color: "#555" }}>
              Строгий визуальный язык, чёткие линии, минимум лишнего — мой стиль и мой принцип в работе.
            </p>
            <div className="flex gap-8">
              {[["5+", "лет опыта"], ["250+", "проектов"], ["100+", "клиентов"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-cormorant text-3xl font-semibold" style={{ color: "#ffffff" }}>{num}</p>
                  <p className="text-xs font-golos tracking-wide" style={{ color: "#333" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={skillsInView.ref} className="relative py-24 px-6"
        style={{ background: "var(--grad-skills)" }}>
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-700 ${skillsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs tracking-[0.2em] uppercase mb-3 font-golos" style={{ color: "#333" }}>Компетенции</p>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8e8e8" }}>
              Навыки
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SKILLS.map((skill, i) => (
              <div key={skill.name}
                className={`transition-all duration-700 ${skillsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-golos text-sm font-medium tracking-wide" style={{ color: "#bbb" }}>{skill.name}</span>
                  <span className="font-cormorant text-lg" style={{ color: "#555" }}>{skill.level}%</span>
                </div>
                <div style={{ height: "1px", backgroundColor: "#1a1a1a", borderRadius: "1px", overflow: "hidden" }}>
                  <div className="skill-bar" style={{
                    height: "100%",
                    "--skill-w": `${skill.level}%`,
                    background: "linear-gradient(90deg, #ffffff 0%, #444 100%)",
                    animationPlayState: skillsInView.visible ? "running" : "paused",
                  } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 flex flex-wrap gap-3 justify-center transition-all duration-700 delay-700 ${skillsInView.visible ? "opacity-100" : "opacity-0"}`}>
            {["Figma", "Adobe CC", "Cinema 4D", "Lightroom", "Procreate", "Blender", "After Effects"].map((tag) => (
              <span key={tag} className="font-golos text-xs px-4 py-2 rounded-full"
                style={{ border: "1px solid #222", color: "#555", backgroundColor: "rgba(255,255,255,0.015)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" ref={galleryInView.ref} className="relative py-24 px-6"
        style={{ background: "var(--grad-gallery)" }}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-700 ${galleryInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs tracking-[0.2em] uppercase mb-3 font-golos" style={{ color: "#333" }}>Работы</p>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8e8e8" }}>
              Галерея <span className="italic" style={{ color: "#555" }}>@canout</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i}
                className={`gallery-item rounded-lg overflow-hidden cursor-pointer transition-all duration-700 ${galleryInView.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{ transitionDelay: `${i * 80 + 100}ms`, border: "1px solid #181818" }}>
                <div className="aspect-[4/3] relative group">
                  <img src={src} alt={`Работа ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Icon name="ZoomIn" size={26} style={{ color: "#fff" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-10 transition-all duration-700 delay-700 ${galleryInView.visible ? "opacity-100" : "opacity-0"}`}>
            <button className="font-golos text-sm px-8 py-3 rounded-full transition-colors"
              style={{ color: "#666", border: "1px solid #222" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ccc"; (e.currentTarget as HTMLElement).style.borderColor = "#444"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#666"; (e.currentTarget as HTMLElement).style.borderColor = "#222"; }}>
              Смотреть все работы
            </button>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" ref={achievementsInView.ref} className="relative py-24 px-6"
        style={{ background: "var(--grad-achievements)" }}>
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-700 ${achievementsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs tracking-[0.2em] uppercase mb-3 font-golos" style={{ color: "#333" }}>Результаты</p>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8e8e8" }}>
              Достижения
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i}
                className={`relative rounded-2xl p-7 card-electric group transition-all duration-500 ${achievementsInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${i * 120 + 200}ms`,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid #1a1a1a",
                }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.06), transparent 70%)" }} />
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid #252525" }}>
                    <Icon name={a.icon} size={18} fallback="Star" style={{ color: "#666" }} />
                  </div>
                  <div>
                    <p className="font-golos font-semibold mb-1" style={{ color: "#ddd" }}>{a.title}</p>
                    <p className="font-golos text-sm mb-2" style={{ color: "#444" }}>{a.desc}</p>
                    <span className="font-cormorant text-sm italic" style={{ color: "#333" }}>{a.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" ref={contactInView.ref} className="relative py-28 px-6 overflow-hidden"
        style={{ background: "var(--grad-contact)" }}>
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${contactInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs tracking-[0.2em] uppercase mb-3 font-golos" style={{ color: "#2a2a2a" }}>Связаться</p>
            <h2 className="font-cormorant font-light mb-3 electric-name"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", color: "#e8e8e8" }}>
              Напишите<br />
              <span className="italic" style={{ color: "#888" }}>Iliya Beietreu</span>
            </h2>
            <p className="font-golos" style={{ color: "#2e2e2e", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
              @canout · открыт к новым проектам
            </p>
          </div>

          <div className={`grid sm:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-200 ${contactInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { icon: "Mail",   label: "Почта",   value: "iliya@example.com"  },
              { icon: "Phone",  label: "Телефон", value: "+7 (999) 000-00-00" },
              { icon: "MapPin", label: "Город",   value: "Москва, Россия"     },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl p-6 flex flex-col items-center text-center gap-3"
                style={{ backgroundColor: "rgba(255,255,255,0.015)", border: "1px solid #181818" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid #1e1e1e" }}>
                  <Icon name={c.icon} size={17} style={{ color: "#555" }} />
                </div>
                <p className="text-xs uppercase tracking-widest font-golos" style={{ color: "#2a2a2a" }}>{c.label}</p>
                <p className="font-golos text-sm" style={{ color: "#666" }}>{c.value}</p>
              </div>
            ))}
          </div>

          <div className={`rounded-2xl p-8 transition-all duration-700 delay-400 ${contactInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ backgroundColor: "rgba(255,255,255,0.015)", border: "1px solid #181818" }}>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {[
                { label: "Ваше имя", placeholder: "Иван Иванов",       type: "text"  },
                { label: "Email",    placeholder: "ivan@example.com", type: "email" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs tracking-wide mb-2 font-golos" style={{ color: "#2a2a2a" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    className="w-full rounded-xl px-4 py-3 text-sm font-golos focus:outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.025)", border: "1px solid #1e1e1e", color: "#bbb" }} />
                </div>
              ))}
            </div>
            <div className="mb-5">
              <label className="block text-xs tracking-wide mb-2 font-golos" style={{ color: "#2a2a2a" }}>Сообщение</label>
              <textarea rows={4} placeholder="Расскажите о вашем проекте..."
                className="w-full rounded-xl px-4 py-3 text-sm font-golos focus:outline-none resize-none"
                style={{ backgroundColor: "rgba(255,255,255,0.025)", border: "1px solid #1e1e1e", color: "#bbb" }} />
            </div>
            <button className="w-full py-3.5 rounded-xl text-sm tracking-widest uppercase font-golos transition-all duration-300"
              style={{ backgroundColor: "#ebebeb", color: "#080808" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ebebeb"; }}>
              Отправить сообщение
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: "#040404", borderTop: "1px solid #111" }}>
        <p className="font-cormorant italic text-base mb-1" style={{ color: "#282828" }}>Iliya Beietreu</p>
        <p className="font-golos text-xs tracking-widest uppercase" style={{ color: "#1e1e1e" }}>
          @canout · © 2024
        </p>
      </footer>
    </div>
  );
}
