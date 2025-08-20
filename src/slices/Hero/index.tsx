import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex  flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 via-blue-600 to-blue-300">
        <div className="text-balance text-5xl font-bold mb-8">
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <PrismicRichText field={slice.primary.body} />
      </div>
    </section>
  );
};

export default Hero;
