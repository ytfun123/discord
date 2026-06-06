# Chillcord

Warning: this is not the real Discord and is not intended to copy the real Discord.

Chillcord is a small realtime chat app with account signup, global chat, and friend direct messages.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## What was fixed

The old version stored every account, friend, and message only in each browser's `localStorage`. That made global chat local to one browser and made friend lookup fail unless both accounts were created in the same browser.

This version adds a Node/Express + Socket.IO backend:

- users are shared through the server
- adding friends by username works across browsers/devices connected to the same server
- global chat messages are broadcast in realtime
- direct messages are stored per friend conversation
- messages and users persist to `data/db.json` on the server

If the backend is not running, the page still falls back to local demo storage so the UI remains usable.

## Deploy

Deploy this as a Node app, not just a static GitHub Pages site. Services like Render, Railway, Fly.io, or a VPS can run it with:

```bash
npm install
npm start
```

Set the start command to `npm start`. Most hosts will provide the `PORT` environment variable automatically.
