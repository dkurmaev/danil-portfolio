# ТЕХНИЧЕСКОЕ ЗАДАНИЕ
## Personal Portfolio — Danil Kurmayev

**Тип проекта:** персональный мультиязычный сайт-портфолио Fullstack / Product Developer  
**Владелец:** Danil Kurmayev  
**Назначение:** профессиональное позиционирование, презентация проектов и компетенций, получение freelance-заявок, трудовых предложений и предварительный расчет стоимости разработки.

---

# 1. Общая концепция проекта

Необходимо разработать современный персональный сайт-портфолио разработчика Danil Kurmayev.

Сайт должен позиционировать владельца не как начинающего разработчика или выпускника курсов, а как самостоятельного **Fullstack / Product Developer**, который способен:

- спроектировать цифровой продукт;
- разработать frontend;
- разработать backend;
- спроектировать API;
- работать с базами данных;
- интегрировать сторонние сервисы;
- создавать автоматизацию;
- разрабатывать Telegram-ботов;
- интегрировать AI;
- настраивать deployment;
- работать с CI/CD;
- поддерживать продукт после публикации.

Основная идея сайта:

> **From idea to production.**

Danil Kurmayev должен восприниматься как разработчик, который способен довести проект от идеи и архитектуры до работающего production-продукта.

---

# 2. Цели сайта

Сайт должен решать одновременно несколько задач.

## 2.1. Профессиональное портфолио

Представлять Danil Kurmayev работодателям, рекрутерам, CTO и техническим специалистам.

Посетитель должен быстро понять:

- кто разработчик;
- какая специализация;
- какой стек;
- какие проекты реализованы;
- какой технический уровень;
- какой реальный опыт;
- как связаться.

---

## 2.2. Freelance-представительство

Сайт должен использоваться для привлечения клиентов.

Потенциальный заказчик должен иметь возможность:

- посмотреть направления разработки;
- посмотреть реальные проекты;
- понять примерный уровень стоимости;
- самостоятельно рассчитать ориентировочную стоимость проекта;
- отправить заявку.

---

## 2.3. Personal Brand

Сайт является основой профессионального бренда:

**Danil Kurmayev**

и в будущем может быть связан с экосистемой:

**Dev2Lab**

но Dev2Lab не должен заменять личный бренд владельца.

---

# 3. Основное позиционирование

Основная профессия:

## Fullstack Developer

Допустимое дополнительное позиционирование:

**Fullstack / Product Developer**

В Hero не использовать:

- Junior Developer;
- начинающий разработчик;
- Backend-only Developer;
- Frontend-only Developer.

Ключевое сообщение:

> I design and build modern web applications, APIs and digital products — from idea and architecture to deployment.

Русский вариант:

> Проектирую и разрабатываю современные веб-приложения, API и цифровые продукты — от идеи и архитектуры до deployment.

Немецкий вариант:

> Ich entwickle moderne Webanwendungen, APIs und digitale Produkte – von der Idee und Architektur bis zum Deployment.

---

# 4. Языки сайта

Сайт обязательно мультиязычный.

Поддерживаемые локали:

- 🇩🇪 German — `de`
- 🇬🇧 English — `en`
- 🇷🇺 Russian — `ru`

Основной язык:

`de`

Fallback:

`en`

URL:

```text
/de
/en
/ru
```

Все дополнительные страницы также локализуются:

```text
/de/projects
/en/projects
/ru/projects

/de/projects/dev2lab
/en/projects/dev2lab
/ru/projects/dev2lab
```

Текст внутри React-компонентов напрямую не прописывать.

Все UI-тексты должны поступать из i18n.

Предпочтительная библиотека:

`next-intl`

Выбранная локаль сохраняется.

При переключении языка пользователь остается на той же странице.

Например:

```text
/de/projects/dev2lab
```

переключается на:

```text
/en/projects/dev2lab
```

а не возвращает пользователя на homepage.

---

# 5. Технологический стек

Основной стек проекта:

### Framework

Next.js

App Router.

### Language

TypeScript.

### UI

React.

### Styling

Tailwind CSS.

### Internationalization

next-intl.

### Animation

Motion / Framer Motion.

### Forms

React Hook Form.

### Validation

Zod.

### Icons

Lucide React.

### Images

Next/Image.

### Deployment

Предусмотреть production deployment через:

- Vercel,

или

- Hetzner + Coolify.

Архитектура приложения не должна зависеть от конкретного hosting provider.

---

# 6. Дизайн-концепция

## 6.1. Общий стиль

Стиль:

**Light Professional Technology**

Ассоциации:

- software;
- engineering;
- SaaS;
- architecture;
- modern development;
- спокойная профессиональная уверенность.

Сайт не должен выглядеть:

- как игровой сайт;
- как криптовалютный landing page;
- как шаблон ThemeForest;
- как портфолио студента;
- как неоновый Cyberpunk UI;
- как рекламная посадочная страница агентства.

