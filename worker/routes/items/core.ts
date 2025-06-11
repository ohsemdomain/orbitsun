import { router } from '../../trpc';
import { itemQueries } from './queries';
import { itemMutations } from './mutations';

export const itemRouter = router({
  ...itemQueries,
  ...itemMutations,
});