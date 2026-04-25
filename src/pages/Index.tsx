import { BookOpen, Users, MapPin, Heart, Star, Calendar, Plus, Minus, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback } from "react"
import Icon from "@/components/ui/icon"

const LIST_PHOTOS_URL = "https://functions.poehali.dev/23053f98-85ac-4dbb-81fb-073764742665"

const ALBUM_YEARS = ["2025","2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008"]
const ALBUMS = [
  ...ALBUM_YEARS.map(y => ({ id: y, label: y, prefix: `${y}/` })),
  { id: "letopis", label: "Летопись", prefix: "Летопись/" },
]

interface Photo { key: string; url: string }
interface AlbumData { photos: Photo[]; loaded: boolean; loading: boolean }

interface FAQ {
  question: string
  answer: string
}

const LOGO = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/f273d9ef-0f43-4093-bdd7-a82390da06fa.png"
const HERO_BG = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/files/e5cb20ac-65ec-46c5-aa03-766700c05fd9.jpg"
const FESTIVAL_PHOTO_1 = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/files/4ba01c9d-0626-47c2-a91c-10bcb9cc6878.jpg"
const FESTIVAL_PHOTO_2 = "https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/files/e5cb20ac-65ec-46c5-aa03-766700c05fd9.jpg"

const historyEvents = [
  {
    year: "~1985",
    title: "Рождение традиции",
    desc: "Иван Афанасьевич Васильев заложил традицию проведения праздников фронтовой поэзии в д. Борки. Первые встречи поэтов у Борковского музея — ещё неформальные, по инициативе самого писателя.",
    icon: "Feather",
  },
  {
    year: "1991",
    title: "Дом экологического просвещения",
    desc: "5 июня 1991 года по инициативе И.А. Васильева в деревне Борки открыт Дом экологического просвещения при участии Великолукской ГСХА.",
    icon: "Home",
  },
  {
    year: "1994",
    title: "Памяти основателя",
    desc: "Год ухода Ивана Афанасьевича. Традиция праздника фронтовой поэзии продолжается — теперь как дань памяти писателю и всем защитникам Отечества.",
    icon: "Heart",
  },
  {
    year: "1996",
    title: "Увековечение памяти",
    desc: "21 июля 1996 года на здании музея установлена памятная доска И.А. Васильеву. На доме по проспекту Гагарина, 17 в Великих Луках открыта мемориальная доска.",
    icon: "Star",
  },
  {
    year: "2004",
    title: "90 лет со дня рождения",
    desc: "Районная библиотека получает имя И.А. Васильева. В администрации Великолукского района состоялся торжественный вечер памяти писателя.",
    icon: "BookOpen",
  },
  {
    year: "2015",
    title: "Губернатор на фестивале",
    desc: "Губернатор Андрей Турчак лично участвовал в фестивале и передал слова приветствия от ветеранов Риги. Ведущим по-прежнему остаётся Валентин Яковлевич Курбатов.",
    icon: "Users",
  },
  {
    year: "2022–2024",
    title: "Всероссийский формат",
    desc: "Фестиваль обретает статус Всероссийского. Приезжают поэты из Рязани, Москвы, Твери, Санкт-Петербурга, Пскова, Великих Лук, Беларуси. Тематика расширяется — добавляются стихи о СВО.",
    icon: "MapPin",
  },
  {
    year: "2026",
    title: "Новая страница",
    desc: "2–3 мая 2026 года — очередной фестиваль «А музы не молчат!». У Борковского музея вновь зазвучат фронтовые стихи и песни во славу защитников Отечества.",
    icon: "Calendar",
    highlight: true,
  },
]

