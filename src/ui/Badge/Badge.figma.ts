// url=https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=265-9281
// component=Badge

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Property 1") === "high") {
  template = {
    id: "Badge",
    imports: ["import { Badge } from './Badge';"],
    example: figma.code`<Badge tone="green" soft>
            High impact
        </Badge>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Property 1") === "medium impact"
) {
  template = {
    id: "Badge",
    imports: ["import { Badge } from './Badge';"],
    example: figma.code`<Badge tone="yellow" soft>
            Medium impact
        </Badge>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Property 1") === "low impact"
) {
  template = {
    id: "Badge",
    imports: ["import { Badge } from './Badge';"],
    example: figma.code`<Badge tone="neutral">Low impact</Badge>`,
  }
} else {
  template = {
    id: "Badge",
    imports: ["import { Badge } from './Badge';"],
    example: figma.code`<Badge tone="neutral">Low impact</Badge>`,
  }
}

export default template