Ключевое ощущение: взрослый разработчик, который уже
работает, а не демонстрация фронтенд-эффектов.
Много воздуха, спокойный контраст, точечный акцент.

---

# 7. Цветовая система

Основной фон:

​```css
#FAFAF8
​```

Дополнительный фон / поверхности:

​```css
#FFFFFF
​```

Фон карточек:

​```css
#FFFFFF
​```

Elevated surface:

​```css
#F4F4F1
​```

Основной текст:

​```css
#0A0A0A
​```

Secondary text:

​```css
rgba(10,10,10,0.60)
​```

Muted text:

​```css
rgba(10,10,10,0.42)
​```

Borders:

​```css
rgba(10,10,10,0.08)
​```

Primary accent:

фиолетовый диапазон.

Рекомендуемый:

​```css
#6D4AFF
​```

Secondary accent:

​```css
#5638E0
​```

Success:

​```css
#16A34A
​```

Error:

​```css
#DC2626
​```

Акцент применяется точечно: eyebrow, primary CTA,
активная локаль, подчёркнутые ссылки, статус-индикатор.
Не использовать акцент как заливку крупных областей.

Не использовать одновременно большое количество
акцентных цветов.

Главная композиция:

**off-white / white / near-black / violet**

---

# 8. Типографика

Основной шрифт:

## Manrope

Используется для:

- заголовков;
- текста;
- navigation;
- buttons;
- project cards;
- forms;
- UI.

Причина выбора:

- современная технологическая стилистика;
- хорошая читаемость;
- поддержка Latin;
- поддержка German;
- поддержка Cyrillic;
- хорошо выглядит на desktop и mobile.

Использовать через `next/font`.

---

Дополнительный моноширинный шрифт:

## JetBrains Mono

Использовать только для:

- маленьких технических labels;
- code-style элементов;
- project type;
- tags;
- version indicators;
- декоративных developer-элементов.

Не использовать JetBrains Mono для обычных длинных текстов.

---

# 9. Типографическая иерархия

Пример desktop:

### H1

```text
64–80px
font-weight: 700
line-height: 0.95–1.05
```

### H2

```text
40–52px
font-weight: 650–700
```

### H3

```text
24–32px
```

### Body Large

```text
18–20px
```

### Body

```text
16px
```

### Small

```text
14px
```

На mobile размеры должны адаптироваться через `clamp()`.

---

# 10. Layout

Максимальная ширина контента:

```text
1440px
```

Основной внутренний container:

```text
1280–1320px
```

Desktop horizontal padding:

```text
32–48px
```

Mobile:

```text
20–24px
```

Секции должны иметь заметное вертикальное пространство.

Ориентир:

```text
100–160px desktop
72–100px tablet
64–80px mobile
```

Не делать интерфейс чрезмерно плотным.

---

# 11. Header

Header sticky.

На старте может быть прозрачным.

При scroll:

- появляется светлый непрозрачный backdrop;
- легкий blur;
- тонкий bottom border.

Структура desktop:

```text
DK / Danil Kurmayev

About
Projects
Stack
Experience
Services
Contact

DE / EN / RU

Let's Talk
```

Логотип:

```text
DK
```

или стилизованная монограмма.

Рядом:

```text
DANIL KURMAYEV
FULLSTACK DEVELOPER
```

Subtitle допустимо скрывать на небольших desktop-разрешениях.

---

# 12. Mobile Header

На mobile:

- logo;
- language selector;
- hamburger.

Mobile menu fullscreen или large drawer.

В menu:

- About;
- Projects;
- Stack;
- Experience;
- Services;
- Calculator;
- Contact.

Основной CTA:

**Let's Talk**

---

# 13. Hero Section

Hero является главным визуальным блоком.

Высота desktop:

примерно `90–100vh`.

Структура:

```text
TEXT / VISUAL
45%     55%
```

---

## 13.1. Hero content

Eyebrow:

```text
FULLSTACK / PRODUCT DEVELOPER
```

Основной H1 — утверждение о том, что делается,
в две-три строки.

Немецкий вариант:

​```text
Digitale Produkte.
Durchdacht und
vollständig gebaut.
​```

Имя в Hero не является заголовком — оно присутствует
в header и footer. В первом viewport должно быть
понятно, что делает владелец, а не как его зовут.

Технологии выводятся компактными строками с иконками,
не отдельными чипами:

​```text
[icon] React · Next.js · NestJS · PostgreSQL · React Native
[icon] Web Apps · APIs · SaaS · Automation · Deployment
[●]    Verfügbar für ausgewählte Projekte
​```

Основной subtitle:

```text
Fullstack Developer
```

Стек:

```text
React
TypeScript
NestJS
PostgreSQL
React Native
```

---

# 14. Hero CTA

Primary:

```text
View Projects
```

Secondary:

```text
Contact Me
```

Можно добавить tertiary:

Tertiary CTA — подчёркнутая ссылка со стрелкой,
не кнопка:

​```text
Projektkosten unverbindlich berechnen →
​```

Он должен скроллить к калькулятору.

---

# 15. Hero Social Links

Вывести:

