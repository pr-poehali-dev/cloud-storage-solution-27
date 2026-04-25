import { BookOpen, Users, MapPin, Heart, Star, Calendar, Plus, Minus, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Icon from "@/components/ui/icon"

interface FAQ {
  question: string
  answer: string
}

const LOGO = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/files/b4a4eef4-569b-40ca-8e8d-eebd60ca8d2d.jpg"
const HERO_BG = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/files/e5cb20ac-65ec-46c5-aa03-766700c05fd9.jpg"
const FESTIVAL_PHOTO_1 = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/files/4ba01c9d-0626-47c2-a91c-10bcb9cc6878.jpg"
const FESTIVAL_PHOTO_2 = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/files/e5cb20ac-65ec-46c5-aa03-766700c05fd9.jpg"

const galleryYears = [
  { year: "2022", photo: FESTIVAL_PHOTO_1, caption: "II Всероссийский фестиваль, 450 участников" },
  { year: "2023", photo: FESTIVAL_PHOTO_2, caption: "III фестиваль — поэты со всей России" },
  { year: "2024", photo: FESTIVAL_PHOTO_1, caption: "IV фестиваль — звёзды фронтовой поэзии" },
  { year: "2025", photo: FESTIVAL_PHOTO_2, caption: "V юбилейный фестиваль" },
]

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeYear, setActiveYear] = useState("2024")

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs: FAQ[] = [
    {
      question: "Как принять участие в фестивале?",
      answer:
        "Для участия в конкурсной программе необходимо подать заявку с подборкой стихотворений (не менее 3 произведений) на тему фронтовой лирики. Заявки принимаются по электронной почте до 1 апреля 2026 года. Для гостей фестиваля вход свободный — приезжайте 2-3 мая в д. Борки Великолукского района.",
    },
    {
      question: "Кто может стать участником конкурса?",
      answer:
        "К участию приглашаются поэты всех возрастов и регионов России. Фестиваль принимает авторов-любителей и профессиональных поэтов. Отдельные номинации предусмотрены для молодёжи до 18 лет и для ветеранов. Произведения должны быть посвящены военной теме, памяти защитников Отечества.",
    },
    {
      question: "Как добраться до д. Борки?",
      answer:
        "Деревня Борки расположена в Великолукском районе Псковской области. От Великих Лук организуется автобусный трансфер для участников фестиваля. На личном автомобиле: по трассе А-117, далее указатели на Великолукский район. Для иногородних участников организуется содействие в размещении — уточняйте при подаче заявки.",
    },
    {
      question: "Предусмотрены ли призы и награды?",
      answer:
        "Победители и лауреаты фестиваля получают дипломы, памятные призы и подарки от организаторов. Лучшие произведения публикуются в ежегодном сборнике фестивальной поэзии. Специальные призы учреждаются партнёрами и спонсорами фестиваля.",
    },
    {
      question: "Что включает программа двух дней?",
      answer:
        "2 мая: торжественное открытие, конкурсные чтения, мастер-классы от известных поэтов. 3 мая: продолжение конкурса, литературные встречи, экскурсии по памятным местам района, торжественное закрытие с награждением победителей, гала-концерт.",
    },
  ]

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#1a0a0a" }}>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,10,10,0.55) 0%, rgba(26,10,10,0.85) 100%)" }} />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-full" style={{ background: "rgba(80,20,20,0.55)", border: "1px solid rgba(180,80,60,0.35)", backdropFilter: "blur(12px)" }}>
            <img src={LOGO} alt="Логотип фестиваля" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-semibold text-sm leading-tight max-w-[160px]" style={{ color: "#f5d5b0" }}>
              «А музы не молчат!»
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "О фестивале", href: "#about" },
              { label: "История", href: "#history" },
              { label: "Программа", href: "#program" },
              { label: "Вопросы", href: "#faq" },
              { label: "Контакты", href: "#contacts" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm hover:opacity-80 transition-opacity"
                style={{ background: "rgba(80,20,20,0.5)", border: "1px solid rgba(180,80,60,0.3)", backdropFilter: "blur(12px)", color: "#f5d5b0" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Register Button */}
          <div className="flex items-center gap-3">
            <Button
              className="rounded-full px-6 font-semibold"
              style={{ background: "#7a1f2e", color: "#f5d5b0", border: "1px solid #a0394a" }}
            >
              Подать заявку
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          {/* Badge */}
          <div className="mb-6 px-5 py-2 rounded-full text-sm font-medium" style={{ background: "rgba(80,20,20,0.6)", border: "1px solid rgba(180,80,60,0.4)", backdropFilter: "blur(12px)", color: "#f5d5b0" }}>
            Всероссийский фестиваль • д. Борки, Псковская область
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 text-balance" style={{ color: "#f5d5b0" }}>
            «А музы не молчат!»
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#c0504a" }}>
            Фестиваль фронтовой поэзии
          </p>

          {/* Subheading */}
          <p className="text-lg md:text-xl max-w-3xl mb-10 leading-relaxed text-pretty" style={{ color: "rgba(245,213,176,0.85)" }}>
            Ежегодный Всероссийский фестиваль, объединяющий поэтов, ветеранов и всех, кому дорога память о защитниках Отечества. Стихи, которые рождаются из сердца — для тех, кто воевал, и тех, кто помнит.
          </p>

          {/* Date Block */}
          <div className="flex items-center gap-3 mb-10 px-6 py-4 rounded-2xl" style={{ background: "rgba(80,20,20,0.6)", border: "1px solid rgba(180,80,60,0.4)", backdropFilter: "blur(12px)" }}>
            <Icon name="Calendar" size={24} style={{ color: "#c0504a" }} />
            <div className="text-left">
              <div className="text-2xl font-bold" style={{ color: "#f5d5b0" }}>2–3 мая 2026</div>
              <div className="text-sm" style={{ color: "rgba(245,213,176,0.7)" }}>д. Борки, Великолукский район, Псковская область</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Button
              size="lg"
              className="rounded-full px-8 py-4 text-lg font-semibold"
              style={{ background: "#7a1f2e", color: "#f5d5b0", border: "1px solid #a0394a" }}
            >
              Подать заявку на участие
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 py-4 text-lg"
              style={{ background: "rgba(80,20,20,0.5)", border: "1px solid rgba(180,80,60,0.35)", backdropFilter: "blur(12px)", color: "#f5d5b0" }}
            >
              Узнать программу
            </Button>
          </div>

          {/* Footer Note */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: "rgba(80,20,20,0.5)", border: "1px solid rgba(180,80,60,0.3)", backdropFilter: "blur(12px)", color: "rgba(245,213,176,0.8)" }}>
            <Icon name="Heart" size={16} style={{ color: "#c0504a" }} />
            <span>Вход для зрителей — свободный</span>
          </div>
        </div>
      </div>

      {/* Features / About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Organizers Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(122,31,46,0.4)", border: "1px solid rgba(160,57,74,0.4)", color: "#f5d5b0" }}>
              О фестивале
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#f5d5b0" }}>Организаторы фестиваля</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,213,176,0.75)" }}>
              Фестиваль проводится при поддержке культурных организаций Псковской области
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Organizer 1 */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(80,20,20,0.35)", border: "1px solid rgba(160,57,74,0.25)", backdropFilter: "blur(12px)" }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6" style={{ background: "rgba(122,31,46,0.5)", border: "1px solid rgba(160,57,74,0.4)" }}>
                <Icon name="Star" size={24} style={{ color: "#f5d5b0" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#f5d5b0" }}>АНО «Центр творчества и досуга «РАДУГА»</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,213,176,0.7)" }}>
                Главный организатор фестиваля, координирующий всю программу мероприятий
              </p>
            </div>

            {/* Organizer 2 */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(80,20,20,0.35)", border: "1px solid rgba(160,57,74,0.25)", backdropFilter: "blur(12px)" }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6" style={{ background: "rgba(122,31,46,0.5)", border: "1px solid rgba(160,57,74,0.4)" }}>
                <Icon name="BookOpen" size={24} style={{ color: "#f5d5b0" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#f5d5b0" }}>Литературно-художественный музей им. И.А. Васильева</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,213,176,0.7)" }}>
                Хранитель литературного наследия региона, партнёр по культурной программе
              </p>
            </div>

            {/* Organizer 3 */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(80,20,20,0.35)", border: "1px solid rgba(160,57,74,0.25)", backdropFilter: "blur(12px)" }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6" style={{ background: "rgba(122,31,46,0.5)", border: "1px solid rgba(160,57,74,0.4)" }}>
                <Icon name="MapPin" size={24} style={{ color: "#f5d5b0" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#f5d5b0" }}>Культурно-информационный центр Великолукского района</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,213,176,0.7)" }}>
                Информационная и площадочная поддержка фестиваля на территории района
              </p>
            </div>
          </div>

          {/* Features row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "Users", label: "Участники со всей России", value: "500+" },
              { icon: "BookOpen", label: "Лет истории фестиваля", value: "5+" },
              { icon: "Star", label: "Номинации конкурса", value: "8" },
              { icon: "Heart", label: "Вход для зрителей", value: "Бесплатно" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-6 text-center" style={{ background: "rgba(80,20,20,0.3)", border: "1px solid rgba(160,57,74,0.2)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl font-bold mb-1" style={{ color: "#c0504a" }}>{item.value}</div>
                <div className="text-xs leading-snug" style={{ color: "rgba(245,213,176,0.7)" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History / Gallery Section */}
      <section id="history" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-12" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(160,57,74,0.2)", backdropFilter: "blur(16px)" }}>
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(122,31,46,0.4)", border: "1px solid rgba(160,57,74,0.4)", color: "#f5d5b0" }}>
                История
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#f5d5b0" }}>Фестиваль по годам</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,213,176,0.75)" }}>
                Каждый год собирает новых поэтов, новые голоса и новые страницы в историю фронтовой лирики
              </p>
            </div>

            {/* Year Tabs */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
              {galleryYears.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setActiveYear(item.year)}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-all"
                  style={
                    activeYear === item.year
                      ? { background: "#7a1f2e", color: "#f5d5b0", border: "1px solid #a0394a" }
                      : { background: "rgba(80,20,20,0.4)", color: "rgba(245,213,176,0.65)", border: "1px solid rgba(160,57,74,0.25)" }
                  }
                >
                  {item.year}
                </button>
              ))}
            </div>

            {/* Gallery Image */}
            {galleryYears.filter((g) => g.year === activeYear).map((g) => (
              <div key={g.year} className="rounded-2xl overflow-hidden">
                <img
                  src={g.photo}
                  alt={`Фестиваль ${g.year}`}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 text-center" style={{ background: "rgba(80,20,20,0.4)" }}>
                  <p className="text-lg font-medium" style={{ color: "#f5d5b0" }}>{g.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-12" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(160,57,74,0.2)", backdropFilter: "blur(16px)" }}>
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(122,31,46,0.4)", border: "1px solid rgba(160,57,74,0.4)", color: "#f5d5b0" }}>
                Программа
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#f5d5b0" }}>Два дня поэзии и памяти</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,213,176,0.75)" }}>
                2–3 мая 2026 года, деревня Борки
              </p>
            </div>

            {/* Program Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                {
                  num: "01.",
                  day: "2 мая",
                  title: "Открытие фестиваля",
                  desc: "Торжественная церемония открытия, приветственные слова организаторов и почётных гостей, возложение цветов к мемориалу.",
                },
                {
                  num: "02.",
                  day: "2 мая",
                  title: "Конкурсные чтения",
                  desc: "Участники представляют свои произведения жюри. Мастер-классы от известных поэтов и писателей, литературные дискуссии.",
                },
                {
                  num: "03.",
                  day: "3 мая",
                  title: "Литературные встречи",
                  desc: "Экскурсии по памятным местам района, встречи с ветеранами, презентация сборника лучших произведений прошлых лет.",
                },
                {
                  num: "04.",
                  day: "3 мая",
                  title: "Закрытие и награждение",
                  desc: "Торжественное закрытие, объявление победителей и лауреатов, вручение дипломов и призов, гала-концерт.",
                },
              ].map((phase) => (
                <div key={phase.num} className="rounded-2xl p-8 flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(160,57,74,0.18)", backdropFilter: "blur(12px)" }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: "rgba(192,80,74,0.6)" }}>{phase.num}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#c0504a" }}>{phase.day}</div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#f5d5b0" }}>{phase.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(245,213,176,0.72)" }}>{phase.desc}</p>
                </div>
              ))}
            </div>

            {/* Registration Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="rounded-full px-12 py-4 text-lg font-semibold"
                style={{ background: "#7a1f2e", color: "#f5d5b0", border: "1px solid #a0394a" }}
              >
                Подать заявку на участие
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-12" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(160,57,74,0.2)", backdropFilter: "blur(16px)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column */}
              <div>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(122,31,46,0.4)", border: "1px solid rgba(160,57,74,0.4)", color: "#f5d5b0" }}>
                  Вопросы и ответы
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#f5d5b0" }}>
                  Частые вопросы
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "rgba(245,213,176,0.75)" }}>
                  Всё, что нужно знать об участии в фестивале: от подачи заявки до дороги в д. Борки.
                </p>
              </div>

              {/* Right Column - FAQ Accordion */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "rgba(80,20,20,0.35)", border: "1px solid rgba(160,57,74,0.25)" }}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors hover:opacity-90"
                    >
                      <h3 className="text-base font-semibold pr-4" style={{ color: "#f5d5b0" }}>{faq.question}</h3>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 flex-shrink-0" style={{ color: "#c0504a" }} />
                      ) : (
                        <Plus className="w-5 h-5 flex-shrink-0" style={{ color: "#c0504a" }} />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(245,213,176,0.8)" }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-12" style={{ background: "rgba(80,20,20,0.3)", border: "1px solid rgba(160,57,74,0.25)", backdropFilter: "blur(16px)" }}>
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(122,31,46,0.4)", border: "1px solid rgba(160,57,74,0.4)", color: "#f5d5b0" }}>
                Контакты
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#f5d5b0" }}>Свяжитесь с нами</h2>
              <p className="text-lg" style={{ color: "rgba(245,213,176,0.75)" }}>
                Подайте заявку или задайте вопрос — мы ответим в течение одного рабочего дня
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="rounded-2xl p-8 shadow-2xl" style={{ background: "rgba(255,248,240,0.97)" }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: "#4a1020" }}>Подать заявку на участие</h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#4a1020" }}>Имя и фамилия</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border text-gray-800 focus:outline-none focus:ring-2"
                      style={{ borderColor: "#c0504a", focusRingColor: "#7a1f2e" }}
                      placeholder="Ваше полное имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#4a1020" }}>Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border text-gray-800 focus:outline-none focus:ring-2"
                      style={{ borderColor: "#c0504a" }}
                      placeholder="your@email.ru"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#4a1020" }}>Город / регион</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border text-gray-800 focus:outline-none"
                      style={{ borderColor: "#c0504a" }}
                      placeholder="Откуда вы?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#4a1020" }}>Ваши стихотворения / вопрос</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border text-gray-800 focus:outline-none resize-none"
                      style={{ borderColor: "#c0504a" }}
                      placeholder="Прикрепите текст или задайте вопрос..."
                    />
                  </div>
                  <Button
                    className="w-full rounded-lg py-3 text-base font-semibold"
                    style={{ background: "#7a1f2e", color: "#f5d5b0" }}
                  >
                    Отправить заявку
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: "rgba(245,213,176,0.85)" }}>
                  Фестиваль «А музы не молчат!» объединяет поэтов и любителей поэзии со всей России. Приезжайте — вход для зрителей свободный!
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: "MapPin",
                      label: "Место проведения",
                      value: "д. Борки, Великолукский район, Псковская область",
                    },
                    {
                      icon: "Calendar",
                      label: "Дата",
                      value: "2–3 мая 2026 года",
                    },
                    {
                      icon: "Mail",
                      label: "Email для заявок",
                      value: "festival@raduga-vluki.ru",
                    },
                    {
                      icon: "Phone",
                      label: "Телефон",
                      value: "+7 (8112) XX-XX-XX",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(80,20,20,0.4)", border: "1px solid rgba(160,57,74,0.25)" }}>
                      <Icon name={item.icon} size={20} style={{ color: "#c0504a", marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(245,213,176,0.55)" }}>{item.label}</div>
                        <div className="text-sm font-medium" style={{ color: "#f5d5b0" }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-12" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(160,57,74,0.15)", backdropFilter: "blur(16px)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img src={LOGO} alt="Логотип" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-base" style={{ color: "#f5d5b0" }}>«А музы не молчат!»</div>
                    <div className="text-xs" style={{ color: "rgba(245,213,176,0.55)" }}>Всероссийский фестиваль фронтовой поэзии</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(245,213,176,0.65)" }}>
                  Ежегодный фестиваль в деревне Борки Великолукского района Псковской области. Место встречи поэтов, ветеранов и всех, кому дорога память о защитниках Родины.
                </p>
                {/* Newsletter */}
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="flex-1 px-3 py-2 rounded-lg text-sm text-gray-800"
                    style={{ background: "rgba(255,248,240,0.92)" }}
                  />
                  <Button size="sm" className="rounded-lg px-4" style={{ background: "#7a1f2e", color: "#f5d5b0" }}>
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs mt-2" style={{ color: "rgba(245,213,176,0.4)" }}>Подпишитесь на новости фестиваля</p>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: "#f5d5b0" }}>Разделы</h4>
                <ul className="space-y-2">
                  {["О фестивале", "История", "Программа", "Вопросы", "Контакты"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "rgba(245,213,176,0.65)" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organizers */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: "#f5d5b0" }}>Организаторы</h4>
                <ul className="space-y-3">
                  {[
                    "АНО «ЦТиД «РАДУГА»",
                    "Музей им. И.А. Васильева",
                    "КИЦ Великолукского района",
                  ].map((org) => (
                    <li key={org} className="text-xs leading-snug" style={{ color: "rgba(245,213,176,0.65)" }}>
                      {org}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Divider & Copyright */}
            <div className="pt-8" style={{ borderTop: "1px solid rgba(160,57,74,0.2)" }}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm" style={{ color: "rgba(245,213,176,0.45)" }}>
                  © 2026 Фестиваль «А музы не молчат!» · Псковская область
                </p>
                <p className="text-xs" style={{ color: "rgba(245,213,176,0.35)" }}>
                  д. Борки, Великолукский район · 2–3 мая 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
