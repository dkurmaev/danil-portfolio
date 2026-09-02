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

Всё проверено: `format` / `lint` / `typecheck` / `build` — чисто. Смоук-тест пройден: `/` → 307 → `/de`, все три локали рендерятся, неизвестная локаль даёт 404.

**Сейчас в работе:**

- **Блок F** — SEO: метаданные по локалям, sitemap, robots.txt, canonical, hreflang, OpenGraph, JSON-LD.

**Дальше по плану:**

- **Блок G** (после MVP) — страница `/checkliste`: форма, серверный расчёт по каталогу, отправка письма. Требует API route, поэтому вне MVP — основное ТЗ фиксирует MVP как версию без backend.

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