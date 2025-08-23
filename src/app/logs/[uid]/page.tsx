import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicText, SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { Calendar, Clock, User, Tag } from "lucide-react";
import { asText } from "@prismicio/client";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const log = (await (client as any)
    .getByUID("log", uid)
    .catch(() => notFound())) as any;

  return (
    <Bounded as="article" className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="terminal-window rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                log - ~/2t0rlogs/{log.uid}
              </span>
            </div>
          </div>

          {/* Log Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-accent mb-6">
              <PrismicText field={log.data.heading} />
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/70 font-mono mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <PrismicText field={log.data.author} />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {log.data.publish_date && (
                  <span>
                    {new Date(log.data.publish_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <PrismicText field={log.data.reading_time} />
              </div>
            </div>

            {/* Tags */}
            {log.data.tags && log.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {log.data.tags.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-mono bg-accent/10 text-accent rounded-full border border-accent/20 flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />#{tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Log Content */}
          <div className="[&_h1]:!text-4xl [&_h1]:!font-bold [&_h1]:!text-accent [&_h1]:!mb-6 [&_h1]:!mt-8 [&_h1]:!font-mono [&_h2]:!text-3xl [&_h2]:!font-bold [&_h2]:!text-accent [&_h2]:!mb-4 [&_h2]:!mt-6 [&_h2]:!font-mono [&_h3]:!text-2xl [&_h3]:!font-bold [&_h3]:!text-accent [&_h3]:!mb-3 [&_h3]:!mt-5 [&_h3]:!font-mono [&_h4]:!text-xl [&_h4]:!font-bold [&_h4]:!text-accent [&_h4]:!mb-2 [&_h4]:!mt-4 [&_h4]:!font-mono [&_h5]:!text-lg [&_h5]:!font-bold [&_h5]:!text-accent [&_h5]:!mb-2 [&_h5]:!mt-3 [&_h5]:!font-mono [&_h6]:!text-base [&_h6]:!font-bold [&_h6]:!text-accent [&_h6]:!mb-1 [&_h6]:!mt-2 [&_h6]:!font-mono [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:font-mono [&_a]:text-accent [&_a]:no-underline [&_a:hover]:underline [&_strong]:text-accent [&_code]:text-accent [&_code]:bg-accent/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono">
            <SliceZone slices={log.data.slices} components={components} />
          </div>
        </div>
      </div>
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const log = (await (client as any)
    .getByUID("log", uid)
    .catch(() => notFound())) as any;

  const heading = asText(log.data.heading) || "Log";
  const author = asText(log.data.author) || "Unknown Author";

  return {
    title: `${heading} | 2t0rlogs`,
    description: `Read ${heading} by ${author} on 2t0rlogs`,
    openGraph: {
      title: heading,
      description: `Read ${heading} by ${author} on 2t0rlogs`,
      type: "article",
      publishedTime: log.data.publish_date || undefined,
      authors: [author],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const logs = await (client as any).getAllByType("log");

  return logs.map((log: any) => {
    return { uid: log.uid };
  });
}
