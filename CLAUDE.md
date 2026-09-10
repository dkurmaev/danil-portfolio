# CLAUDE.md

Контекст проекта для Claude. Файл лежит в корне репозитория и читается перед любой работой над кодом.

---

## 1. О проекте

Персональный мультиязычный сайт-портфолио fullstack/product-разработчика.

**Локали:** `de` (основная, дефолтная), `en`, `ru`.

**Цель:** чистая, хорошо спроектированная Next.js-архитектура с корректным i18n, строгой типизацией и проходящим билдом на каждом чекпоинте.

---

## 2. Стек

| Слой           | Технология                               |
| -------------- | ---------------------------------------- |
| Фреймворк      | Next.js 16 (App Router)                  |
| i18n           | next-intl 4                              |
| Стили          | Tailwind v4 (без `tailwind.config.ts`)   |
| Анимации       | `motion` (бывший `framer-motion`)        |
| Иконки         | `lucide-react`                           |
| Формы          | `react-hook-form` + `zod`                |
| Форматирование | Prettier + `prettier-plugin-tailwindcss` |

**Окружение:** Windows, PowerShell, VS Code.

---

## 3. Как мы работаем

Это ключевая часть файла. Порядок важнее скорости.

1. **Структура перед кодом.** Перед написанием файлов Claude предлагает полную карту структуры (пути + назначение каждого файла) на утверждение. Правки вносятся до начала работы, а не после.
2. **Шаг за шагом.** Работа разбита на пронумерованные шаги (STEP 01, STEP 02, ...). Следующий шаг не начинается, пока текущий не проверен.
3. **Проверка после каждого шага** — обязательно, в этом порядке:
   ```
   npm run format
   npm run lint
   npm run typecheck
   npm run build
   ```
4. **Расхождения в тулчейне флагятся заранее.** Если версия пакета, имя пакета или API отличаются от ожидаемого — Claude сообщает об этом **до** выполнения команд, а не после падения.
5. **Никаких файлов «на будущее».** Директории (`lib/`, `ui/`, `sections/` и т.д.) создаются только тогда, когда в них есть реальное содержимое.
6. **Язык общения:** русский.
7. **`CLAUDE.md` и `docs/` не изменяются** в ходе выполнения задач по коду. Исключение — раздел 6 «Текущее состояние», который обновляется по завершении блока, если попросить.

---

## 4. Конвенции проекта

### i18n

- `messages/` лежит в **корне проекта**, не в `src/`.
- `localePrefix: "always"` — префикс локали присутствует в URL всегда.
- `defaultLocale: "de"` **управляет только роутингом**. next-intl **не делает** авто-фолбэк для отсутствующих ключей — все три JSON-файла обязаны иметь идентичную структуру ключей.
- Механизм фолбэка для отсутствующих переводов будет спроектирован отдельно, когда появится реальный контент.

### Типы

- Используем **`AppLocale`**, а не `Locale` — во избежание коллизии с собственным экспортируемым типом `Locale` из next-intl 4.

### Импорты

- Константа `locales` используется **вне** `src/i18n/`.
- Объект `routing` передаётся **только** в фабрики next-intl (`createNavigation` и т.п.) и никуда больше.

### Именование

- Все файлы-коллекции данных — во **множественном числе**: `projects`, `technologies`, `experiences`, `services`.
- Тип в `src/types/` парный к файлу в `data/` (например `src/types/projects.ts` ↔ `data/projects.ts`).

### Ценовые данные

Отдельный режим, конвенция `data/*` на них **не распространяется**.

- `katalog.json` и логика расчёта лежат в `src/lib/server/`, **не** в `data/`. Из `data/` импортируют компоненты — туда каталогу нельзя.
- Модуль расчёта начинается с `import "server-only"`, чтобы сборка падала при случайном импорте из клиентского компонента.
- Клиент отправляет на сервер **только коды позиций и количества**. Ответ клиенту **не содержит сумм**.
- Публичная секция Services показывает направления работ. Цифры — либо не показываются вовсе, либо только уровень `standard` в формате «ab N €».
- Уровни `bekanntschaft` и `familie`, часовые ставки и коэффициенты — внутренние данные. В браузер не попадают ни при каких условиях.