const galleryYears = [
  { year: "2022", photo: FESTIVAL_PHOTO_1, caption: "II Всероссийский фестиваль, 450 участников" },
  { year: "2023", photo: FESTIVAL_PHOTO_2, caption: "III фестиваль — поэты со всей России" },
  { year: "2024", photo: FESTIVAL_PHOTO_1, caption: "IV фестиваль — звёзды фронтовой поэзии" },
  { year: "2025", photo: FESTIVAL_PHOTO_2, caption: "V юбилейный фестиваль" },
]

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeYear, setActiveYear] = useState("2024")
  const [contestTab, setContestTab] = useState<"position"|"rules">("position")
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null)
  const [albumCache, setAlbumCache] = useState<Record<string, AlbumData>>({})
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null)

  const loadAlbum = useCallback(async (albumId: string) => {
    const album = ALBUMS.find(a => a.id === albumId)
    if (!album) return
    if (albumCache[albumId]?.loaded || albumCache[albumId]?.loading) return
    setAlbumCache(prev => ({ ...prev, [albumId]: { photos: [], loaded: false, loading: true } }))
    try {
      const res = await fetch(`${LIST_PHOTOS_URL}?prefix=${encodeURIComponent(album.prefix)}`)
      const data = await res.json()
      setAlbumCache(prev => ({ ...prev, [albumId]: { photos: data.photos || [], loaded: true, loading: false } }))
    } catch {
      setAlbumCache(prev => ({ ...prev, [albumId]: { photos: [], loaded: true, loading: false } }))
    }
  }, [albumCache])

  useEffect(() => {
    if (activeAlbum) loadAlbum(activeAlbum)
  }, [activeAlbum])

  const openAlbum = (id: string) => {
    setActiveAlbum(prev => prev === id ? null : id)
  }

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
    <div className="min-h-screen" style={{ backgroundColor: "#f5ead6", color: "#2a1000" }}>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/c0f5b5d6-cafd-486b-ba60-ac0969cb3a8b.jpg)` }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,10,10,0.45) 0%, rgba(26,10,10,0.75) 70%, rgba(26,10,10,0.95) 100%)" }} />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6">
          {/* Logo */}
          <img src={LOGO} alt="Логотип фестиваля" className="w-20 h-20 object-contain drop-shadow-lg" />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "О фестивале", href: "#about" },
              { label: "История", href: "#history" },
              { label: "Программа", href: "#program" },
              { label: "Конкурс", href: "#contest" },
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
          {/* Contest Badge */}
          <a href="#contest" className="group mb-6 flex items-center gap-3 px-6 py-3 rounded-2xl w-full max-w-xl transition-opacity hover:opacity-90" style={{ background: "rgba(60,35,10,0.7)", border: "1px solid rgba(200,160,40,0.55)", backdropFilter: "blur(12px)" }}>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(200,160,32,0.25)", border: "1px solid rgba(200,160,32,0.4)" }}>
              <Icon name="Award" size={16} style={{ color: "#c8a020" }} />
            </div>
            <div className="text-left flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#c8a020" }}>Конкурс чтецов среди детей и юношества</div>
              <div className="text-sm font-semibold leading-snug" style={{ color: "#f5e8c0" }}>«Победное Слово над Ловатью»</div>
            </div>
            <Icon name="ChevronRight" size={16} style={{ color: "rgba(200,160,40,0.7)" }} />
          </a>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 text-balance" style={{ color: "#f5e8c0" }}>
            «А музы не молчат!»
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#d4a030" }}>
            Всероссийский фестиваль фронтовой поэзии
          </p>

          {/* Subheading */}
          <p className="text-lg md:text-xl max-w-3xl mb-10 leading-relaxed text-pretty" style={{ color: "rgba(245,213,176,0.85)" }}>
            Ежегодный Всероссийский фестиваль, посвящённый творчеству поэтов-фронтовиков – от Великой Отечественной войны до СВО.
          </p>

          {/* Date Block */}
          <div className="flex items-center gap-3 mb-6 px-6 py-4 rounded-2xl" style={{ background: "rgba(80,40,0,0.6)", border: "1px solid rgba(200,140,40,0.45)", backdropFilter: "blur(12px)" }}>
            <Icon name="Calendar" size={24} style={{ color: "#d4a030" }} />
            <div className="text-left">
              <div className="text-2xl font-bold" style={{ color: "#f5e8c0" }}>2–3 мая 2026</div>
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


        </div>

        {/* Photo Caption */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <p className="text-xs italic px-3 py-1 rounded-full" style={{ color: "rgba(245,213,176,0.55)", background: "rgba(0,0,0,0.3)" }}>
            Литературно-художественный музей им. И.А. Васильева, д. Борки
          </p>
        </div>
      </div>

      {/* Features / About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Festival Description */}
          <div className="rounded-3xl p-10 md:p-14 mb-16" style={{ background: "rgba(180,130,60,0.12)", border: "1px solid rgba(140,90,30,0.2)", backdropFilter: "blur(12px)" }}>
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
              О фестивале
            </div>
            {/* Photo before text */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src="https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/5df20fa7-b5fa-4db8-9f94-9552456b34a0.jpg"
                alt="Фестиваль в Борках"
                className="w-full object-cover"
                style={{ maxHeight: "480px", objectPosition: "center" }}
              />
            </div>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "#3a1f00" }}>
              <p>Здесь спокойствие и умиротворение. Здесь пение птиц и шум сосен. В этом тихом уголке с таким мирным названием Борки, до сих пор хранящем память о писателе, лауреате Ленинской и Государственной премии Иване Афанасьевиче Васильеве, ежегодно, традиционно в начале мая, накануне великого Дня Победы, у Борковского музея звучат фронтовые стихи и песни.</p>
              <p>Инициатором праздника фронтовой поэзии «А музы не молчат» был писатель, фронтовик, лауреат Ленинской и Государственной премий Иван Афанасьевич Васильев. Гости, среди которых поэты, писатели, музыканты, артисты, слушатели и даже художники съезжаются сюда ежегодно, чтобы вновь отдать долг памяти освободителям и посвятить им стихотворные строки, идущие из самой затаенной глубины души, откуда тянутся нити в те лихие военные годы. Потому что они потомки того поколения, для кого Великая Отечественная — часть судьбы, и трагедия, и скорбь.</p>
              <p>Почему в Борках? В первую очередь, здесь яркий, наглядный пример для подражания нашей молодежи в том, как много может сделать один человек, когда он живет ради других. Именно по инициативе писателя, Ивана Васильева создавался литературно-художественный музей, который носит теперь его имя, и именно он заложил традицию проведения праздников фронтовой поэзии. «В глубинке, в гармонии с природой находятся корни русской духовности и настоящей культуры», — считал наш земляк, писатель-публицист Иван Васильев.</p>
              <p>На праздники фронтовой поэзии и просто в гости к писателю часто приезжали известные политики, художники, музыканты, поэты, литераторы. Осталась эта традиция и поныне. Вновь собираются поэты и барды из Рязани, Москвы, Твери, Торопца, Санкт-Петербурга, Пскова и Великих Лук, многих других городов и даже стран. Звучат стихи и песни во славу героев Великой Отечественной войны и тех, кто сражался в Афганистане и Чечне.</p>
              <p>По сложившейся традиции, вначале все собравшиеся проходят к памятнику «Скорбящей», где священнослужители храма Вознесения Христова г. Великие Луки служат литию о погибших. Минутой молчания и возложением цветов к подножию памятника все присутствующие отдают дань памяти павшим.</p>
              <p>Долгие годы бессменным ведущим праздника оставался известный писатель, литературный критик, член Президентского Совета по культуре и Союза писателей России, академик Академии Российской словесности, лауреат Патриаршей премии Валентин Яковлевич Курбатов, который и представлял слово авторам и почитателям фронтовой поэзии, прибывшим в Борки из разных уголков России.</p>
              <p>Тема войны, тема памяти присутствует во всех произведениях, прочитанных на празднике. И эта память — самое главное, что объединяет всех участников праздника фронтовой поэзии: немногочисленных ветеранов, детей военных лет и послевоенных десятилетий, и совсем юных, которым предстоит хранить всё рассказанное и почерпнутое на встречах поколений, проходящих в замечательном уголке с таким очень русским и очень задушевным названием — Борки.</p>
              <p>С 2025 года праздник перерос в полномасштабный Фестиваль, который теперь проводится в течение 2-х дней в г. Великие Луки и завершается праздником фронтовой поэзии в д. Борки.</p>
              <p>Наш народ помнит и любит фронтовую поэзию, поёт фронтовые песни, свято чтит память о поэтах и композиторах, не только выразивших в своих строках своё военное поколение, но и вставших в ряды защитников страны в её страшную годину!</p>
              <p>Главное для солдата в бою — боевой дух! А это — настоящая поэзия и душевная песня, понимание того, что его ждут дома, и то, что земля, которую он защищает, поддерживает его всеми силами! Мы приглашаем к участию в Фестивале поэтов и музыкантов с тех земель, за которые наши солдаты героически сражаются и сейчас, где не понаслышке знают, что такое война с её лишениями и тяготами, как близка смерть, и как ценна жизнь!</p>
              <p>Особенно ценно, что Фестиваль «А музы не молчат!» перекидывает мост памяти к следующим поколениям, проводя конкурс юных чтецов, декламирующих стихи фронтовых поэтов Великой Отечественной войны и СВО. Тем самым Фестиваль способствует рождению нового поколения фронтовой поэзии и песни, знакомит с творчеством нынешних поэтов-воинов, выявляет лучшие произведения патриотической тематики, а это значит — традиции фронтовой поэзии продолжают жить!</p>
            </div>
          </div>

          {/* Vasiliev Portrait + Bio */}
          <div className="rounded-3xl overflow-hidden mb-16" style={{ background: "rgba(180,130,60,0.12)", border: "1px solid rgba(140,90,30,0.2)", backdropFilter: "blur(12px)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1">
                <img
                  src="https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/538446ce-1025-4e84-a3ae-43ada40390df.jpg"
                  alt="И.А. Васильев"
                  className="w-full h-full object-cover object-top"
                  style={{ minHeight: "400px", maxHeight: "600px" }}
                />
              </div>
              <div className="md:col-span-2 p-10 md:p-12 flex flex-col justify-center space-y-5" style={{ color: "#3a1f00" }}>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-medium self-start mb-2" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
                  Иван Афанасьевич Васильев
                </div>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#2a1000" }}>Писатель, фронтовик, лауреат Ленинской и Государственной премий</h3>
                <p className="text-base leading-relaxed">Сам Иван Афанасьевич в период войны воевал на передовой, на Калининском фронте, был тяжело контужен, а с 1944 года после госпиталя продолжил службу в Закавказском военном округе до июля 1946 года.</p>
                <p className="text-base leading-relaxed">В Борковский период жизни с 1981 по 1994 год Иван Афанасьевич написал и издал двадцать четыре книги, сотни очерков, повести, лирические рассказы о природе. За книги «Я люблю эту землю» и «Беру на себя» он удостоен звания лауреата Государственной премии имени М. Горького.</p>
                <p className="text-base leading-relaxed">5 июня 1991 года по инициативе писателя Васильева в деревне Борки был открыт Дом экологического просвещения. Всю жизнь Васильев боролся за победу добра в душах людей. Его произведения — это целая эпоха.</p>
              </div>
            </div>
            {/* Second Vasiliev photo */}
            <div className="border-t" style={{ borderColor: "rgba(140,90,30,0.2)" }}>
              <img
                src="https://cdn.poehali.dev/projects/cb5f2151-618e-4458-9342-f98631d4ff88/bucket/13206ea1-d69c-4a84-8468-a9b6c3630ccd.jpg"
                alt="И.А. Васильев в музее"
                className="w-full object-cover"
                style={{ maxHeight: "420px", objectPosition: "top" }}
              />
              <div className="px-8 py-4 text-center" style={{ background: "rgba(180,130,60,0.2)" }}>
                <p className="text-sm italic" style={{ color: "#5a3510" }}>И.А. Васильев в литературно-художественном музее, д. Борки</p>
              </div>
            </div>
          </div>

          {/* Organizers Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
              О фестивале
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#2a1000" }}>Организаторы фестиваля</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#5a3510" }}>
              Фестиваль проводится при поддержке культурных организаций Псковской области
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Organizer 1 */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(180,130,60,0.15)", border: "1px solid rgba(140,90,30,0.25)", backdropFilter: "blur(12px)" }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)" }}>
                <Icon name="Star" size={24} style={{ color: "#3a1f00" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#2a1000" }}>АНО «Центр творчества и досуга «РАДУГА»</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a3510" }}>
                Главный организатор фестиваля, координирующий всю программу мероприятий
              </p>
            </div>

            {/* Organizer 2 */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(180,130,60,0.15)", border: "1px solid rgba(140,90,30,0.25)", backdropFilter: "blur(12px)" }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)" }}>
                <Icon name="BookOpen" size={24} style={{ color: "#3a1f00" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#2a1000" }}>Литературно-художественный музей им. И.А. Васильева</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a3510" }}>
                Хранитель литературного наследия региона, партнёр по культурной программе
              </p>
            </div>

            {/* Organizer 3 */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(180,130,60,0.15)", border: "1px solid rgba(140,90,30,0.25)", backdropFilter: "blur(12px)" }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)" }}>
                <Icon name="MapPin" size={24} style={{ color: "#3a1f00" }} />
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#2a1000" }}>Культурно-информационный центр Великолукского района</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a3510" }}>
                Информационная и площадочная поддержка фестиваля на территории района
              </p>
            </div>
          </div>

          {/* Features row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: "Users", label: "Участники со всей России", value: "500+" },
              { icon: "BookOpen", label: "Лет истории фестиваля", value: "40+" },
              { icon: "Heart", label: "Вход для зрителей", value: "Бесплатно" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,160,60,0.2)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl font-bold mb-1" style={{ color: "#c8a020" }}>{item.value}</div>
                <div className="text-xs leading-snug" style={{ color: "#5a3510" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline Section */}
      <section id="history" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
              История
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#2a1000" }}>История фестиваля</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#5a3510" }}>
              Более 40 лет традиции фронтовой поэзии в д. Борки
            </p>
          </div>

          {/* Timeline Tree */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(200,160,32,0.5) 5%, rgba(200,160,32,0.5) 95%, transparent)" }} />

            <div className="space-y-8">
              {historyEvents.map((event, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div key={event.year} className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] rounded-2xl p-6 ${isLeft ? "md:mr-8" : "md:ml-8"}`}
                      style={{
                        background: event.highlight ? "rgba(180,130,60,0.3)" : "rgba(180,130,60,0.15)",
                        border: event.highlight ? "1px solid rgba(200,160,32,0.6)" : "1px solid rgba(140,90,30,0.25)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: event.highlight ? "rgba(200,160,32,0.3)" : "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)" }}>
                          <Icon name={event.icon} size={18} style={{ color: event.highlight ? "#3a1f00" : "#3a1f00" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: event.highlight ? "#c8a020" : "rgba(200,160,32,0.7)" }}>{event.year}</div>
                          <h3 className="text-base font-semibold mb-2" style={{ color: "#2a1000" }}>{event.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: "#5a3510" }}>{event.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full items-center justify-center z-10 flex-shrink-0"
                      style={{
                        background: event.highlight ? "#c8a020" : "rgba(180,130,60,0.4)",
                        border: event.highlight ? "2px solid #f5e8c0" : "2px solid rgba(200,160,32,0.5)",
                        boxShadow: event.highlight ? "0 0 12px rgba(200,160,32,0.5)" : "none",
                      }}
                    />

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Photo Albums */}
        <div className="max-w-5xl mx-auto mt-20 px-6">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
              Фотоальбомы
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2a1000" }}>Архив фотографий</h2>
          </div>

          <div className="space-y-3">
            {ALBUMS.map((album) => {
              const isOpen = activeAlbum === album.id
              const data = albumCache[album.id]
              const isLetopis = album.id === "letopis"
              return (
                <div key={album.id} className="rounded-2xl overflow-hidden" style={{ background: "rgba(180,130,60,0.12)", border: `1px solid ${isOpen ? "rgba(200,160,32,0.5)" : "rgba(140,90,30,0.2)"}` }}>
                  <button
                    onClick={() => openAlbum(album.id)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: isLetopis ? "rgba(200,160,32,0.2)" : "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)" }}>
                        <Icon name={isLetopis ? "BookOpen" : "Images"} size={16} style={{ color: isLetopis ? "#c8a020" : "#3a1f00" }} />
                      </div>
                      <span className="font-semibold text-base" style={{ color: isLetopis ? "#c8a020" : "#3a1f00" }}>{album.label}</span>
                      {data?.loaded && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(180,130,60,0.2)", color: "#7a5020" }}>
                          {data.photos.length} фото
                        </span>
                      )}
                    </div>
                    <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: "#8a6020" }} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6">
                      {data?.loading && (
                        <div className="text-center py-8 text-sm" style={{ color: "#8a6030" }}>Загрузка...</div>
                      )}
                      {data?.loaded && data.photos.length === 0 && (
                        <div className="text-center py-8 text-sm" style={{ color: "#9a7040" }}>
                          Фотографии будут добавлены
                        </div>
                      )}
                      {data?.loaded && data.photos.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {data.photos.map((photo, idx) => (
                            <button
                              key={photo.key}
                              onClick={() => setLightbox({ photos: data.photos, index: idx })}
                              className="aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                              style={{ border: "1px solid rgba(140,90,30,0.3)" }}
                            >
                              <img src={photo.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }} onClick={() => setLightbox(null)}>
            <Icon name="X" size={20} style={{ color: "#fff" }} />
          </button>
          <button className="absolute left-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length } : null) }}>
            <Icon name="ChevronLeft" size={24} style={{ color: "#fff" }} />
          </button>
          <img
            src={lightbox.photos[lightbox.index].url}
            alt=""
            className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button className="absolute right-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.photos.length } : null) }}>
            <Icon name="ChevronRight" size={24} style={{ color: "#fff" }} />
          </button>
          <div className="absolute bottom-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {lightbox.index + 1} / {lightbox.photos.length}
          </div>
        </div>
      )}

      {/* Program Section */}
      <section id="program" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
              Программа
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#2a1000" }}>Два дня поэзии и памяти</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#5a3510" }}>
              2–3 мая 2026 года
            </p>
          </div>

          {/* Day 1 */}
          <div className="rounded-3xl overflow-hidden mb-8" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(140,90,30,0.2)" }}>
            <div className="px-8 py-5 flex items-center gap-4" style={{ background: "rgba(180,130,60,0.25)", borderBottom: "1px solid rgba(200,160,32,0.25)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,160,32,0.2)", border: "1px solid rgba(200,160,32,0.4)" }}>
                <Icon name="Calendar" size={18} style={{ color: "#c8a020" }} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#c8a020" }}>День первый</div>
                <div className="text-xl font-bold" style={{ color: "#2a1000" }}>2 мая — Великие Луки</div>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(140,90,30,0.15)" }}>
              {[
                { time: "8:00", text: "Встреча гостей праздника на ж.д. вокзале г. Великие Луки" },
                { time: "8:30–9:00", text: "Завтрак гостей (гостиница «Юбилейная», пл. Ленина, д. 2)" },
                { time: "10:00–12:30", text: "Экскурсия по центральной части города. Ведущий — экскурсовод-историк Владимир Орлов. Начало от пл. Ленина" },
                { time: "13:00–13:30", text: "Обед / чаепитие (Администрация Великолукского района, пр-кт Гагарина, д. 6)" },
                { time: "13:30", text: "Сбор почётных гостей и зрителей в актовом зале районной администрации" },
                { time: "14:00–16:00", text: "Круглый стол «Военная поэзия как часть победной истории России» — выступления литературоведов и поэтов из разных регионов, чтение стихов" },
                { time: "16:00–16:30", text: "Чайная пауза" },
                { time: "17:00–18:00", text: "Финальные чтения конкурса чтецов «Победное слово над Ловатью» (актовый зал администрации, пр-кт Гагарина, д. 6)" },
                { time: "18:15", text: "Отъезд гостей в Борки, расселение" },
                { time: "19:00", text: "Ужин в Борках" },
                { time: "21:00", text: "Отдых гостей" },
              ].map((item) => (
                <div key={item.time} className="flex items-start gap-5 px-8 py-4">
                  <div className="text-sm font-semibold flex-shrink-0 w-28 pt-0.5" style={{ color: "#c8a020" }}>{item.time}</div>
                  <div className="text-sm leading-relaxed" style={{ color: "#3a1f00" }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-3xl overflow-hidden mb-12" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(140,90,30,0.2)" }}>
            <div className="px-8 py-5 flex items-center gap-4" style={{ background: "rgba(180,130,60,0.3)", borderBottom: "1px solid rgba(200,160,32,0.25)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,160,32,0.2)", border: "1px solid rgba(200,160,32,0.4)" }}>
                <Icon name="Star" size={18} style={{ color: "#c8a020" }} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#c8a020" }}>День второй</div>
                <div className="text-xl font-bold" style={{ color: "#2a1000" }}>3 мая — д. Борки Великолукского района</div>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(140,90,30,0.15)" }}>
              {[
                { time: "8:30–8:50", text: "Завтрак гостей" },
                { time: "8:50–10:00", text: "Краткая экскурсия по музею им. Васильева" },
                { time: "10:30", text: "Лития у памятника Скорбящей. Возложение цветов на Братскую могилу" },
                { time: "11:00", text: "Начало праздника. Торжественная часть — приветственные слова от администрации района, музыкально-поэтическая программа (выступления участников у главного микрофона: 2 стиха, кратко о себе и значении праздника)" },
                { time: "11:00–15:30", text: "Работа выставок: рисунки, картины, фотографии, выездные экспозиции музейных комплексов" },
                { time: "13:00–14:30", text: "Работа полевой кухни" },
                { time: "14:00", text: "Завершение массовой части праздника" },
                { time: "14:30–17:00", text: "Торжественный обед для почётных гостей, участников, организаторов и членов литературных делегаций. Свободное общение с чтением стихов" },
                { time: "17:00–18:00", text: "Отдых" },
                { time: "18:00", text: "Выезд гостей на ж.д. вокзал Великие Луки" },
              ].map((item) => (
                <div key={item.time} className="flex items-start gap-5 px-8 py-4">
                  <div className="text-sm font-semibold flex-shrink-0 w-28 pt-0.5" style={{ color: "#c8a020" }}>{item.time}</div>
                  <div className="text-sm leading-relaxed" style={{ color: "#3a1f00" }}>{item.text}</div>
                </div>
              ))}
            </div>
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
      </section>

      {/* Contest Section */}
      <section id="contest" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
              Конкурс чтецов
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#2a1000" }}>«Победное Слово над Ловатью»</h2>
            <p className="text-base max-w-3xl mx-auto leading-relaxed" style={{ color: "#5a3510" }}>
              Общероссийский конкурс среди детей и юношества на лучшее исполнение стихотворений и прозы патриотической тематики современных авторов
            </p>
          </div>

          {/* Age groups */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { age: "8–10 лет", label: "Младшая группа" },
              { age: "11–14 лет", label: "Средняя группа" },
              { age: "15–18 лет", label: "Старшая группа" },
            ].map((g) => (
              <div key={g.age} className="rounded-2xl p-5 text-center" style={{ background: "rgba(180,130,60,0.15)", border: "1px solid rgba(140,90,30,0.25)" }}>
                <div className="text-2xl font-bold mb-1" style={{ color: "#c8a020" }}>{g.age}</div>
                <div className="text-xs" style={{ color: "#5a3510" }}>{g.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div>
                <div className="flex gap-3 mb-8">
                  {([["position", "Положение"], ["rules", "Регламент"]] as const).map(([id, label]) => (
                    <button key={id} onClick={() => setContestTab(id)}
                      className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                      style={contestTab === id
                        ? { background: "#c8a020", color: "#1a1a1a", border: "1px solid #e0c040" }
                        : { background: "rgba(180,130,60,0.15)", color: "#5a3510", border: "1px solid rgba(200,160,60,0.25)" }
                      }>{label}</button>
                  ))}
                </div>

                {contestTab === "position" && (
                  <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(140,90,30,0.2)" }}>
                    {[
                      {
                        num: "I", title: "Общие положения",
                        content: (
                          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <p>Общероссийский Конкурс «Победное Слово над Ловатью» проводится в рамках Фестиваля фронтовой поэзии и песни «А музы не молчат!».</p>
                            <p className="font-semibold" style={{ color: "#3a1f00" }}>Конкурс учреждён:</p>
                            <ul className="space-y-2 pl-4">
                              <li>• АНО «Центр творчества и досуга «РАДУГА» — Председатель, член Союза писателей России Размыслович Светлана Сергеевна</li>
                              <li>• Национальным Фондом развития культуры, туризма и ремёсел «Осиянная Русь» — Президент Фонда Ковалёв Дмитрий Александрович</li>
                              <li>• Филиалом Государственного фонда «Защитники Отечества» по Псковской области — руководитель Васильева Надежда Юрьевна</li>
                            </ul>
                            <p>Конкурс проводится один раз в год среди участников трёх возрастных категорий: 8–10 лет, 11–14 лет и 15–18 лет.</p>
                          </div>
                        )
                      },
                      {
                        num: "II", title: "Партнёры конкурса",
                        content: (
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm" style={{ color: "#3a1f00" }}>
                            {["Комитет Культуры Администрации города Великие Луки","МБУК «Информационно-культурный центр» Великолукского района","Союз писателей России","Союз десантников Псковской области","Союз женщин России","Союз краеведов Псковской области","Всероссийское общественное движение «Матери России»","Региональный штаб Комитета Семей Воинов Отечества по Псковской области","Отделение партии «Единая Россия» по г. Великие Луки","МБУК «Великолукский драматический театр»"].map((p, i) => (
                              <li key={i} className="flex items-start gap-2"><span style={{ color: "#c8a020" }}>{i+1}.</span>{p}</li>
                            ))}
                          </ul>
                        )
                      },
                      {
                        num: "III", title: "Цели и задачи",
                        content: (
                          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <p>Конкурс проводится в целях ознакомления и изучения патриотической поэзии и прозы современных авторов, поддержания высокого литературного уровня молодёжи, выявления и поддержки талантливых детей, воспитания культуры родной речи, сохранения русского языка.</p>
                            <ul className="space-y-2 pl-4">
                              <li>• Знакомство детей и юношества с современной поэзией и прозой патриотической и исторической направленности</li>
                              <li>• Формирование устойчивого интереса к героической истории России, событиям исторического значения в настоящее время</li>
                              <li>• Сохранение исторической памяти о доблести русского оружия, включая Великую Отечественную войну и СВО</li>
                              <li>• Повышение культурного, эстетического и образовательного уровня подрастающего поколения</li>
                              <li>• Выявление одарённых детей для участия во всероссийских и международных конкурсах, фестивалях и олимпиадах</li>
                            </ul>
                          </div>
                        )
                      },
                      {
                        num: "IV", title: "Оргкомитет конкурса",
                        content: (
                          <div className="space-y-2 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <p>Оргкомитет составляют представители учредителей в равных пропорциях. Оргкомитет принимает Регламент, утверждает логотип и фирменный стиль, критерии оценки, состав жюри, организует освещение в СМИ, привлекает спонсоров и партнёров, организует церемонию награждения победителей.</p>
                          </div>
                        )
                      },
                      {
                        num: "V", title: "Жюри конкурса",
                        content: (
                          <div className="space-y-2 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <p>Жюри ежегодно формируется из ведущих поэтов и писателей — членов Союза писателей России, известных артистов, режиссёров, журналистов и представителей творческих профессий.</p>
                            <p>Состав жюри подлежит ежегодной обязательной ротации не менее 30% от общего числа членов.</p>
                          </div>
                        )
                      },
                      {
                        num: "VI", title: "Проведение конкурса",
                        content: (
                          <div className="space-y-2 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <p>Заявки принимаются исключительно по электронной почте по утверждённой форме. Итоговые конкурсные чтения проводятся в г. Великие Луки и/или в Великолукском районе Псковской области.</p>
                          </div>
                        )
                      },
                    ].map((section) => (
                      <details key={section.num} className="group border-b last:border-b-0" style={{ borderColor: "rgba(140,90,30,0.2)" }}>
                        <summary className="flex items-center gap-4 px-8 py-5 cursor-pointer list-none hover:opacity-90">
                          <span className="text-lg font-bold w-8 flex-shrink-0" style={{ color: "#c8a020" }}>{section.num}.</span>
                          <span className="font-semibold text-base flex-1" style={{ color: "#2a1000" }}>{section.title}</span>
                          <Icon name="ChevronDown" size={18} style={{ color: "#8a6020" }} />
                        </summary>
                        <div className="px-8 pb-6 pl-20">{section.content}</div>
                      </details>
                    ))}
                  </div>
                )}

                {contestTab === "rules" && (
                  <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(140,90,30,0.2)" }}>
                    {[
                      {
                        num: "I", title: "Общие положения",
                        content: (
                          <div className="space-y-2 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <p>Конкурс проводится один раз в год. С 2026 года добавлена новая номинация — «Авторское стихотворение», в которой определяется лучшее стихотворение, написанное автором от 8 до 18 лет.</p>
                          </div>
                        )
                      },
                      {
                        num: "II", title: "Порядок проведения",
                        content: (
                          <div className="space-y-2 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <ul className="space-y-2">
                              <li><span style={{ color: "#c8a020" }}>Период проведения:</span> 16 марта — 26 апреля 2026 года</li>
                              <li><span style={{ color: "#c8a020" }}>Финальные чтения:</span> 2 мая 2026 года, г. Великие Луки</li>
                              <li><span style={{ color: "#c8a020" }}>Заявка включает:</span> анкету установленного образца, согласие на обработку персональных данных, видеоролик с чтением произведения (для авторского стихотворения — дополнительно текст)</li>
                              <li><span style={{ color: "#c8a020" }}>Адрес для заявок:</span> <span className="underline">swetslova.ru@yandex.ru</span></li>
                              <li><span style={{ color: "#c8a020" }}>Голосование:</span> в группе Фестиваля «ВКонтакте» — зрительское голосование; по 5 финалистов в каждой возрастной группе</li>
                              <li><span style={{ color: "#c8a020" }}>Все видеоматериалы</span> публикуются в группах Фестиваля (ВКонтакте, Телеграм, сайт музафронта.рф)</li>
                            </ul>
                          </div>
                        )
                      },
                      {
                        num: "III", title: "Требования к видеоматериалу",
                        content: (
                          <ul className="space-y-2 text-sm" style={{ color: "#3a1f00" }}>
                            <li>• Формат видеоролика — <strong style={{ color: "#3a1f00" }}>горизонтальный</strong></li>
                            <li>• Обязательно объявить автора и название стихотворения перед декламацией</li>
                            <li>• Название файла: <span style={{ color: "#c8a020" }}>Фамилия_Имя_Возраст_Город</span> (пример: Иванов_Иван_10 лет_Псков)</li>
                            <li>• В теме письма: «На конкурс «Победное Слово над Ловатью»</li>
                            <li>• Продолжительность — <strong style={{ color: "#3a1f00" }}>не более 3 минут</strong></li>
                          </ul>
                        )
                      },
                      {
                        num: "IV", title: "Жюри конкурса",
                        content: (
                          <div className="space-y-2 text-sm leading-relaxed" style={{ color: "#3a1f00" }}>
                            <p>Жюри ежегодно формируется из ведущих поэтов и писателей — членов Союза писателей России, известных артистов, режиссёров, журналистов и представителей творческих профессий согласно Положению о Фестивале.</p>
                            <p>Состав жюри подлежит ежегодной обязательной ротации не менее 30% от общего числа членов.</p>
                          </div>
                        )
                      },
                    ].map((section) => (
                      <details key={section.num} className="group border-b last:border-b-0" style={{ borderColor: "rgba(140,90,30,0.2)" }}>
                        <summary className="flex items-center gap-4 px-8 py-5 cursor-pointer list-none hover:opacity-90">
                          <span className="text-lg font-bold w-8 flex-shrink-0" style={{ color: "#c8a020" }}>{section.num}.</span>
                          <span className="font-semibold text-base flex-1" style={{ color: "#2a1000" }}>{section.title}</span>
                          <Icon name="ChevronDown" size={18} style={{ color: "#8a6020" }} />
                        </summary>
                        <div className="px-8 pb-6 pl-20">{section.content}</div>
                      </details>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="/application-form.html" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="rounded-full px-8 font-semibold gap-2" style={{ background: "rgba(180,130,60,0.3)", color: "#2a1000", border: "1px solid rgba(200,160,40,0.55)" }}>
                      <Icon name="FileDown" size={18} />
                      Скачать бланк заявки
                    </Button>
                  </a>
                  <a href="mailto:swetslova.ru@yandex.ru">
                    <Button size="lg" className="rounded-full px-8 font-semibold gap-2" style={{ background: "#c8a020", color: "#1a1a1a", border: "1px solid #e0c040" }}>
                      <Icon name="Mail" size={18} />
                      Отправить заявку
                    </Button>
                  </a>
                </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-12" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(140,90,30,0.2)", backdropFilter: "blur(16px)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column */}
              <div>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
                  Вопросы и ответы
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2a1000" }}>
                  Частые вопросы
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "#5a3510" }}>
                  Всё, что нужно знать об участии в фестивале: от подачи заявки до дороги в д. Борки.
                </p>
              </div>

              {/* Right Column - FAQ Accordion */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "rgba(180,130,60,0.15)", border: "1px solid rgba(140,90,30,0.25)" }}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors hover:opacity-90"
                    >
                      <h3 className="text-base font-semibold pr-4" style={{ color: "#2a1000" }}>{faq.question}</h3>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 flex-shrink-0" style={{ color: "#a06820" }} />
                      ) : (
                        <Plus className="w-5 h-5 flex-shrink-0" style={{ color: "#a06820" }} />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-sm leading-relaxed" style={{ color: "#3a1f00" }}>{faq.answer}</p>
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
          <div className="rounded-3xl p-12" style={{ background: "rgba(180,130,60,0.12)", border: "1px solid rgba(140,90,30,0.25)", backdropFilter: "blur(16px)" }}>
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.4)", color: "#3a1f00" }}>
                Контакты
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#2a1000" }}>Свяжитесь с нами</h2>
              <p className="text-lg" style={{ color: "#5a3510" }}>
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
                      style={{ borderColor: "#a06820", focusRingColor: "#7a1f2e" }}
                      placeholder="Ваше полное имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#4a1020" }}>Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border text-gray-800 focus:outline-none focus:ring-2"
                      style={{ borderColor: "#a06820" }}
                      placeholder="your@email.ru"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#4a1020" }}>Город / регион</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border text-gray-800 focus:outline-none"
                      style={{ borderColor: "#a06820" }}
                      placeholder="Откуда вы?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#4a1020" }}>Ваши стихотворения / вопрос</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border text-gray-800 focus:outline-none resize-none"
                      style={{ borderColor: "#a06820" }}
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
                <p className="text-lg leading-relaxed" style={{ color: "#3a1f00" }}>
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
                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(180,130,60,0.2)", border: "1px solid rgba(140,90,30,0.25)" }}>
                      <Icon name={item.icon} size={20} style={{ color: "#c8a020", marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div className="text-xs font-medium mb-0.5" style={{ color: "#8a6030" }}>{item.label}</div>
                        <div className="text-sm font-medium" style={{ color: "#3a1f00" }}>{item.value}</div>
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
          <div className="rounded-3xl p-12" style={{ background: "rgba(180,130,60,0.05)", border: "1px solid rgba(140,90,30,0.15)", backdropFilter: "blur(16px)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img src={LOGO} alt="Логотип" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-base" style={{ color: "#3a1f00" }}>«А музы не молчат!»</div>
                    <div className="text-xs" style={{ color: "#8a6030" }}>Всероссийский фестиваль фронтовой поэзии</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#5a3510" }}>
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
                <p className="text-xs mt-2" style={{ color: "#9a7040" }}>Подпишитесь на новости фестиваля</p>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: "#2a1000" }}>Разделы</h4>
                <ul className="space-y-2">
                  {["О фестивале", "История", "Программа", "Вопросы", "Контакты"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#5a3510" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organizers */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: "#2a1000" }}>Организаторы</h4>
                <ul className="space-y-3">
                  {[
                    "АНО «ЦТиД «РАДУГА»",
                    "Музей им. И.А. Васильева",
                    "КИЦ Великолукского района",
                  ].map((org) => (
                    <li key={org} className="text-xs leading-snug" style={{ color: "#5a3510" }}>
                      {org}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Divider & Copyright */}
            <div className="pt-8" style={{ borderTop: "1px solid rgba(140,90,30,0.2)" }}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm" style={{ color: "#7a5020" }}>
                  © 2026 Фестиваль «А музы не молчат!» · Псковская область
                </p>
                <p className="text-xs" style={{ color: "#8a6030" }}>
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