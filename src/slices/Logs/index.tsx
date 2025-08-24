import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Calendar, Clock, User, ArrowRight, Power } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      className="py-4 mb-4 md:py-8 "
    >
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h2 className="max-w-2xl text-balance text-center text-4xl font-bold font-mono text-accent md:text-6xl mb-6 neon-glow">
          <PrismicText field={slice.primary.heading} />
          {""}
          <span className="animate-blink">_</span>
        </h2>

        <div className="mx-auto max-w-md text-balance text-center text-foreground/70 font-mono">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {logs.map(
          (log) =>
            log && (
              <Link key={log.uid} href={`/logs/${log.uid}`}>
                <Card className="group hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 border-border/50 hover:border-accent/50 terminal-window relative overflow-hidden cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <div className="w-2 h-2 rounded-full bg-muted"></div>
                          <div className="w-2 h-2 rounded-full bg-muted"></div>
                        </div>
                        <span className="font-mono text-xs">
                          log_{log.uid}.txt
                        </span>
                      </div>
                      <Power className="h-3 w-3 text-accent" />
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mb-2">
                      modified: {log.data.publish_date}
                    </div>
                    <CardTitle className="font-mono group-hover:text-accent transition-colors text-foreground">
                      <PrismicRichText field={log.data.heading} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-muted-foreground leading-relaxed font-mono text-sm">
                      <PrismicRichText field={log.data.description} />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {log.data.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs font-mono bg-accent/20 text-accent border-accent/30"
                        >
                          #{tag.label}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                        <User className="h-3 w-3" />
                        <PrismicRichText
                          field={log.data.author}
                          components={{
                            paragraph: ({ children }) => (
                              <span>root@{children}</span>
                            ),
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                        <Clock className="h-3 w-3" />
                        <PrismicRichText field={log.data.reading_time} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
        )}
      </div>
    </Bounded>
  );
};

export default Logs;