### Prettier

- `prettier-plugin-tailwindcss` с `tailwindStylesheet: "./src/app/globals.css"` — обязательно для совместимости с Tailwind v4.

---

## 5. Подводные камни окружения

- **PowerShell-редирект (`>`, `>>`) создаёт UTF-16 с BOM**, который Prettier не читает. Файлы создаются **через VS Code**, не через редирект в консоли.
- **Next.js 16 переименовал `middleware.ts` в `proxy.ts`.** Функциональность идентична, изменились только имя файла и экспорт. Файл лежит в `src/proxy.ts`, использует `createMiddleware(routing)` из `next-intl/middleware`.
- **`docs/` и `package-lock.json` исключены из Prettier.** Prettier разбирает помеченные как `ts` блоки в ТЗ как реальный код и ломает псевдокод — перечисления полей превращаются в comma-оператор.

---

## 6. Текущее состояние

**Готово:**

- **STEP 01** — инициализация проекта, зависимости, конфиг Prettier, проверка билд-пайплайна.
- **STEP 02** — инфраструктура i18n: `next.config.ts`, `src/i18n/routing.ts`, `src/i18n/navigation.ts`, `src/i18n/request.ts`, `messages/{de,en,ru}.json`.
- **STEP 03** — миграция на `[locale]`-роутинг: `src/app/[locale]/layout.tsx` (generateStaticParams, валидация локали, setRequestLocale, NextIntlClientProvider), `src/app/[locale]/page.tsx`, `src/proxy.ts`. Корневые `app/layout.tsx` и `app/page.tsx` удалены. Дизайн-токены заведены в `globals.css` через Tailwind v4 `@theme`.
- **Блок B** — Header, MobileMenu, Footer, Hero. UI-примитивы `Button`, `Badge`, `Container`, `SocialLinks`, `LanguageSwitcher`. Конфиги `config/site.ts`, `config/social.ts`.
- **Блок C** — About (текст + info cards: Location / Role / Focus / Languages), Tech Stack (6 категорий: Frontend, Mobile, Backend, Database, Infrastructure, Services/APIs, без progress bars). Данные стека — `data/technologies.ts` + `src/types/technologies.ts` (парный тип). Добавлен алиас `@data/*` → `./data/*` в `tsconfig.json`, так как `data/` лежит в корне проекта, а не в `src/`. Новые reusable UI-примитивы: `SectionHeading`, `Card`. Обе секции навешены на якоря `#about` / `#stack` со `scroll-mt-20`.
- **Рефакторинг:** `src/lib/cn.ts` — общий хелпер merge классов, вынесен из `Card`/`SectionHeading`/`Button`/`Container`/`Badge` (по итогам `/code-review` после Блока C).
- **Блок D** — Featured Projects: 4 проекта (Dev2Lab, Italiano Daily, Olidort Bedachungen, Space Burger) в `data/projects.ts` + `src/types/projects.ts` (парный тип). `name` и `stack` — не переводятся (лежат в data), переводятся category/status/description через labelKey-паттерн (`Projects.categories.*`, `Projects.statuses.*`, `Projects.descriptions.<slug>`). `ProjectCard` — CSS/SVG-плейсхолдер обложки, CTA "View project" — визуальная заглушка без перехода. Секция `Projects` — id="projects", grid 1/2 колонки.
- **Рефакторинг:** `src/components/ui/CoverPlaceholder.tsx` — общий CSS/SVG-плейсхолдер (блобы + grid + label), вынесен из `Hero` и `ProjectCard` (по итогам `/code-review` после Блока D). Там же убран hover на `ProjectCard`, обещавший переход (подъём + glow-тень + zoom обложки), пока карточка никуда не ведёт — оставлен только hover на бордере.
- **Блок E** — Experience (timeline, `data/experiences.ts` + `src/types/experiences.ts`, 3 записи: freelance/fullstack-development/it-background, только `id`+`current` в data, весь текст — period/title/description — через labelKey), Education & Certifications (2 карточки + кнопка "View certificates" как честный `disabled`-стаб, без модалки/страницы — они позже), Services (`data/services.ts` + `src/types/services.ts`, все 7 карточек по ТЗ §41, без цен и цифр), Contact (заголовок, описание, рабочая mailto-кнопка + SocialLinks, без формы — она отдельным блоком с backend). Секции `#experience` / `#services` / `#contact` — `scroll-mt-20`.
- **Блок F** — SEO. `src/lib/seo.ts` — общие хелперы: `absoluteUrl`/`localeHref` (на основе `siteConfig.url`), `buildLanguageAlternates` (hreflang для de/en/ru + `x-default` → de), `ogLocale` (de_DE/en_US/ru_RU), `buildPersonJsonLd`/`buildWebsiteJsonLd`. `src/app/[locale]/layout.tsx` — `generateMetadata` (title/description из нового неймспейса `messages.Metadata`, `metadataBase`, `alternates.canonical` + `alternates.languages`, OpenGraph, Twitter card) и два `<script type="application/ld+json">` (Person — из `Header.brandName`/`brandRole`, WebSite — из `siteConfig.name` + `Metadata.description`) в `<body>`. `src/app/sitemap.ts` и `src/app/robots.ts` — нативные `MetadataRoute`, sitemap отдаёт все три локали с hreflang-alternates на каждой записи. `src/config/site.ts` — добавлены `url` (`NEXT_PUBLIC_SITE_URL`, фолбэк `http://localhost:3000`), `name`, `ogImage` (путь под будущий `/public/images/og/cover.jpg` — сам файл ещё не создан). `.env.example` — `NEXT_PUBLIC_SITE_URL`. Семантика заголовков сверена: один `h1` (Hero), `h2` через `SectionHeading` на каждую секцию, `h3` на карточках — без правок.

