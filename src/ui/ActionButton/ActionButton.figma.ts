// url=https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=265-9308
// component=ActionButton

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (
  figma.selectedInstance.getPropertyValue("Property 1") === "Schedule a sync"
) {
  template = {
    id: "ActionButton",
    imports: ["import { ActionButton } from './ActionButton';"],
    example: figma.code`<ActionButton variant="primary">Schedule a sync</ActionButton>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Property 1") === "Reduce scope"
) {
  template = {
    id: "ActionButton",
    imports: ["import { ActionButton } from './ActionButton';"],
    example: figma.code`<ActionButton variant="neutral">Reduce scope</ActionButton>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue("Property 1") ===
  "Move to next sprint"
) {
  template = {
    id: "ActionButton",
    imports: ["import { ActionButton } from './ActionButton';"],
    example: figma.code`<ActionButton variant="neutral">Move to next sprint</ActionButton>`,
  }
} else {
  template = {
    id: "ActionButton",
    imports: ["import { ActionButton } from './ActionButton';"],
    example: figma.code`<ActionButton variant="neutral">Move to next sprint</ActionButton>`,
  }
}

export default template
