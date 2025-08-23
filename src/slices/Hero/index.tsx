import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Terminal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Bounded from "@/components/Bounded";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 md:py-20 bg-gradient-to-b from-card/30 to-background"
      size="lg"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="terminal-window rounded-lg p-6 mb-8 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                terminal - ~/2t0rlogs
              </span>
            </div>
          </div>

          <div className="text-left font-mono text-sm space-y-2 mb-6">
            <div className="text-accent">$ whoami</div>
            <div className="text-muted-foreground">
              computer-science-enthusiast
            </div>
            <div className="text-accent">$ cat welcome.txt</div>
          </div>

          <div className="text-4xl md:text-6xl font-bold font-mono mb-6 text-accent neon-glow">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-mono">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/logs">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono"
              >
                ./browse_logs.sh
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent/20 font-mono bg-transparent"
            >
              <Terminal className="mr-2 h-4 w-4" />
              tail -f updates.log
            </Button>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
