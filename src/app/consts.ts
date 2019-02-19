const STAGE1 = {
  stage: 'DEFAULT',
  steps: [],
  isFinal: false,
};
const STAGE2 = {
  stage: 'BUILD&TEST',
  steps: [],
  isFinal: false,
};
const STAGE3 = {
  stage: 'RELEASE',
  steps: [],
  isFinal: true,
};

export const STAGES = [STAGE1, STAGE2, STAGE3];

export const H_M_S = 'h m s';
export const HH_MM_SS = 'hh:mm:ss';
