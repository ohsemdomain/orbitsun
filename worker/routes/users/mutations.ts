import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { userSchema, type User } from '@shared/user';

export const userMutations = {
  create: publicProcedure
    .input(userSchema)
    .mutation(async ({ input }): Promise<User> => {
      // TODO: Implement D1 insert with password hashing
      const newUser: User = {
        id: crypto.randomUUID(),
        ...input,
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      return newUser;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: userSchema.partial(),
    }))
    .mutation(async ({ input: _input }): Promise<User> => {
      // TODO: Implement D1 update
      throw new Error('Not implemented');
    }),

  updateProfile: publicProcedure
    .input(z.object({
      name: z.string().optional(),
      avatar: z.string().optional(),
    }))
    .mutation(async ({ input: _input }): Promise<User> => {
      // TODO: Update current user profile
      throw new Error('Not implemented');
    }),

  changePassword: publicProcedure
    .input(z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8),
    }))
    .mutation(async ({ input: _input }): Promise<{ success: boolean }> => {
      // TODO: Change user password
      return { success: false };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: _input }): Promise<{ success: boolean }> => {
      // TODO: Implement D1 delete (soft delete)
      return { success: false };
    }),

  updateRole: publicProcedure
    .input(z.object({
      userId: z.string(),
      role: z.enum(['admin', 'manager', 'employee', 'client']),
    }))
    .mutation(async ({ input: _input }): Promise<User> => {
      // TODO: Update user role (admin only)
      throw new Error('Not implemented');
    }),
};