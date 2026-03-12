import { SliceComponentProps } from "@prismicio/react";

export type DoctorsGridProps = SliceComponentProps<any>;

export default function DoctorsGrid({ slice }: DoctorsGridProps) {
  return (
    <section>
      <h2>{slice.name} component needs to be built!</h2>
    </section>
  );
}
