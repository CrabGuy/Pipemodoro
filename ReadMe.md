# Pipemodoro 🍅

Pipemodoro is a minimalist, pipeline-friendly Pomodoro-style timer built with Svelte 5 (SvelteKit) and Supabase. It is designed to sit in the middle of your workflows, letting you create timers programmatically and trigger webhooks when they complete.

- Create labels, each with its own webhook URL
- Start timers via `curl` or any HTTP client from anywhere in your pipeline
- Run arbitrary operations when a timer ends (CI steps, webhooks, scripts, notifications)
- Keep timers in sync across devices using the same account
- Self-host everything for maximum privacy

The application focuses on a solid, minimal core that still enables complex interactions through webhooks and your own scripts.

---

## Features

- **Pipeline-oriented timers**: Create and control timers via HTTP, so they plug naturally into shell scripts, CI jobs, and other automated workflows.
- **Label-based webhooks**: Attach a webhook to each label; when a timer ends, Pipemodoro calls the corresponding endpoint.
- **Sync across devices**: Timers are stored in Supabase and stay synced across all clients logged into the same account.
- **Minimalist UI**: Clean, distraction-free interface focused on timing and labels, not clutter.
- **Open source and self-hostable**: Run the full stack locally or deploy with your own Supabase instance for full data control and privacy.

---

## Live app

You can use Pipemodoro directly in the browser:

> **Website:** `https://pipemodoro-url.example`  

---

## Quick start

You can either use the hosted version (fastest) or run everything locally with your own Supabase project.

### Option 1: Use the hosted app

1. Open the website (see **Live app** above).
2. Create an account or sign in.
3. You’re ready to go — follow the docs when you want to wire it into your pipelines.

### Option 2: Run locally with your own Supabase

1. **Clone the repository**

   ```bash
   git clone https://github.com/CrabGuy/Pipemodoro.git
   cd Pipemodoro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   - Create a new Supabase project (hosted or self-hosted).
   - Copy `.env.example` to `.env` and fill in the Supabase keys and URLs from your project settings.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` (or whatever it tells you) in your browser to access Pipemodoro.

---

## Documentation

Full documentation, including API reference, `curl` examples, deployment instructions, and Supabase schema details, is available at:

> **Docs:** `https://pipemodoro-docs-url.example`

---

## Privacy and self-hosting

Pipemodoro is entirely open source. You can:

- Run it locally for personal use.
- Deploy it with your own Supabase database (hosted or self-hosted) for complete control over your data and webhooks.
- Integrate it into existing infrastructure as a small but mighty building block in your automation pipelines.

---

## Additional information

- This project has been made for the web development exam at the University of Pisa
- It has been developed following the pomodoro technique (a sort of recursive pomodoro if you will)
- It has been developed by listening to [this song](https://youtu.be/Fd_Ei6pxpbA?si=vuPZxq8ngztWsA3F) on repeat during the whole development (low cortisol all around)

---

## License

Pipemodoro is released under the **MIT License**. See the `LICENSE` file for details.