Всё проверено: `format` / `lint` / `typecheck` / `build` — чисто. Смоук-тест пройден: `/` → 307 → `/de`, все три локали рендерятся (200), неизвестная локаль даёт 404, `/sitemap.xml` и `/robots.txt` отдаются, в `<head>` каждой локали корректные `title`/`description`/`canonical`/`hreflang`(×3 + x-default)/OpenGraph/Twitter и валидный JSON-LD (Person + WebSite).
- **Блок H1** — переход визуальной схемы с тёмной на светлую (`docs/technical-spec.md` §6–17). `src/app/globals.css` — токены `@theme` полностью переписаны под светлую палитру (`--color-bg: #FAFAF8`, `--color-fg: #0A0A0A`, `--color-accent: #6D4AFF`, `--color-accent-secondary: #5638E0`, borders/secondary/muted через `rgba(10,10,10,*)`, `--color-success/error`); старые тёмные значения и `--color-accent-tech` удалены без параллельной схемы. Добавлен `--color-fg-inverse: #FFFFFF` — текст на заливке `accent`. `src/components/ui/Button.tsx` — `primary` использует `text-fg-inverse`, `secondary` получил явный белый фон (`bg-bg-card`) вместо прозрачного. `src/components/layout/Header.tsx` — бэкдроп на скролле `bg-bg/95` (было `/80`, на светлом фоне нужна бо́льшая непрозрачность), остальное отрисовалось через токены без правок кода. `src/components/sections/Hero.tsx` — новая композиция по ТЗ §13–17: заголовок-имя заменён на 3-строчное утверждение (`titleLine1/2/3`), чипы стека заменены двумя компактными строками с иконками `lucide` (`Code2`/`Layers`, ключи `techRow1/2`), отдельный `Badge` наверху убран — статус доступности стал третьей строкой того же ряда с pulsing-точкой, tertiary CTA превращён из `Button ghost` в подчёркнутую ссылку со стрелкой, ведущую к `#calculator`. `CoverPlaceholder` (сам компонент не менялся, он полностью на токенах) в Hero теперь на поверхности `bg-bg-elevated` вместо `bg-bg-card`, чтобы не сливаться с белой страницей; пропорция `aspect-[4/5]` сохранена как портретная. `messages/{de,en,ru}.json` — неймспейс `Hero`: убраны `titleLine1/2` (имя/фамилия), `subtitle`, `stack`; добавлены `titleLine1/2/3` (новое утверждение) и `techRow1/2`; текст `ctaTertiary` приведён к варианту ТЗ («unverbindlich» / non-binding / бесплатно). Остальные секции (About, TechStack, Projects, Experience, Education, Services, Contact, Footer) блок не затронул — на новых токенах временно выглядят несогласованно, это ожидаемо и чинится в блоке H2. `format` / `lint` / `typecheck` / `build` — чисто.
- **Блок H1 (продолжение) — подключение реальных ассетов.** Плейсхолдеры в Header и Hero заменены на готовые файлы из `public/brand/`. `src/components/layout/Header.tsx` — бейдж "DK" заменён на `<img src="/brand/dk-logo-primary.svg">` (обычный `<img>`, не `next/image`: локальный SVG требует `images.dangerouslyAllowSVG` в конфиге, а ради одного доверенного статичного вектора включать это не стали; ESLint-предупреждение `no-img-element` подавлено точечным `eslint-disable-next-line` с комментарием-обоснованием), `h-9 md:h-10`, `alt` — переведённый `Header.brandName`. Текст имени/роли рядом с логотипом оставлен — в SVG зашит только англ. wordmark "DANIL KURMAYEV" без переводимой роли, и он нечитаем в 40px. `Footer.tsx` использует такой же текстовый бейдж "DK" — не тронут, это отдельный шаг вне Блока H1. `src/components/sections/Hero.tsx` — вместо `CoverPlaceholder` визуальная колонка (контейнер `aspect-[4/5] rounded-card border bg-bg-elevated overflow-hidden`) теперь содержит два слоя `next/image`: `portfolio-hero-background.png` (`fill`, `alt=""`, `object-cover object-right-bottom`, декоративный) и поверх него `danil-portrait-transparent.png` (`width={1368} height={1149}` — реальные пиксельные размеры файла, `priority`, `alt` — новый ключ `Hero.portraitAlt`, абсолютно спозиционирован по низу `h-[88%] w-full object-contain object-bottom`). Оба изображения делят одну константу `sizes="(min-width: 768px) 55vw, 100vw"`. `messages/{de,en,ru}.json` — добавлен `Hero.portraitAlt` (не дословный перевод между локалями). Удалены неиспользуемые дефолтные ассеты `create-next-app`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` (проверено grep — ссылок не было). `dk-logo-animated.svg` и `Danil-Kurmayev-Logo-Master-4096.png` в вёрстку не подключались (по заданию). Визуально проверено через dev-сервер + Chrome-скриншот: логотип, портрет и фон рендерятся без искажений, консоль без ошибок. `format` / `lint` / `typecheck` / `build` — чисто.
- **Служебные страницы.** `src/app/not-found.tsx` — корневой фолбэк 404 (собственные `<html>/<body>`, немецкий текст захардкожен: рендерится до того, как `[locale]/layout.tsx` успевает определить локаль, next-intl-контекста там нет). `src/app/[locale]/not-found.tsx` — локализованная 404 в стиле сайта (`Header`/`Footer` + номер + `messages.NotFound`), ловит несуществующие пути внутри валидной локали. `src/app/[locale]/impressum/page.tsx` — реальный Impressum (Danil Kurmayev Webentwicklung, Rabensteiner Str. 9, 12689 Berlin; раздел Verbraucherstreitbeilegung — дословно из `docs/impressum_kurmaev_dev_de.pdf`, без строки атрибуции "Quelle: eRecht24"), контент через `messages.Impressum` — **одинаковый немецкий текст во всех трёх locale-файлах** (юридический документ не переводится, переводится только заголовок навигации, который уже был переведён в `Footer.legalImpressum`/`legalDatenschutz`), индексируемая, `noindex` не проставлен. `src/app/[locale]/datenschutz/page.tsx` — структура из 6 разделов-плейсхолдеров (Verantwortlicher/Hosting/Kontaktformular/Cookies & Analyse/Externe Dienste/Ihre Rechte), обычная локализация по `messages.Datenschutz`, `robots: { index: false, follow: true }`. `src/app/[locale]/checkliste/page.tsx` — coming-soon заглушка калькулятора стоимости (`messages.Checkliste`), тоже `noindex, follow`. `src/config/social.ts` — добавлен `phone` (для Impressum; `tel:`-ссылка строится из него). `src/lib/seo.ts` — `localeHref`/`buildLanguageAlternates` получили опциональный параметр `path` (по умолчанию `''`, обратная совместимость сохранена) для canonical/hreflang не только главной страницы. `src/app/sitemap.ts` — добавлена запись `/impressum` на все три локали (datenschutz/checkliste — noindex, в sitemap не идут). `src/components/ui/Button.tsx` — внутренние ссылки (не `#anchor`, не `http(s)/mailto`) теперь рендерятся через next-intl `Link` вместо голого `<a>`, иначе кнопка «на главную» на 404/checkliste теряла бы текущую локаль; на существующие анкорные кнопки (`#projects`, `#contact`) не влияет. `src/components/layout/Footer.tsx` — `legalImpressum`/`legalDatenschutz` из мёртвых `<span>` стали рабочими `Link` на `/impressum` и `/datenschutz`. `src/components/sections/Hero.tsx` — `ctaTertiary` (`<a href="#calculator">`, ссылка на несуществующий якорь) заменён на `Link` на `/checkliste`. Пункт меню на `/checkliste` не добавлялся — задача просила ссылки только в Footer и Hero, `Nav.calculator` остаётся неиспользуемым ключом про запас. Смоук-тест через `next start`: `/xx.foo` (locale вне списка, минуя proxy-редирект) → корневой 404 со стилями; `/de/nonexistent-route` → локализованная 404 с Header/Footer; `/de/impressum` — 200, без noindex, немецкий текст одинаков на `/en/impressum`/`/ru/impressum`; `/de/datenschutz` и `/de/checkliste` — 200 с `noindex`; переводы на `/ru/datenschutz` и `/ru/checkliste` рендерятся; ссылки в Footer и Hero ведут на локализованные пути; canonical + hreflang (×3 + x-default) на `/impressum` корректны; `/sitemap.xml` включает `/impressum` на все локали. `format` / `lint` / `typecheck` / `build` — чисто.

