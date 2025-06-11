import { trpc } from '../../trpc';

// Hook for fetching contacts with pagination and search
export const useContacts = (params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) => {
  return trpc.contact.list.useQuery({
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search,
  });
};

// Hook for fetching a single contact
export const useContact = (id: string) => {
  return trpc.contact.get.useQuery(
    { id },
    {
      enabled: !!id,
    }
  );
};

// Hook for creating contacts
export const useCreateContact = () => {
  const utils = trpc.useUtils();
  
  return trpc.contact.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch contacts list
      utils.contact.list.invalidate();
    },
  });
};