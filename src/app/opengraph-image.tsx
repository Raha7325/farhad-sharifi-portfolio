import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name.first} ${profile.name.last} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(150deg, #0a0a0b 0%, #101310 60%, #0c1a11 100%)",
          color: "#f1efe9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#58f08c" }}>
          PORTFOLIO — {profile.title.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 130, fontWeight: 700, letterSpacing: -4, color: "#f1efe9" }}>
            {profile.name.first}
          </div>
          <div style={{ fontSize: 130, letterSpacing: -2, color: "#58f08c", fontStyle: "italic" }}>
            {profile.name.last}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#f1efe955" }}>
          Technology · Leadership · Craft
        </div>
      </div>
    ),
    size,
  );
}
