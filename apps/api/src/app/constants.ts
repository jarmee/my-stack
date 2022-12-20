export const API = {
  ENDPOINTS: {
    STACKS: 'stacks',
    STACKS_TECHNOLOGIES: (stackId: number | string = ':stackId') =>
      `stacks/${stackId}/technologies`,
    BUILD_INFO: 'build-info',
  },
};
