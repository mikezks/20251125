import { LazyFeatures } from '@flight-demo/shared/ai';


export const lazyFeatures: LazyFeatures = {
  booking: () => import('@flight-demo/domain/booking'),
  checkin: () => import('@flight-demo/domain/checkin'),
  boarding: () => import('@flight-demo/domain/boarding')
};