- GitHub;
- LinkedIn;
- Email.

Telegram может быть добавлен при необходимости.

Все внешние ссылки открывать корректно.

Добавить accessible labels.

---

# 16. Availability badge

Hero содержит небольшой status card:

```text
● Available for selected projects
```

или:

```text
● Open to interesting projects
```

Статус управляется через config.

Например:

```ts
availability: {
  enabled: true,
  type: 'freelance'
}
```

При `false` компонент должен корректно отображать альтернативный текст либо скрываться.

---

# 17. Hero Visual

Реальная фотография владельца на светлом фоне.

Требования к фотографии:

- нейтральный светлый фон;
- ровный мягкий свет;
- спокойная поза, открытый взгляд;
- деловой casual;
- формат портретный, вертикальный.

Поддержка композиции справа: лёгкая изометрическая
техническая графика линиями, низкий контраст.
Она не должна конкурировать с фотографией
и не должна выглядеть как декоративный сток.

До подключения финальной фотографии использовать
placeholder, сохраняющий пропорции и позицию портрета.
Замена на реальное фото не должна требовать изменения
layout.

---

# 18. About Section

Заголовок:

```text
About Me
```

Секция должна кратко рассказать профессиональную историю.

Не делать огромную автобиографию.

Необходимо упомянуть:

- технический background;
- инженерное образование;
- профессиональное образование Fullstack Development;
- опыт работы с IT;
- современную разработку;
- собственные продукты;
- commercial development;
- Berlin.

---

# 19. About Cards

Рядом с текстом расположить компактные информационные cards.

Например:

### Location

Berlin, Germany.

### Role

Fullstack / Product Developer.

### Focus

Web / SaaS / Automation / AI.

### Languages

German / English / Russian.

### Development

Frontend + Backend.

---

# 20. Technology Stack

Секция:

```text
Tech Stack
```

Не использовать процентные progress bars:

```text
React 97%
Node 91%
```

Такие показатели субъективны и не несут смысла.

Использовать категории.

---

# 21. Frontend Technologies

```text
React
TypeScript
JavaScript
Next.js
Tailwind CSS
HTML
CSS
```

---

# 22. Mobile Technologies

```text
React Native
Expo
```

---

# 23. Backend Technologies

```text
Node.js
NestJS
Express
REST API
WebSocket
```

---

# 24. Databases

```text
PostgreSQL
Prisma
MongoDB
Redis
```

---

# 25. Infrastructure

```text
Docker
Linux
GitHub Actions
CI/CD
Hetzner
Coolify
```

---

# 26. Integrations

```text
OpenAI
Stripe
Firebase
Twilio
DeepL
Telegram API
Google APIs
```

---

# 27. Featured Projects

Проекты являются одной из главных частей сайта.

Homepage должен содержать минимум четыре основных проекта.

---

# 28. Dev2Lab

Тип:

```text
SaaS / Developer Platform
```

Dev2Lab необходимо позиционировать как крупный самостоятельный продукт.

Описание:

платформа для разработчиков, заказчиков и работы с IT-задачами.

Функциональность может включать:

- authentication;
- profiles;
- offers;
- matching;
- jobs;
- external jobs;
- reviews;
- notifications;
- payments;
- disputes;
- messaging;
- automation;
- integrations.

Stack:

```text
React
NestJS
Prisma
PostgreSQL
Redis
Docker
```

Status:

```text
Active Development
```

---

# 29. Italiano Daily

Тип:

```text
EdTech / Telegram Bot / AI
```

Функции:

- daily learning;
- lessons;
- phrases;
- quizzes;
- XP;
- streak;
- TTS;
- pronunciation;
- smart dictionary;
- voice input;
- AI fallback;
- progress tracking.

Stack выводится через данные проекта.

---

# 30. Olidort Bedachungen

Тип:

```text
Commercial Website
```

Этот проект показать как реальный client case.

Ключевые элементы:

- responsive website;
- conversion-oriented UX;
- service architecture;
- calculator;
- contact forms;
- GTM;
- GA4;
- Google Ads tracking;
- SEO;
- cookie consent;
- performance;
- responsive optimization.

Status:

```text
Production
```

---

# 31. Space Burger

Тип:

```text
Brand / Commercial Web Experience
```

Использовать как визуально сильный frontend case.

Показать:

- UI;
- branding;
- responsive layout;
- animations;
- frontend implementation.

---

# 32. Дополнительные проекты

Архитектура должна позволять добавить без изменения UI:

- Project OK;
- Clipper;
- будущие SaaS;
- client projects;
- experiments.

---

# 33. Архитектура данных проектов

Проекты не хранить непосредственно внутри компонентов.

Использовать отдельный data layer.

Например:

```ts
export interface Project {
  slug: string;
  title: string;
  category: string;
  status: 'production' | 'development' | 'concept';
  featured: boolean;
  stack: string[];
  cover: string;
  links?: {
    website?: string;
    github?: string;
  };
}
```

Описание проекта локализуется отдельно либо через translation keys.