- **Блок G1** — движок расчёта стоимости, без UI. `src/lib/server/katalog.json` (gitignored, реальные `hourlyRate`/`levelMultipliers`/`items`/`packages`) + `src/lib/server/katalog.example.json` (commited, та же структура, обезличенные цифры — служит и документацией формата, и фикстурой тестов). `src/lib/server/pricing/` — движок: `types.ts` (`PricingLevel`, `ItemUnit`, `CatalogItem`, `CatalogPackage`, `Katalog`, `SelectionLine`, `EstimateResult`), `katalog.ts` (загрузка `katalog.json` + валидация формы через zod, падает с понятной ошибкой при битой структуре), `calculate.ts` (`calculateEstimate` — чистая функция: сумма часов по позициям/пакетам × `hourlyRate` × `levelMultipliers[level]`; пакет = сумма часов входящих позиций минус `discountHours`; вилка standard — ±20%, границы кратны 500, с защитой от вырожденного диапазона у маленьких сумм), `index.ts` (barrel). Все модули начинаются с `import "server-only"`. Каталог позиций — полное 1:1 покрытие разделов 03–08 и 10 `docs/Projekt-Checkliste.pdf` (58 позиций + 2 пакета: `pkg-website-starter`, `pkg-telegram-bot-starter`); разделы 01/02/09/11 PDF — это intake-поля и классификаторы, не прайсовые позиции, в каталог не вошли. `src/lib/estimateRequestSchema.ts` — zod-схема запроса (только `items: {code, quantity}[]`, без уровня), лежит вне `server/`, как `contactFormSchema.ts` — переиспользуется формой калькулятора в Блоке G2. `src/lib/server/rateLimit.ts` — in-memory rate limiter (10 запросов/60с по IP из `x-forwarded-for`/`x-real-ip`), с явной оговоркой в комментарии: не переживает cold start и не шарится между инстансами serverless, для MVP достаточно. `src/app/api/estimate/route.ts` — POST: rate limit → zod-валидация → `calculateEstimate` → в ответе **только** `{ ok, range: { min, max } }` (standard-вилка), без сумм по позициям и без bekanntschaft/familie. Тесты — `src/lib/server/pricing/calculate.test.ts` (vitest, добавлен как devDependency + `vitest.config.mts` с алиасом `server-only` → `empty.js`, иначе пакет кидает исключение вне next-бандлера при обычном запуске под Node; фикстура — `katalog.example.json`): базовый расчёт по всем трём уровням, суммирование нескольких позиций, количественные позиции (`pro Seite` — `site-page`, `pro Event` — `bot-auto-message`), округление вилки до кратных 500, анти-вырождение вилки для маленьких сумм, пустая выборка, пакет дешевле суммы отдельных позиций, неизвестный код бросает `UnknownCodeError`. `package.json` — добавлен script `"test": "vitest run"`. Смоук-тест через `next start`: одиночная позиция и пакет+`pro_seite` считаются верно, неизвестный код/пустой массив/невалидный JSON → 400, 11-й запрос подряд → 429, в ответе во всех случаях нет ничего, кроме `ok`/`range`/`error`. `format` / `lint` / `typecheck` / `test` / `build` — чисто.

