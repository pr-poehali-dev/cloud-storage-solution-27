import { BookOpen, Users, MapPin, Heart, Star, Calendar, Plus, Minus, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Icon from "@/components/ui/icon"

interface FAQ {
  question: string
  answer: string
}

const LOGO = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/f273d9ef-0f43-4093-bdd7-a82390da06fa.png"
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
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0f0f0f" }}>
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
          <div className="flex items-center gap-3 px-3 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(160,100,40,0.4)", backdropFilter: "blur(12px)" }}>
            <img src={LOGO} alt="Логотип фестиваля" className="w-12 h-12 object-contain" />
            <span className="font-semibold text-sm leading-tight max-w-[160px]" style={{ color: "#4a2800" }}>
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
                style={{ background: "rgba(30,30,30,0.75)", border: "1px solid rgba(200,160,60,0.4)", backdropFilter: "blur(12px)", color: "#f0dfa0" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Register Button */}
          <div className="flex items-center gap-3">
            <Button
              className="rounded-full px-6 font-semibold"
              style={{ background: "#c8a020", color: "#1a1a1a", border: "1px solid #e0c040" }}
            >
              Подать заявку
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          {/* Badge */}
          <div className="mb-6 px-5 py-2 rounded-full text-sm font-medium" style={{ background: "rgba(80,40,0,0.65)", border: "1px solid rgba(200,140,40,0.5)", backdropFilter: "blur(12px)", color: "#f5d5b0" }}>
            🌟 Всероссийский фестиваль фронтовой поэзии
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 text-balance" style={{ color: "#f5e8c0" }}>
            «А музы не молчат!»
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#d4a030" }}>
            Всероссийский фестиваль фронтовой поэзии
          </p>

          {/* Subheading */}
          <p className="text-lg md:text-xl max-w-3xl mb-10 leading-relaxed text-pretty" style={{ color: "rgba(245,213,176,0.85)" }}>
            Ежегодный Всероссийский фестиваль, объединяющий поэтов, ветеранов и всех, кому дорога память о защитниках Отечества. Стихи, которые рождаются из сердца — для тех, кто воевал, и тех, кто помнит.
          </p>

          {/* Date Block */}
          <div className="flex items-center gap-3 mb-6 px-6 py-4 rounded-2xl" style={{ background: "rgba(80,40,0,0.6)", border: "1px solid rgba(200,140,40,0.45)", backdropFilter: "blur(12px)" }}>
            <Icon name="Calendar" size={24} style={{ color: "#d4a030" }} />
            <div className="text-left">
              <div className="text-2xl font-bold" style={{ color: "#f5e8c0" }}>2–3 мая 2026</div>
              <div className="text-sm" style={{ color: "rgba(245,232,192,0.75)" }}>д. Борки, Великолукский район, Псковская область</div>
            </div>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full text-sm" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(200,140,40,0.4)", backdropFilter: "blur(12px)", color: "#f5e8c0" }}>
            <Icon name="MapPin" size={16} style={{ color: "#d4a030" }} />
            <span>Псковская область, Великолукский район, деревня Борки</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Button
              size="lg"
              className="rounded-full px-8 py-4 text-lg font-semibold"
              style={{ background: "#c8a020", color: "#1a1a1a", border: "1px solid #e0c040" }}
            >
              Подать заявку на участие
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 py-4 text-lg"
              style={{ background: "rgba(30,30,30,0.7)", border: "1px solid rgba(200,160,60,0.4)", backdropFilter: "blur(12px)", color: "#f0dfa0" }}
            >
              Узнать программу
            </Button>
          </div>

          {/* Footer Note */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: "rgba(30,30,30,0.65)", border: "1px solid rgba(200,160,60,0.35)", backdropFilter: "blur(12px)", color: "rgba(240,223,160,0.85)" }}>
            <Icon name="Heart" size={16} style={{ color: "#c8a020" }} />
            <span>Вход для зрителей — свободный</span>
          </div>
        </div>
      </div>

      {/* Features / About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Borki Photo */}
          <div className="rounded-3xl overflow-hidden mb-16 shadow-2xl">
            <img
              src="https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/c0f5b5d6-cafd-486b-ba60-ac0969cb3a8b.jpg"
              alt="Борки — Литературно-художественный музей им. И.А. Васильева"
              className="w-full object-cover"
              style={{ maxHeight: "520px" }}
            />
            <div className="px-8 py-4 text-center" style={{ background: "rgba(80,20,20,0.5)" }}>
              <p className="text-sm italic" style={{ color: "rgba(245,213,176,0.8)" }}>Литературно-художественный музей им. И.А. Васильева, д. Борки</p>
            </div>
          </div>

          {/* Festival Description */}
          <div className="rounded-3xl p-10 md:p-14 mb-16" style={{ background: "rgba(80,20,20,0.25)", border: "1px solid rgba(160,57,74,0.2)", backdropFilter: "blur(12px)" }}>
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(122,31,46,0.4)", border: "1px solid rgba(160,57,74,0.4)", color: "#f5d5b0" }}>
              О фестивале
            </div>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "rgba(245,213,176,0.85)" }}>
              <p>Здесь спокойствие и умиротворение. Здесь пение птиц и шум сосен. В этом тихом уголке с таким мирным названием Борки, до сих пор хранящем память о писателе, лауреате Ленинской и Государственной премии Иване Афанасьевиче Васильеве, ежегодно, традиционно в начале мая, накануне великого Дня Победы, у Борковского музея звучат фронтовые стихи и песни.</p>
              <p>Инициатором праздника фронтовой поэзии «А музы не молчат» был писатель, фронтовик, лауреат Ленинской и Государственной премий Иван Афанасьевич Васильев. Гости, среди которых поэты, писатели, музыканты, артисты, слушатели и даже художники съезжаются сюда ежегодно, чтобы вновь отдать долг памяти освободителям и посвятить им стихотворные строки, идущие из самой затаенной глубины души, откуда тянутся нити в те лихие военные годы. Потому что они потомки того поколения, для кого Великая Отечественная — часть судьбы, и трагедия, и скорбь.</p>
              <p>Почему в Борках? В первую очередь, здесь яркий, наглядный пример для подражания нашей молодежи в том, как много может сделать один человек, когда он живет ради других. Именно по инициативе писателя, Ивана Васильева создавался литературно-художественный музей, который носит теперь его имя, и именно он заложил традицию проведения праздников фронтовой поэзии. «В глубинке, в гармонии с природой находятся корни русской духовности и настоящей культуры», — считал наш земляк, писатель-публицист Иван Васильев.</p>
              <p>На праздники фронтовой поэзии и просто в гости к писателю часто приезжали известные политики, художники, музыканты, поэты, литераторы. Осталась эта традиция и поныне. Вновь собираются поэты и барды из Рязани, Москвы, Твери, Торопца, Санкт-Петербурга, Пскова и Великих Лук, многих других городов и даже стран. Звучат стихи и песни во славу героев Великой Отечественной войны и тех, кто сражался в Афганистане и Чечне.</p>
              <p>По сложившейся традиции, вначале все собравшиеся проходят к памятнику «Скорбящей», где священнослужители храма Вознесения Христова г. Великие Луки служат литию о погибших. Минутой молчания и возложением цветов к подножию памятника все присутствующие отдают дань памяти павшим.</p>
              <p>Долгие годы бессменным ведущим праздника оставался известный писатель, литературный критик, член Президентского Совета по культуре и Союза писателей России, академик Академии Российской словесности, лауреат Патриаршей премии Валентин Яковлевич Курбатов, который и представлял слово авторам и почитателям фронтовой поэзии, прибывшим в Борки из разных уголков России.</p>
              <p>Тема войны, тема памяти присутствует во всех произведениях, прочитанных на празднике. И эта память — самое главное, что объединяет всех участников праздника фронтовой поэзии: немногочисленных ветеранов, детей военных лет и послевоенных десятилетий, и совсем юных, которым предстоит хранить всё рассказанное и почерпнутое на встречах поколений, проходящих в замечательном уголке с таким очень русским и очень задушевным названием — Борки.</p>
            </div>
          </div>

          {/* Vasiliev Portrait + Bio */}
          <div className="rounded-3xl overflow-hidden mb-16" style={{ background: "rgba(80,20,20,0.25)", border: "1px solid rgba(160,57,74,0.2)", backdropFilter: "blur(12px)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1">
                <img
                  src="https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/538446ce-1025-4e84-a3ae-43ada40390df.jpg"
                  alt="И.А. Васильев"
                  className="w-full h-full object-cover object-top"
                  style={{ minHeight: "400px", maxHeight: "600px" }}
                />
              </div>
              <div className="md:col-span-2 p-10 md:p-12 flex flex-col justify-center space-y-5" style={{ color: "rgba(245,213,176,0.85)" }}>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-medium self-start mb-2" style={{ background: "rgba(122,31,46,0.4)", border: "1px solid rgba(160,57,74,0.4)", color: "#f5d5b0" }}>
                  Иван Афанасьевич Васильев
                </div>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#f5d5b0" }}>Писатель, фронтовик, лауреат Ленинской и Государственной премий</h3>
                <p className="text-base leading-relaxed">Сам Иван Афанасьевич в период войны воевал на передовой, на Калининском фронте, был тяжело контужен, а с 1944 года после госпиталя продолжил службу в Закавказском военном округе до июля 1946 года.</p>
                <p className="text-base leading-relaxed">В Борковский период жизни с 1981 по 1994 год Иван Афанасьевич написал и издал двадцать четыре книги, сотни очерков, повести, лирические рассказы о природе. За книги «Я люблю эту землю» и «Беру на себя» он удостоен звания лауреата Государственной премии имени М. Горького.</p>
                <p className="text-base leading-relaxed">5 июня 1991 года по инициативе писателя Васильева в деревне Борки был открыт Дом экологического просвещения. Всю жизнь Васильев боролся за победу добра в душах людей. Его произведения — это целая эпоха.</p>
              </div>
            </div>
            {/* Second Vasiliev photo */}
            <div className="border-t" style={{ borderColor: "rgba(160,57,74,0.2)" }}>
              <img
                src="https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/13206ea1-d69c-4a84-8468-a9b6c3630ccd.jpg"
                alt="И.А. Васильев в музее"
                className="w-full object-cover"
                style={{ maxHeight: "420px", objectPosition: "top" }}
              />
              <div className="px-8 py-4 text-center" style={{ background: "rgba(80,20,20,0.5)" }}>
                <p className="text-sm italic" style={{ color: "rgba(245,213,176,0.8)" }}>И.А. Васильев в литературно-художественном музее, д. Борки</p>
              </div>
            </div>
          </div>

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
              <div key={item.label} className="rounded-2xl p-6 text-center" style={{ background: "rgba(20,20,20,0.5)", border: "1px solid rgba(200,160,60,0.2)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl font-bold mb-1" style={{ color: "#c8a020" }}>{item.value}</div>
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
                      ? { background: "#c8a020", color: "#1a1a1a", border: "1px solid #e0c040" }
                      : { background: "rgba(30,30,30,0.5)", color: "rgba(240,223,160,0.65)", border: "1px solid rgba(200,160,60,0.25)" }
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
                  <div className="text-3xl font-bold mb-1" style={{ color: "rgba(200,160,32,0.55)" }}>{phase.num}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#c8a020" }}>{phase.day}</div>
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
                style={{ background: "#c8a020", color: "#1a1a1a", border: "1px solid #e0c040" }}
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
                    style={{ background: "#c8a020", color: "#1a1a1a" }}
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
                      icon: "User",
                      label: "Президент фестиваля",
                      value: "Светлана Размыслович",
                    },
                    {
                      icon: "Mail",
                      label: "Email фестиваля",
                      value: "swetslova.ru@yandex.ru",
                    },
                    {
                      icon: "Phone",
                      label: "Телефон",
                      value: "+7-911-887-98-11",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(80,20,20,0.4)", border: "1px solid rgba(160,57,74,0.25)" }}>
                      <Icon name={item.icon} size={20} style={{ color: "#c8a020", marginTop: 2, flexShrink: 0 }} />
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
                  <Button size="sm" className="rounded-lg px-4" style={{ background: "#c8a020", color: "#1a1a1a" }}>
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