---

# 34. Project Card

Каждая карточка содержит:

- cover;
- title;
- category;
- короткое описание;
- stack;
- status;
- CTA.

Пример:

```text
DEV2LAB

Developer Platform

React · NestJS · PostgreSQL

Active Development

View Case Study →
```

Hover:

- slight transform;
- border highlight;
- мягкая тень вместо glow;
- image zoom до 2–4%.

Hover-эффект применяется только к карточкам,
которые действительно кликабельны.

---

# 35. Projects Page

Создать отдельную страницу:

```text
/[locale]/projects
```

Здесь выводятся все проекты.

Предусмотреть фильтрацию в будущем:

```text
All
Fullstack
Frontend
Backend
SaaS
Automation
AI
Commercial
```

На MVP фильтр может быть визуальным без сложной логики либо отсутствовать.

---

# 36. Project Case Studies

Основные проекты должны поддерживать отдельные страницы.

URL:

```text
/[locale]/projects/[slug]
```

Case Study содержит:

```text
Hero

Overview

Problem

Goals

My Role

Solution

Architecture

Technology Stack

Main Features

Challenges

Screenshots

Results

Links
```

До появления реальных screenshots использовать стилизованные placeholders.

---

# 37. Experience Section

Формат:

vertical timeline.

Не выводить всю трудовую биографию за всю жизнь.

Показывать то, что усиливает профессиональное позиционирование.

Основные группы:

### Fullstack Developer / Freelance

текущая разработка собственных и коммерческих продуктов.

### Professional Fullstack Development

профессиональное обучение / qualification.

### Technical / IT Background

более ранний технический опыт.

---

# 38. Education

Отдельная секция или продолжение Experience.

Обязательно предусмотреть:

### Engineering Education

Инженерное высшее образование.

### Fullstack Development

Сертификат / профессиональная qualification по Fullstack-разработке.

Документы на MVP можно представить placeholders.

Реальные scan-файлы подключаются после утверждения сайта.

---

# 39. Certificates

Предусмотреть структуру данных:

```ts
{
  id,
  title,
  issuer,
  year,
  image,
  document
}
```

В UI:

```text
View Certificate
```

На MVP:

placeholder.

После утверждения дизайна заменить на реальные изображения/PDF.

---

# 40. Development Philosophy

Добавить небольшой смысловой блок:

## How I Build

Три или четыре cards.

### Architecture first

Архитектура должна позволять продукту развиваться.

### Product thinking

Код создается для решения реальной задачи.

### Production ready

Deployment, performance и maintainability являются частью разработки.

### Iterative development

Продукт развивается постепенно на основе реального использования.

---

# 41. Services Section

Цель:

объяснить потенциальному заказчику, что можно заказать.

Карточки:

### Web Applications

Современные React / Next.js приложения.

### Fullstack Development

Frontend + Backend + Database.

### Backend & API

NestJS / Node.js API и сервисы.

### SaaS / MVP

Создание MVP и SaaS-продуктов.

### Automation

Bots, integrations, workflows.

### AI Integrations

OpenAI и другие AI-интеграции.

### Existing Project Development

Доработка существующих проектов.

---

# 42. Pricing / Project Cost Calculator

На сайте обязательно реализовать интерактивный калькулятор примерной стоимости проекта.

Основная задача:

дать посетителю возможность самостоятельно получить приблизительную стоимость разработки.

Калькулятор является:

**estimate tool**, а не публичной офертой.

Обязательно отображать disclaimer:

> Расчет является предварительным. Финальная стоимость определяется после уточнения требований и объема проекта.

---

# 43. Источник данных калькулятора

Стоимость и доступные опции **не должны быть захардкожены в UI-компонентах**.

Использовать существующий JSON pricing catalog.

Калькулятор должен работать на основе этого JSON.

Если существующий JSON имеет другую структуру, его необходимо адаптировать через отдельный mapper / adapter, не привязывая UI напрямую к нестабильной структуре файла.

Рекомендуемая архитектура:

```text
pricing.json
      ↓
pricing adapter
      ↓
typed pricing model
      ↓
calculator logic
      ↓
calculator UI
```

---

# 44. Пример pricing schema

Ориентировочная схема:

```json
{
  "categories": [
    {
      "id": "website",
      "labelKey": "pricing.website",
      "basePrice": 800,
      "options": [
        {
          "id": "pages",
          "type": "range",
          "unitPrice": 120
        },
        {
          "id": "cms",
          "type": "boolean",
          "price": 500
        }
      ]
    }
  ]
}
```

Это только interface example.

При наличии уже готового рабочего JSON не переписывать его без необходимости.

---

# 45. Калькулятор — пользовательский flow

Начальный вопрос:

```text
What do you want to build?
```

Тип проекта, например:

- Landing Page;
- Corporate Website;
- Web Application;
- SaaS / MVP;
- Backend / API;
- Telegram Bot;
- Automation;
- Existing Project / Feature.

Следующие параметры зависят от категории.

---

# 46. Возможные параметры калькулятора

