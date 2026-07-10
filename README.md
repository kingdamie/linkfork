# LinkFork

One smart link, every platform. Share the site URL itself and LinkFork redirects each visitor to the right destination based on their device — the App Store for Apple users, Google Play for Android users, and a fallback website for everyone else. There is no landing page: every visit redirects immediately.

## How it works

The route handler at [`app/route.ts`](app/route.ts) reads the visitor's `User-Agent` header on the server and issues a `307 Temporary Redirect`. It handles the root URL (`/`), and `/go` is kept as an alias so either link works:

| Device | Matched by | Destination |
| --- | --- | --- |
| Android phone/tablet | `android` | `ANDROID_URL` |
| iPhone, iPad, iPod, Mac | `iphone`, `ipad`, `ipod`, `macintosh`, `mac os x` | `APPLE_URL` |
| Everything else (Windows, Linux, bots) | — | `FALLBACK_URL` |

Android is checked first, then Apple; anything that matches neither gets the fallback. The redirect is temporary (307), so browsers and crawlers won't cache it — you can change the destination URLs at any time.

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the example env file and fill in your real URLs:

   ```bash
   cp .env.local.example .env.local
   ```

   ```dotenv
   APPLE_URL=https://apps.apple.com/your-app-link
   ANDROID_URL=https://play.google.com/store/apps/details?id=your.app
   FALLBACK_URL=https://your-website.com
   ```

   All three are optional — placeholder defaults are used for any that are missing.

3. Start the dev server:

   ```bash
   pnpm dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) — you'll be redirected straight to the destination for your device.

## Testing the redirects

Your desktop browser will always be sent to `FALLBACK_URL` (or `APPLE_URL` on a Mac). To test the mobile paths, spoof the user agent with Chrome DevTools device emulation:

1. Open a new tab in Chrome, open DevTools (`F12` or `Ctrl+Shift+I`), and click the **Toggle device toolbar** icon (`Ctrl+Shift+M`).
2. In the device dropdown at the top of the viewport, pick **iPhone 14 Pro** (or any iPhone/iPad).
3. Navigate to [http://localhost:3000](http://localhost:3000) — you should land on your `APPLE_URL`.
4. Switch the device to **Pixel 7** (or any Android device) and navigate to it again — you should land on your `ANDROID_URL`.
5. Turn the device toolbar off and visit once more to confirm the fallback (on Windows/Linux).

> Emulation only affects new requests, so always re-navigate after switching devices (use the address bar — the redirect will have taken you off the page). You can also test from a terminal:
>
> ```bash
> curl -sI -A "Mozilla/5.0 (Linux; Android 14; Pixel 8)" http://localhost:3000 | grep -i location
> ```

## Deploying to Vercel

1. Push the repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository, and keep the default Next.js settings.
3. Under **Environment Variables**, add `APPLE_URL`, `ANDROID_URL`, and `FALLBACK_URL` with your real destinations.
4. Click **Deploy**. Your shareable link is `https://<your-project>.vercel.app` (or `/go` — both redirect).

Alternatively, from the CLI:

```bash
npm i -g vercel
vercel          # first deploy, follow the prompts
vercel env add APPLE_URL
vercel env add ANDROID_URL
vercel env add FALLBACK_URL
vercel --prod
```

Changing an environment variable later requires a redeploy for it to take effect.
