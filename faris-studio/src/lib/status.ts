import type { ProjectStatus } from "@/content/types";

export const statusLabel: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  prototype: "Prototype",
  "in-progress": "In progress",
};