### Website

- number of pages;
- design complexity;
- multilingual;
- contact form;
- CMS;
- animation;
- SEO;
- analytics.

### Web Application

- authentication;
- roles;
- dashboard;
- database;
- REST API;
- file upload;
- payments;
- notifications;
- realtime;
- external integrations.

### SaaS

- users;
- subscriptions;
- Stripe;
- dashboard;
- admin panel;
- emails;
- notifications;
- API;
- analytics.

### Telegram Bot

- commands;
- database;
- AI;
- payment;
- scheduling;
- notifications;
- admin tools.

---

# 47. Calculator Result

Результат должен показывать диапазон.

Не:

```text
€7,421.36
```

А:

```text
Estimated project range

€6,500 – €8,500
```

Также можно показать:

```text
Complexity
Medium

Estimated development
4–7 weeks
```

если временные коэффициенты присутствуют в pricing data.

---

# 48. Calculator State

Состояние калькулятора должно быть изолировано.

После reset:

- category сбрасывается;
- options сбрасываются;
- result очищается;
- progress возвращается к началу.

После успешной заявки также должен происходить controlled reset.

---

# 49. Calculator CTA

После расчета:

```text
Discuss this project
```

или:

```text
Send estimate
```

При переходе в contact form автоматически передать:

- category;
- selected options;
- estimated price range.

Пользователь не должен повторно вводить выбранные параметры вручную.

---

# 50. Contact Section

Финальный CTA:

```text
Let's build something useful.
```

DE:

```text
Lassen Sie uns etwas Sinnvolles entwickeln.
```

RU:

```text
Давайте создадим что-нибудь полезное.
```

---

# 51. Contact Form

Поля:

### Required

- Name;
- Email;
- Message;
- Privacy checkbox.

### Optional

- Company;
- Phone;
- Project type;
- Budget.

Если пользователь приходит из calculator:

автоматически добавить информацию о calculation.

---

# 52. Validation

Использовать:

React Hook Form + Zod.

Проверять:

- name;
- email;
- minimum message length;
- consent.

Ошибки локализованы.

После успешной отправки:

- показать success state;
- очистить форму;
- не оставлять старое success-состояние при новой попытке.

---

# 53. Contact Backend

Frontend не должен быть жестко связан с конкретным email provider.

Предусмотреть API route:

```text
/api/contact
```

Через него в будущем можно подключить:

- Resend;
- SMTP;
- Telegram notification;
- CRM;
- database.

Для MVP допустимо использовать mock handler, если backend communication еще не подключается.

---

# 54. GitHub Block

Предусмотреть отдельный небольшой блок GitHub.

На первом этапе данные можно хранить статически.

Позже возможна интеграция GitHub API.

Показывать:

- profile;
- repositories;
- key projects.

Не использовать GitHub contribution chart как обязательный показатель профессионализма.

---

# 55. CV

Предусмотреть CTA:

```text
Download CV
```

CV должен поддерживать разные языки:

```text
cv-danil-kurmayev-de.pdf
cv-danil-kurmayev-en.pdf
```

Русскую версию можно добавить отдельно.

До появления финальных PDF кнопку можно скрыть через config.

---

# 56. Footer

Footer минималистичный.

Содержит:

```text
DK

Danil Kurmayev
Fullstack Developer

Berlin, Germany

GitHub
LinkedIn
Email
```

Navigation:

```text
About
Projects
Services
Contact
```

Legal:

```text
Impressum
Datenschutz
```

Copyright:

```text
© {currentYear} Danil Kurmayev
```

Год генерируется автоматически.

---

# 57. Impressum

Так как сайт ориентирован на Германию и может использоваться для коммерческих freelance-услуг, предусмотреть страницу:

```text
/[locale]/impressum
```

Финальные юридические данные подставляются перед production launch.

На MVP использовать placeholder только в dev/staging, не публиковать фиктивные юридические данные как production information.

---

# 58. Datenschutz

Отдельная страница:

```text
/[locale]/privacy
```

или:

```text
/[locale]/datenschutz
```

Для немецкой версии допустимо использовать `/datenschutz`.

Политика должна учитывать реально подключенные сервисы:

- analytics;
- contact form;
- hosting;
- cookies;
- external APIs.

---

# 59. Cookies

Если подключается GA4, Clarity или другие non-essential tracking services, реализовать consent.

До согласия:

```text
analytics_storage: denied
```

После согласия:

```text
analytics_storage: granted
```

Если используются только технически необходимые cookies, не создавать бессмысленный cookie banner.

---

# 60. Analytics

Архитектура должна предусматривать analytics events.

Рекомендуемые:

```text
navigation_click
language_change
project_open
project_external_click
github_click
linkedin_click
cv_download
calculator_start
calculator_complete
calculator_contact
contact_start
contact_submit
contact_success
```

Event logic вынести в отдельный analytics helper.

Не выполнять прямые `dataLayer.push()` по всему UI.

---

# 61. SEO

Каждая locale должна иметь собственную metadata.

German:

