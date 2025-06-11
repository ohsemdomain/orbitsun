import { trpc } from '../../trpc';

// Hook for fetching tasks with pagination and filters
export const useTasks = (params: {
  page?: number;
  limit?: number;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high';
} = {}) => {
  return trpc.task.list.useQuery({
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    status: params.status,
    priority: params.priority,
  });
};

// Hook for fetching a single task
export const useTask = (id: string) => {
  return trpc.task.get.useQuery(
    { id },
    {
      enabled: !!id,
    }
  );
};

// Hook for creating tasks
export const useCreateTask = () => {
  const utils = trpc.useUtils();
  
  return trpc.task.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch tasks list
      utils.task.list.invalidate();
    },
  });
};

// Hook for updating tasks
export const useUpdateTask = () => {
  const utils = trpc.useUtils();
  
  return trpc.task.update.useMutation({
    onSuccess: (updatedTask) => {
      // Update the specific task in the cache
      utils.task.get.setData({ id: updatedTask.id }, updatedTask);
      // Invalidate the list to ensure consistency
      utils.task.list.invalidate();
    },
  });
};