- **Блок G1 (правка)** — два расхождения в движке. (1) Вилка standard теперь округляется переменным шагом: до 2000€ — кратно 100, от 2000€ — кратно 500 (`RANGE_STEP_THRESHOLD/SMALL/LARGE` в `calculate.ts`); раньше фиксированные 500 давали ±20% на деле ±100% для мелких позиций. (2) `katalog.json` пересчитан по `docs/Preisliste_Familie_Danil_Kurmayev.pdf`: `levelMultipliers.familie` 0.55 → 0.48, Aufwand каждой из 58 позиций взят как `familie_price / (0.48 × 80)` по прямому соответствию строке прайслиста; добавлена категория `website-erstellung` (7 позиций: `site-build-onepager/landingpage/business/business-extended/react-migration/complete-revamp/relaunch-redirect`) — в прайсе это готовые позиции "Website-Erstellung", а не суммы блоков, без них не с чем было сверить контрольные точки Unternehmenswebsite/Landingpage. `katalog.example.json` получил те же 7 позиций с обезличенными числами (структурное соответствие). Контрольные точки (Hero 250€, FAQ 130€, Unternehmenswebsite 5–7 Seiten 2300€, Landingpage 5–7 Sektionen 1390€, все на familie) сходятся с отклонением <0.2% (проверено разовым тестовым прогоном, не оставлен в репозитории). Тесты на округление вилки в `calculate.test.ts` переписаны под переменный шаг (10/10 зелёных). `format` / `lint` / `typecheck` / `test` / `build` — чисто.

