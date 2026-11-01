// url=https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=275-4249
// component=Badge

import figma from "figma"

export default {
  id: "Badge",
  imports: ["import { Badge } from './Badge';"],
  example: figma.code`<Badge tone="green" soft>
            ✓ Recommended
        </Badge>`,
}
