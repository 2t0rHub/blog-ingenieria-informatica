import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

/**
 * Props for `Logs`.
 */
export type LogsProps = SliceComponentProps<Content.LogsSlice>;

/**
 * Component for "Logs" Slices.
 */
const Logs = async ({ slice }: LogsProps) => {
  const client = createClient();

  const logs = await Promise.all(
    slice.primary.logs.map(async (item) => {
      if (isFilled.contentRelationship(item.log)) {
        return await client.getByID<Content.LogDocument>(item.log.id);
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 md:py-20"
    >
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h2 className="max-w-2xl text-balance text-center text-4xl font-bold font-mono text-accent md:text-6xl mb-6">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="mx-auto max-w-md text-balance text-center text-foreground/70 font-mono">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </div>

      <div className="grid gap-8 md:gap-12">
        {logs.map(
          (log, index) =>
            log && (
              <div
                key={log.id}
                className="terminal-window rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
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

                <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  <div className="col-span-1 flex flex-col justify-center gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-bold font-mono text-accent">
                        <PrismicText field={log.data.heading} />
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70 font-mono">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <PrismicText field={log.data.author} />
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {log.data.publish_date && (
                            <span>
                              {new Date(
                                log.data.publish_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <PrismicText field={log.data.reading_time} />
                        </div>
                      </div>

                      {log.data.tags && log.data.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {log.data.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded border border-accent/20"
                            >
                              #{tag.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/logs/${log.uid}`}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200 font-mono group"
                    >
                      <span className="file-icon">{">"}</span>
                      Read full log
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>

                  <div
                    className={clsx(
                      "col-span-1 md:col-span-1 lg:col-span-2",
                      "bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-4 border border-accent/20",
                      "flex items-center justify-center"
                    )}
                  >
                    <div className="text-center">
                      <div className="text-balance">
                        <PrismicRichText field={log.data.description} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </Bounded>
  );
};

export default Logs;
