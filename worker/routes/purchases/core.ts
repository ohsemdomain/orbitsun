import { router } from '../../trpc';
import { purchaseQueries } from './queries';
import { purchaseMutations } from './mutations';

export const purchaseRouter = router({
  ...purchaseQueries,
  ...purchaseMutations,
});