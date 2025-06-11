import { router } from '../../trpc';
import { invoiceQueries } from './queries';
import { invoiceMutations } from './mutations';

export const invoiceRouter = router({
  ...invoiceQueries,
  ...invoiceMutations,
});