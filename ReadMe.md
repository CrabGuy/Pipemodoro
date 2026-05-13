# Pipemodoro 🍅

**Pipemodoro** is a **minimalist pomodoro timer web application**. It is designed to help you focus on what you need to get done and, if you want, sit in the middle of a **pipeline of operations**!

---

## Features

Pipe**modoro**:
- **Timers**: Create and control timers
- **Labels**: Create labels to track how much time you spend on each task

**Pipe**modoro:
- **More timers**: Start and stop timers via HTTP, so you can plug them in automated workflows
- **More labels**: Attach webhooks to labels so when a timer ends you can run the next operation

Account:

- You can choose whether to create an account or not, but if you do timers will sync across devices with the same account!

---

## Quick start

You can use Pipemodoro directly in the browser:

> **Website:** `https://crabguy.github.io/Pipemodoro/`  

---

## Run locally

You want to have all of the features with complete control over your data? in 2026?

Here you go:

1. **Clone the repository**

   ```bash
   git clone https://github.com/CrabGuy/Pipemodoro.git
   cd Pipemodoro
   ```

2. **Navigate to the web app folder and install dependencies**

   ```bash
   cd apps/web
   npm install
   ```

3. **Optional: Configure environment**
If you wanna use your own supabase database instead of mine:
   - Create a new Supabase project (hosted or self-hosted).
   - Change the values in the `.env` to your own.
   - If you want to run webhooks on timer completion also setup the chron jobs in [here](./services/)

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` (or whatever it tells you) in your browser to access your custom Pipemodoro.

---

## Documentation

For more information on how to use HTTP requests to modify timers or labels, database schema details or additional information on how to do things:

> **Documentation:** `https://crabguy.github.io/Pipemodoro/docs`

---

## Core design values

- **Privacy and freedom**: everything in the tech stack is open source so you can build or do anything you want freely
- **Minimalism**: no bloat, core features that just work, nothing more, nothing less
- **Modularity**: plug the system wherever you wish

## Additional information

- This project has been made for a web development exam at the University of Pisa
- It has been developed following the pomodoro technique (a sort of recursive pomodoro if you will)
- It has been developed by listening to [this song](https://youtu.be/Fd_Ei6pxpbA?si=vuPZxq8ngztWsA3F) on repeat during the whole development (low cortisol all around)

---

## License

Pipemodoro is released under the **MIT License**. See the `LICENSE` file for details.