**Дальше по плану:**

- **Блок G2** — форма калькулятора по структуре `docs/Projekt-Checkliste.pdf`, использует `estimateRequestSchema` и `/api/estimate` из Блока G1.

- **Блок H2** — светлая схема для остальных секций (About, TechStack, Projects, Experience, Education, Services, Contact, Footer) и статус-цветов `ProjectCard` (лишился `--color-accent-tech` в Блоке H1).

- **Блок G** (после MVP) — реальная функциональность `/checkliste`: форма, серверный расчёт по каталогу, отправка письма. Сейчас там coming-soon заглушка (см. «Служебные страницы»). Требует API route, поэтому вне MVP — основное ТЗ фиксирует MVP как версию без backend.

- **Datenschutz** — сейчас структура разделов с плейсхолдерами (`noindex`); реальный текст политики конфиденциальности появится отдельным шагом, когда будут финально определены подключённые сервисы (analytics, hosting, contact form, cookies, внешние API).

**В планах:**

- Проектирование фолбэка для отсутствующих ключей перевода.

---

## 7. Чего не делать

- Не создавать пустые директории и файлы-заглушки.
- Не переходить к следующему шагу без прогона проверочных команд.
- Не писать код до утверждения структуры.
- Не добавлять ключ в один `messages/*.json`, не добавив его во все три.
- Не писать текст внутри компонентов — только через `messages/`.
- Не использовать имя типа `Locale`.
- Не предполагать версию API по памяти — сверяться, если есть сомнения.
- Не размещать на публичных страницах прайс-лист, часовые ставки, коэффициенты скидок и уровни `bekanntschaft` / `familie`.
- Не изменять `CLAUDE.md`, кроме раздела 6 «Текущее состояние» — его можно обновлять по явной просьбе в конце блока. Содержимое `docs/` не изменять никогда.