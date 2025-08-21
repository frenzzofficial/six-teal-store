import SEO from "@/libs/seo/seo.homepage";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { Themes } from "@/libs/configs/config.styles";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const seoTitle = SEO.title?.toString().split(" | ")[0] || "Six Teal Store";
    const seoDesc =
      SEO.openGraph?.description?.toString().split(" | ")[1] ||
      "an ecommerce platform focused on six category and high class products.";
    const seoAuthor =
      SEO.openGraph?.siteName?.toString().split(" | ")[0] || "@vivekcsein";

    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || seoTitle;
    const subtitle = searchParams.get("subtitle") || seoDesc;
    const author = searchParams.get("author") || seoAuthor;
    const theme = searchParams.get("theme") || "royal";

    const currentTheme = Themes[theme as keyof typeof Themes] || Themes.royal;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: currentTheme.bg,
            fontFamily: "Georgia, serif",
            position: "relative",
            padding: "80px",
          }}
        >
          {/* Decorative border */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              border: `2px solid ${currentTheme.border}`,
              borderRadius: "20px",
            }}
          />

          {/* Decorative corner elements */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "60px",
              width: "40px",
              height: "40px",
              border: `3px solid ${currentTheme.accent}`,
              borderRight: "none",
              borderBottom: "none",
              borderRadius: "8px 0 0 0",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "60px",
              width: "40px",
              height: "40px",
              border: `3px solid ${currentTheme.accent}`,
              borderLeft: "none",
              borderBottom: "none",
              borderRadius: "0 8px 0 0",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "60px",
              width: "40px",
              height: "40px",
              border: `3px solid ${currentTheme.accent}`,
              borderRight: "none",
              borderTop: "none",
              borderRadius: "0 0 0 8px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              right: "60px",
              width: "40px",
              height: "40px",
              border: `3px solid ${currentTheme.accent}`,
              borderLeft: "none",
              borderTop: "none",
              borderRadius: "0 0 8px 0",
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: "900px",
              zIndex: 1,
            }}
          >
            {/* Main title */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "bold",
                color: currentTheme.text,
                margin: "0 0 30px 0",
                lineHeight: "1.1",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>

            {/* Decorative divider */}
            <div
              style={{
                width: "120px",
                height: "4px",
                background: currentTheme.accent,
                margin: "0 0 30px 0",
                borderRadius: "2px",
              }}
            />

            {/* Subtitle */}
            <p
              style={{
                fontSize: "32px",
                color: currentTheme.accent,
                margin: "0 0 40px 0",
                fontStyle: "italic",
                lineHeight: "1.3",
                opacity: 0.9,
              }}
            >
              {subtitle}
            </p>

            {/* Author/Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "24px",
                color: currentTheme.text,
                opacity: 0.8,
                fontWeight: "500",
                letterSpacing: "0.05em",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "2px",
                  background: currentTheme.accent,
                  marginRight: "15px",
                }}
              />
              {author?.toString().split(" | ")[0]}
              <div
                style={{
                  width: "30px",
                  height: "2px",
                  background: currentTheme.accent,
                  marginLeft: "15px",
                }}
              />
            </div>
          </div>

          {/* Subtle pattern overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: unknown) {
    console.error(error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
