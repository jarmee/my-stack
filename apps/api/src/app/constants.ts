export const API = {
  ENDPOINTS: {
    SKILLS: "skills",
    STACKS: "stacks",
    STACKS_TECHNOLOGIES: (stackId: number | string = ":stackId") =>
      `stacks/${stackId}/technologies`,
  },
};
