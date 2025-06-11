import { router } from '../../trpc';
import { dashboardQueries } from './queries';
import { dashboardMutations } from './mutations';

export const dashboardRouter = router({
  ...dashboardQueries,
  ...dashboardMutations,
});