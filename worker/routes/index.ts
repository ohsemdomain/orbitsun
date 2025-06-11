import { router } from '../trpc';
import { itemRouter } from './items/core';
import { contactRouter } from './contacts/core';
import { taskRouter } from './tasks/core';
import { invoiceRouter } from './invoices/core';
import { purchaseRouter } from './purchases/core';
import { userRouter } from './users/core';
import { authRouter } from './auth/core';
import { dashboardRouter } from './dashboard/core';

export const appRouter = router({
  item: itemRouter,
  contact: contactRouter,
  task: taskRouter,
  invoice: invoiceRouter,
  purchase: purchaseRouter,
  user: userRouter,
  auth: authRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;