```text
Danil Kurmayev — Fullstack Entwickler | React, Next.js, NestJS
```

English:

```text
Danil Kurmayev — Fullstack Developer | React, Next.js, NestJS
```

Russian:

```text
Данил Курмаев — Fullstack разработчик | React, Next.js, NestJS
```

---

# 62. SEO Requirements

Реализовать:

- title;
- description;
- metadataBase;
- canonical;
- hreflang;
- OpenGraph;
- Twitter Card;
- sitemap;
- robots;
- structured data;
- clean URLs.

---

# 63. Structured Data

Добавить JSON-LD:

### Person

Danil Kurmayev.

### WebSite

Personal Portfolio.

Можно позже добавить:

### ProfessionalService

если сайт активно используется для freelance-business.

Не добавлять schema, не соответствующую фактическому содержимому.

---

# 64. OpenGraph

Предусмотреть динамические OG-data для:

- homepage;
- projects;
- case studies.

До появления реальной фотографии использовать branded graphic placeholder.

---

# 65. Images

Форматы:

- WebP;
- AVIF.

Использовать:

`next/image`.

Hero:

priority.

Остальные:

lazy.

У каждого изображения должны быть:

- width;
- height;
- sizes;
- alt.

---

# 66. Placeholder Policy

До полного утверждения MVP **не использовать финальные личные фотографии и окончательные project assets**, если они еще не подготовлены.

Вместо этого использовать единообразные placeholders.

Placeholder должен сохранять:

- aspect ratio;
- intended composition;
- image position;
- responsive behavior.

После утверждения MVP replacement реальных assets не должен требовать изменения layout.

Это обязательное требование.

---

# 67. Project Assets

Структура:

```text
/public
  /images
    /projects
      /dev2lab
      /italiano-daily
      /olidort
      /space-burger

    /profile
    /certificates
    /og
```

Не хранить изображения внутри `src`.

---

# 68. Animation

Анимация должна помогать интерфейсу.

Разрешены:

- fade;
- reveal;
- small slide;
- stagger;
- card hover;
- мягкая тень при hover;
- border animation;
- сдержанное движение градиента.

---

# 69. Animation Restrictions

Не использовать:

- тяжелый WebGL без необходимости;
- Three.js просто ради эффекта;
- постоянное движение UI;
- 3D card rotation;
- слишком большое количество particles;
- cursor trails;
- intro splash screen;
- loading animation перед показом homepage.

Сайт должен открываться сразу.

---

# 70. Reduced Motion

Обязательно поддерживать:

```css
prefers-reduced-motion
```

Для пользователей, отключивших animation, интерфейс должен оставаться полноценным.

---

# 71. Responsive Design

Mobile-first.

Обязательные проверки:

```text
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Никакого horizontal scrolling.

---

# 72. Mobile Structure

На mobile:

Hero:

```text
Name
Role
Description
CTA
Visual
Social
```

Projects:

одна карточка на row.

Tech stack:

две колонки либо responsive chips.

Experience:

single-column timeline.

Calculator:

step-by-step UI.

Contact:

single column.

---

# 73. Calculator Mobile UX

На mobile калькулятор не должен превращаться в длинную форму из 30 checkbox.

Использовать последовательный flow.

Например:

```text
1 / 5
Project Type
```

далее:

```text
2 / 5
Features
```

Navigation:

```text
Back
Continue
```

Результат показывается отдельным финальным state.

---

# 74. Accessibility

Минимальный target:

WCAG AA.

Необходимо:

- semantic HTML;
- keyboard navigation;
- focus visible;
- aria labels;
- правильная heading hierarchy;
- alt;
- accessible forms;
- достаточный color contrast.

Icon-only buttons обязательно имеют accessible label.

---

# 75. Performance

Ориентиры Lighthouse:

```text
Performance ≥ 90
Accessibility ≥ 95
Best Practices ≥ 95
SEO ≥ 95
```

Желаемый SEO:

`100`.

---

# 76. Core Web Vitals

Следить за:

- LCP;
- CLS;
- INP.

Не создавать CLS из-за:

- fonts;
- Hero image;
- project images;
- animation.

---

# 77. Data Architecture

Контент и UI разделить.

Рекомендуемая структура:

```text
src/
  app/
  components/
  data/
  i18n/
  lib/
  types/
  config/
```

---

# 78. Suggested Application Structure

```text
src/

app/
  [locale]/
    layout.tsx
    page.tsx

    projects/
      page.tsx
      [slug]/
        page.tsx

    impressum/
    datenschutz/

components/

  layout/
    Header
    Footer
    MobileMenu

  sections/
    Hero
    About
    TechStack
    Projects
    Experience
    Education
    Philosophy
    Services
    PricingCalculator
    Contact

  projects/
    ProjectCard
    ProjectHero
    ProjectGallery

  calculator/
    Calculator
    CalculatorStep
    CalculatorResult

  forms/
    ContactForm

  ui/
    Button
    Badge
    Card
    SectionHeading
    Container
    LanguageSwitcher

