import { router } from '../../trpc';
import { userQueries } from './queries';
import { userMutations } from './mutations';

export const userRouter = router({
  ...userQueries,
  ...userMutations,
});