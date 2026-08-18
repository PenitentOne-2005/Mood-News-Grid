# News Mood

A web application for viewing real news and rewriting it in various emotional styles.: `happy`, `sad`, `neutral`, `ironic`.

The project's main goal is to change the tone of news delivery, **without altering its actual content**.

## Technologies

- **Next.js 16.3.0**
- **React 19.2.8**
- **TypeScript**
- **PostgreSQL**
- **Prisma 6.19.3**
- **Groq API / groq-sdk 1.5.0**
- ESLint

## Possibilities

- obtaining real news from an open source;
- saving news in PostgreSQL;
- displaying news in a grid layout;
- view original news item;
- link to the original source;
- shifting the emotional tone;
- AI rewriting of the news story;
- automatic verification of fact preservation after rewriting.

## How to launch a project

### 1. Install dependencies

Clone the repository:

git clone https://github.com/PenitentOne-2005/Mood-News-Grid.git

cd news-mood

```bash
npm install
```

### 2. Configure PostgreSQL

The project uses **PostgreSQL** and **Prisma**.

You need to have PostgreSQL running and create a database for the project:

```text
news_mood
```

After that, create a file. `.env` at the root of the project.

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/news_mood?schema=public"
```

`USER`, `PASSWORD` and other PostgreSQL parameters need to be replaced with your own.

### 3. Get Groq API Key & Guardian API Key

A personal API key is required for the AI ​​functionality to work Groq.

1. Sign up at Groq.
2. Open the API Keys section in the Groq console..
3. Create a new one API key.
4. Add it to `.env`:

```env
GROQ_API_KEY="ваш_ключ"
```

### GUARDIAN_API_KEY

The project retrieves real news from The Guardian's public API, so you need to obtain your own API key to run it.

1. Go to the official website The Guardian Open Platform:
   https://open-platform.theguardian.com/access/

2. Sign up or log in to your account.

3. Create an API key to use the Guardian Content API.

4. Add the received key to `.env`:

```env
GUARDIAN_API_KEY=your_guardian_api_key
```

### 4. Install Prisma dependencies and create the database

After configuration `DATABASE_URL` execute:

```bash
npx prisma migrate dev
```

This command will apply Prisma migrations and create the necessary tables in PostgreSQL.

### 5. Launch the application

For development:

```bash
npm run dev
```

After that, the application will be available at the following address:

```text
http://localhost:3000
```

For production:

```bash
npm run build
npm start
```

## Where news comes from

The application works with **real news from an open source**, and not with pre-written test texts.

Each news item is saved along with information about the source, including a link to the original publication.

Thus, the user can open the original material and verify the news source.

## Data storage

Used for storage **PostgreSQL**.

Access to the database is provided via **Prisma ORM**.

The structure of the database is described in:

```text
prisma/schema.prisma
```

Changes to the database structure are formalized through Prisma migrations.

When launching a new environment, it is necessary to apply migrations:

```bash
npx prisma migrate dev
```

This allows another developer to obtain the same database structure without having to create the tables manually.

## How tone rewriting works

The user selects one of four moods:

- `happy`;
- `sad`;
- `neutral`;
- `ironic`.

After the selection is made, the mood is sent to the API:

```text
POST /api/news/mood
```

The following are passed to the request:

```json
{
  "newsId": "id новости",
  "mood": "ironic"
}
```

The server retrieves the original news text from the database and passes it to the AI ​​model along with rewriting instructions.

A model is used:

```text
llama-3.3-70b-versatile
```

AI only changes the way information is presented:

- vocabulary;
- emotional tone;
- sentence rhythm;
- sentence structure;
- stylistic elements.

At the same time, it does not alter the factual information.

## Verification of fact preservation

A separate one is used for monitoring **Fact Validator**.

After generating the rewritten text, the system compares:

```text
ORIGINAL
    ↓
Mood Rewriter
    ↓
REWRITTEN
    ↓
Fact Validator
```

The validator checks, in particular:

- people's names;
- names of organizations;
- companies;
- publications;
- geographical names;
- dates;
- numbers;
- interest;
- sums of money;
- units of measurement;
- quantities;
- sequence of events;
- causes and consequences;
- authorship of the statements;
- degree of confidence in the statements;
- direct quotes;
- absence of new facts;
- absence of significant gaps.

### Additional number verification

In addition to AI verification, the numbers are checked programmatically.

For example, if the original contains:

```text
128 online posts
51.6%
1923
```

These values ​​must be present in the rewritten text.

If the number is missing, the result is considered invalid.

This is an additional layer of protection against AI errors.

## What happens during a validation error

If the Fact Validator detects a violation, the rewritten text is not accepted immediately.

The issues found are passed back to Mood Rewriter:

```text
Original article
      ↓
Mood Rewriter
      ↓
Fact Validator
      ↓
INVALID
      ↓
Issues → Mood Rewriter
      ↓
New rewrite
      ↓
Fact Validator
```

The number of attempts is limited to avoid endless requests to the AI ​​API.

If the text still fails validation after the maximum number of attempts, the API returns an error instead of the potentially incorrect text.

## AI in the project

AI is used for two tasks:

### 1. Mood Rewriter

Responsible for rewriting the news item in a selected emotional style.

### 2. Fact Validator

Checks whether the rewritten text has preserved the factual content of the original news story.

Thus, AI is used not only for generating text but also for subsequently verifying it.

Additionally, critical numerical values ​​are checked using standard program code.

## API

The main endpoint for generating the emotional version:

```text
POST /api/news/mood
```

Example:

```bash
curl -X POST \
  http://localhost:3000/api/news/mood \
  -H "Content-Type: application/json" \
  -d '{
    "newsId": "science/2026/aug/11/mummified-human-remains-trade-health-warning-curse",
    "mood": "ironic"
  }'
```

Expected result:

```json
{
  "valid": false,
  "issues": [
    "The number of online posts examined was changed from 128 to 500.",
    "Numbers missing from rewritten text: 128"
  ]
}
```

## Environment variables

Required variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/news_mood?schema=public"
GROQ_API_KEY="your_groq_api_key"
GUARDIAN_API_KEY="your_guardian_api_key"
GUARDIAN_API_URL="https://content.guardianapis.com/search"
```

Before starting, make sure that:

- PostgreSQL launched;
- `DATABASE_URL` points to an available database;
- Prisma migrations applied;
- `GROQ_API_KEY` is specified correctly;
- `GUARDIAN_API_KEY` is specified correctly;
- `GUARDIAN_API_URL` is specified correctly.

## Scripts

```bash
npm run dev
```

Launching the development server.

```bash
npm run build
```

Production assembly.

```bash
npm start
```

Launching the production server.

```bash
npm run lint
```

ESLint code checking.

## Final architecture of the AI ​​component

```text
Real News
   │
   ▼
PostgreSQL
   │
   ▼
Next.js API
   │
   ▼
Mood Rewriter
   │
   ▼
Rewritten News
   │
   ▼
Fact Validator
   │
   ├── VALID ───────► Return result
   │
   └── INVALID
          │
          ▼
   Validation Issues
          │
          ▼
     Mood Rewriter
```

The project's core principle:

> **AI can change the tone of a text, but it should not alter the facts.**

## Screenshots

### Home Page

![Главная страница](./news-mood/screenshots/home.png)

### List of news items

![Список новостей](./news-mood/screenshots/news.png)

### News page

![Страница новости](./news-mood/screenshots/news-detail-header.png)

![Страница новости](./news-mood/screenshots/news-detail-main.png)

![Страница новости](./news-mood/screenshots/news-detail-footer.png)
