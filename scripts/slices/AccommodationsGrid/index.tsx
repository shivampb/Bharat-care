import { SliceComponentProps } from "@prismicio/react";

export type AccommodationsGridProps = SliceComponentProps<any>;

export default function AccommodationsGrid({ slice }: AccommodationsGridProps) {
  return (
    <section>
      <h2>{slice.name} component needs to be built!</h2>
    </section>
  );
}
