const STEP_COMPLETE = 'step/complete';
const STEP_PARTIAL = 'step/partial';
const STEP_INITIAL = 'step/initial';
const STEP_CLEAR = 'step/clear';

export const STATUS = {
  complete: 'complete',
  partial: 'partial'
};

export default function reducer(state = {}, action = {}) {
  const { type, step, data } = action;
  switch (type) {
    case STEP_COMPLETE:
      return Object.assign({}, state, {
        [step]: STATUS.complete
      });
    case STEP_PARTIAL:
      return Object.assign({}, state, {
        [step]: STATUS.partial
      });
    case STEP_CLEAR:
      return Object.assign({}, state, {
        [step]: void 0
      });
    case STEP_INITIAL:
      return data;
    default:
      return state;
  }
};