data/
  projects.ts
  technologies.ts
  experience.ts
  services.ts
  education.ts
  pricing.json

config/
  site.ts
  social.ts

i18n/
  routing.ts
  navigation.ts
  request.ts

lib/
  pricing/
  analytics/
  validation/

types/
```

---

# 79. Component Architecture

Основные UI-компоненты должны быть reusable.

Например:

```text
Button
Container
Card
Badge
SectionHeading
TechBadge
ProjectCard
```

Не создавать компонент ради каждого отдельного `<div>`.

Не создавать огромный `page.tsx` на несколько тысяч строк.

---

# 80. Design Tokens

Цвета, radius, shadows, spacing и typography должны быть централизованы.

Не использовать десятки произвольных значений:

```text
#8A4EFF
#884DFF
#8950FE
```

для почти одинакового violet.

---

# 81. Border Radius

Основные cards:

```text
16–24px
```

Buttons:

```text
10–14px
```

Small chips:

```text
8–10px
```

Не использовать чрезмерно pill-shaped интерфейс для всех компонентов.

---

# 82. Shadows

На светлом UI использовать мягкие короткие тени
низкой непрозрачности в сочетании с тонкой границей.

Не использовать тяжёлые размытые тени и подсветку
акцентным цветом.
---

# 83. Buttons

Основные варианты:

```text
primary
secondary
ghost
```

Primary:

violet accent.

Secondary:

Secondary:

белый фон + видимая граница.

Ghost:

без background.

Все buttons должны иметь:

- hover;
- focus;
- active;
- disabled.

---

# 84. Site Configuration

Общие данные сайта вынести в config.

Например:

```ts
export const siteConfig = {
  name: 'Danil Kurmayev',
  role: 'Fullstack Developer',
  location: 'Berlin, Germany',
  availability: true
}
```

Не дублировать имя, URL и social links в разных компонентах.

---

# 85. Social Configuration

Отдельно:

```ts
github
linkedin
email
telegram
```

Компоненты получают данные из одного источника.

---

# 86. Pricing Logic

Логику стоимости вынести отдельно от presentation.

Запрещено считать:

```ts
price += 500
```

непосредственно внутри JSX handler.

Использовать:

```text
pricing data
+
calculator engine
+
UI
```

Calculation engine должен тестироваться отдельно.

---

# 87. Calculator Calculation Rules

Если JSON содержит:

- basePrice;
- fixed option price;
- multipliers;
- percentage surcharge;
- ranges;

calculator engine должен поддерживать их через нормализованный интерфейс.

Результат округлять до понятной человеку суммы.

Например:

```text
€4,850
```

можно отображать:

```text
approx. €4,500–€5,500
```

в зависимости от принятой бизнес-логики.

---

# 88. Calculator Localization

Pricing JSON не должен обязательно хранить переводы.

Предпочтительно:

```text
id = multilingual
label = translation key
```

Например:

```json
{
  "id": "authentication",
  "labelKey": "calculator.features.authentication"
}
```

Так pricing logic остается независимой от языка.

---

# 89. Error Handling

Предусмотреть:

- 404;
- unavailable project;
- invalid calculator configuration;
- contact submission error;
- image fallback.

Сообщения локализованы.

---

# 90. Loading States

Не использовать skeleton для мгновенно доступного статического контента.

Loading state нужен только там, где действительно есть async operation.

Например:

contact submit.

Button:

```text
Sending...
```

с disabled state.

---

# 91. Security

При подключении contact endpoint:

- server-side validation;
- sanitize input;
- rate limiting;
- anti-spam;
- secrets только через environment variables.

Не хранить private API keys в client bundle.

---

# 92. Environment Variables

Пример:

```text
NEXT_PUBLIC_SITE_URL
RESEND_API_KEY
CONTACT_EMAIL
NEXT_PUBLIC_GTM_ID
```

`.env` не commit.

Создать:

```text
.env.example
```

без секретов.

---

# 93. Browser Support

Поддерживать актуальные версии:

- Chrome;
- Safari;
- Firefox;
- Edge.

Особое внимание:

Safari iOS.

---

# 94. Desktop UX

Основной target desktop:

```text
1440 × 900
```

Но layout должен хорошо работать и на:

```text
1280
1920
```

Контент не должен чрезмерно растягиваться на ultra-wide monitors.

---

# 95. Navigation Behavior

Navigation anchors на homepage должны работать плавно.

Например:

```text
#about
#projects
#stack
#services
#calculator
#contact
```

Если пользователь находится на project page, ссылки должны корректно вести на соответствующую section homepage.

---

# 96. Scroll Offset

Sticky Header не должен перекрывать заголовок секции после anchor navigation.

Использовать `scroll-margin-top`.

---

# 97. Content Tone

Тексты:

- профессиональные;
- уверенные;
- простые;
- без корпоративной воды.

Не писать:

```text
I am passionate about coding and always eager to learn.
```

Основной тон:

```text
I design and build...
I develop...
I create...
I work with...
```

То есть конкретные действия и результат.

---

# 98. German Content

German должен быть полноценной локализацией, а не буквальным Google Translate.

Использовать естественные немецкие формулировки.

Пример:

не:

```text
Ich mache Websites.
```

а:

```text
Ich entwickle moderne Webanwendungen und digitale Produkte.
```

---

# 99. MVP Visual Assets

До утверждения MVP допускаются:

- profile placeholder;
- project cover placeholders;
- certificate placeholders;
- CV placeholder;
- OG placeholder.

При этом все реальные sections, responsive logic и interactions должны быть полностью готовы.

Placeholder означает только отсутствие финального media content.

Он не означает недоделанный UI.

---

# 100. Критерий готовности MVP

MVP считается визуально готовым, когда можно открыть сайт на desktop и mobile и оценить его как практически готовый production-product, даже если вместо реальной фотографии и отдельных screenshots пока используются placeholders.

После визуального утверждения:

- заменить profile image;
- заменить project covers;
- добавить screenshots;
- certificates;
- final CV;
- final legal information.

Layout после этого менять не требуется.

---

# 101. Основная структура Homepage

Итоговый порядок:

```text
HEADER

