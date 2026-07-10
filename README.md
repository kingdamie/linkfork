# LinkFork

One smart link, every platform. Share a single URL (`/go`) and LinkFork redirects each visitor to the right destination based on their device — the App Store for Apple users, Google Play for Android users, and a fallback website for everyone else.

## How it works

The route handler at [`app/go/route.ts`](app/go/route.ts) reads the visitor's `User-Agent` header on the server and issues a `307 Temporary Redirect`:

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

   Open [http://localhost:3000](http://localhost:3000) for the landing page, or hit [http://localhost:3000/go](http://localhost:3000/go) directly.

## Testing the redirects

Your desktop browser will always be sent to `FALLBACK_URL` (or `APPLE_URL` on a Mac). To test the mobile paths, spoof the user agent with Chrome DevTools device emulation:

1. Open [http://localhost:3000](http://localhost:3000) in Chrome.
2. Open DevTools (`F12` or `Ctrl+Shift+I`) and click the **Toggle device toolbar** icon (`Ctrl+Shift+M`).
3. In the device dropdown at the top of the viewport, pick **iPhone 14 Pro** (or any iPhone/iPad).
4. Click **Try it** — you should land on your `APPLE_URL`.
5. Go back, switch the device to **Pixel 7** (or any Android device), and click **Try it** again — you should land on your `ANDROID_URL`.
6. Turn the device toolbar off and click **Try it** once more to confirm the fallback (on Windows/Linux).

> Emulation only affects new requests, so always navigate again after switching devices. You can also test from a terminal:
>
> ```bash
> curl -sI -A "Mozilla/5.0 (Linux; Android 14; Pixel 8)" http://localhost:3000/go | grep -i location
> ```

## Deploying to Vercel

1. Push the repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository, and keep the default Next.js settings.
3. Under **Environment Variables**, add `APPLE_URL`, `ANDROID_URL`, and `FALLBACK_URL` with your real destinations.
4. Click **Deploy**. Your shareable link is `https://<your-project>.vercel.app/go`.

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
