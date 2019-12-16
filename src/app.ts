import './global.yunyou';

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      yunyou.error(err.message);
    },
  },
};