HERO

ABOUT

TECH STACK

FEATURED PROJECTS

DEVELOPMENT PHILOSOPHY

EXPERIENCE

EDUCATION / CERTIFICATES

SERVICES

PROJECT COST CALCULATOR

CONTACT

FOOTER
```

---

# 102. Возможная визуальная разбивка

Чтобы страница не выглядела как последовательность одинаковых блоков:

Hero:

две колонки.

About:

large text + info cards.

Stack:

technology grid.

Projects:

large visual cards.

Philosophy:

3 cards.

Experience:

timeline.

Education:

split panel.

Services:

cards/grid.

Calculator:

отдельный visual product block.

Contact:

large final CTA.

---

# 103. Calculator Visual Importance

Калькулятор не должен выглядеть как внешний widget.

Он является частью personal portfolio.

По стилю полностью соответствует:

- colors;
- cards;
- typography;
- button system.

Можно визуально выделить его как отдельный mini-product.

Заголовок:

```text
Estimate your project
```

Subtitle:

```text
Get a rough idea of the budget before we talk.
```

---

# 104. Project Status Labels

Использовать ограниченный набор:

```text
Production
Active Development
Commercial
Concept
Internal
```

Status colors централизованы.

---

# 105. Metadata Projects

Каждый Case Study должен поддерживать собственные:

- title;
- description;
- OpenGraph image;
- canonical URL;
- localized metadata.

---

# 106. Coding Standards

TypeScript strict.

Не использовать `any` без объективной причины.

ESLint без errors.

Prettier.

Компоненты небольшие и понятные.

Shared types не дублировать.

---

# 107. Imports

Использовать aliases:

```text
@/components
@/data
@/lib
@/types
```

Избегать:

```text
../../../../components
```

---

# 108. Client Components

Не ставить:

```ts
'use client'
```

на все компоненты.

По умолчанию использовать Server Components.

Client Components только там, где нужны:

- state;
- browser events;
- Motion;
- form interaction;
- calculator;
- language client logic.

---

# 109. SEO Rendering

Основной контент homepage и projects должен быть доступен серверу и поисковым системам.

Не превращать весь сайт в большой client-side SPA.

---

# 110. Final Acceptance Criteria

Проект считается технически готовым, когда выполняются следующие требования:

- Next.js + TypeScript;
- responsive;
- DE / EN / RU;
- German default locale;
- Header;
- Hero;
- About;
- Stack;
- Featured Projects;
- Projects page;
- Case Study architecture;
- Philosophy;
- Experience;
- Education;
- Services;
- working pricing calculator;
- calculation based on external JSON/data;
- Contact section;
- form validation;
- Footer;
- SEO;
- sitemap;
- hreflang;
- OpenGraph;
- responsive images;
- placeholders;
- Accessibility;
- clean architecture;
- no horizontal scroll;
- no TypeScript errors;
- no ESLint errors;
- successful production build.

---

# 111. Главный критерий качества

Через первые 10–15 секунд после открытия сайта посетитель должен получить ответы на четыре вопроса:

### Кто?

**Danil Kurmayev — Fullstack / Product Developer.**

### Что разрабатывает?

**Web applications, backend systems, APIs, SaaS, automation, AI integrations and digital products.**

### Есть ли реальные проекты?

**Да: собственные продукты и коммерческие проекты.**

### Можно ли заказать разработку?

**Да — посмотреть услуги, самостоятельно получить предварительный расчет стоимости и отправить запрос.**

---

# 112. Итоговое восприятие

Сайт не должен оставлять впечатление:

> «Человек закончил курс и сделал себе портфолио».

Сайт должен оставлять впечатление:

> **Это самостоятельный разработчик, который понимает frontend, backend, архитектуру, продукт и production и способен реализовать цифровой продукт целиком.**

Именно это является основным продуктовым, визуальным и техническим критерием всего проекта.