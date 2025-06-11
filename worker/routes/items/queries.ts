import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import type { Item } from '@shared/item';
import type { PaginatedResponse } from '@shared/common';

export const itemQueries = {
  list: publicProcedure

};