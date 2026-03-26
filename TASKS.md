# Project outline
## Frontend
- [Svelte](https://svelte.dev/)
- [Inter font](https://fonts.google.com/specimen/Inter)
- [rosepine dawn color theme](https://rosepinetheme.com/palette/)
- [material design 3 for svelte](https://kendell.dev/m3-svelte/)
- [ ] Mockup
- [ ] Divide mockup in smaller pieces and add more tasks here
- [ ] Add labels
## Backend
- [Supabase](https://supabase.com/docs)
- [x] Read supabase/cloudflare documentation and decide which to use
- [ ] Set up the database for this project
- [ ] Set up authentication
## FaaS
- [ ] Make the website accept HTTP requests that modify the database
- [ ] Allow POST request to create new timers, pause or resume
- [ ] Allow DELETE request to cancel timers
- [ ] Setup webhook calls on timer end
## Linking between Frontend and backend
- Publisher subscriber model (similar to messaging service)
- All the frontend does is sending HTTP requests to itself (the website)
- [ ] Make the frontend reflect changes of the backend
