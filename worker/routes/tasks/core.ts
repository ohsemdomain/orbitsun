import { router } from '../../trpc';
import { taskQueries } from './queries';
import { taskMutations } from './mutations';

export const taskRouter = router({
  ...taskQueries,
  ...taskMutations,
});