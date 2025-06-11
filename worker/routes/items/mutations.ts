import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { itemSchema, type Item } from '@shared/item';

export const itemMutations = {
  create: publicProcedure

    }),

  update: publicProcedure

};