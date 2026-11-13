import type { ArchitectureLayer } from "@/content/types";

/**
 * Renders a project's architecture as a left-to-right pipeline (top-to-bottom on small screens).
 * Driven entirely by the `architecture` array in the project config.
 */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <ol data-testid="architecture" className="grid gap-4 lg:auto-cols-fr lg:grid-flow-col lg:gap-0">
        {layers.map((layer, i) => (
          <li key={layer.label} className="relative flex flex-col lg:px-3 lg:first:pl-0 lg:last:pr-0">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-faint">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              {layer.label}
              {i < layers.length - 1 ? (
                <span aria-hidden="true" className="hidden h-px flex-1 bg-line-strong lg:block" />
              ) : null}
            </p>
            <ul className="mt-4 flex flex-1 flex-col gap-3">
              {layer.nodes.map((node) => (
                <li key={node.name} className="flex-1 rounded-xl border border-line bg-surface p-5">
                  <p className="font-mono text-[13px] text-fg">{node.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{node.detail}</p>
                </li>
              ))}
            </ul>
            {i < layers.length - 1 ? (
              <span aria-hidden="true" className="mx-auto mt-4 block h-5 w-px bg-line-strong lg:hidden" />
            ) : null}
          </li>
        ))}
    </ol>
  );
}
