import { router } from '../../trpc';
import { contactQueries } from './queries';
import { contactMutations } from './mutations';

export const contactRouter = router({
  ...contactQueries,
  ...contactMutations,
});