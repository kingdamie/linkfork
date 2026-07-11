import { NextResponse } from "next/server";
import { headers } from "next/headers";

const APPLE_URL =
  process.env.APPLE_URL ?? "https://apps.apple.com/ng/app/conzo-africa/id6761756197";
const ANDROID_URL =
  process.env.ANDROID_URL ??
  "https://play.google.com/store/apps/details?id=com.conzo.app";
const FALLBACK_URL = process.env.FALLBACK_URL ?? "https://www.conzo.africa/";

function pickDestination(userAgent: string): string {
  if (/android/i.test(userAgent)) {
    return ANDROID_URL;
  }
  if (/iphone|ipad|ipod|macintosh|mac os x/i.test(userAgent)) {
    return APPLE_URL;
  }
  return FALLBACK_URL;
}

export async function GET() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";

  return NextResponse.redirect(pickDestination(userAgent), 307);
}
