import { router } from '../../trpc';
import { authQueries } from './queries';
import { authMutations } from './mutations';

export const authRouter = router({
  ...authQueries,
  ...authMutations,
});