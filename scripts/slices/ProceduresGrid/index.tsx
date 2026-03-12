import { SliceComponentProps } from "@prismicio/react";

export type ProceduresGridProps = SliceComponentProps<any>;

export default function ProceduresGrid({ slice }: ProceduresGridProps) {
  return (
    <section>
      <h2>{slice.name} component needs to be built!</h2>
    </section>
  );
}
