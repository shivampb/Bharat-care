import { SliceComponentProps } from "@prismicio/react";

export type HospitalsGridProps = SliceComponentProps<any>;

export default function HospitalsGrid({ slice }: HospitalsGridProps) {
  return (
    <section>
      <h2>{slice.name} component needs to be built!</h2>
    </section>
  );
}
