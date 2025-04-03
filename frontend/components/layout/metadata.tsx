import { Metadata } from "next"

interface MetadataProps {
  title: string
  description: string
  openGraph?: {
    title?: string
    description?: string
    images?: string[]
  }
}

export function generateMetadata({
  title,
  description,
  openGraph,
}: MetadataProps): Metadata {
  return {
    title: `${title} | MoscowQA`,
    description,
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      images: openGraph?.images || ["/og-image.jpg"],
      type: "website",
      locale: "ru_RU",
      siteName: "MoscowQA",
    },
    twitter: {
      card: "summary_large_image",
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      images: openGraph?.images || ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-site-verification",
      yandex: "your-yandex-verification",
    },
  }
} 