import type { FC } from 'react';
import { useState } from 'react';
import { trpc } from '../lib/trpc';

export const TRPCDemo: FC = () => {
  const [newItemName, setNewItemName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Fetch items
  const { data: itemsData, isLoading: itemsLoading, error: itemsError } = trpc.item.list.useQuery({
    page: 1,
    limit: 5,
  });

  // Fetch tasks
  const { data: tasksData, isLoading: tasksLoading, error: tasksError } = trpc.task.list.useQuery({
    page: 1,
    limit: 5,
  });

  // Create item mutation
  const createItemMutation = trpc.item.create.useMutation({
    onSuccess: () => {
      setNewItemName('');
      // The cache will be automatically invalidated by our hook
    },
  });

  // Create task mutation
  const createTaskMutation = trpc.task.create.useMutation({
    onSuccess: () => {
      setNewTaskTitle('');
    },
  });

  const handleCreateItem = () => {
    if (!newItemName.trim()) return;
    
    createItemMutation.mutate({
      name: newItemName,
      description: 'Demo item created via tRPC',
      price: Math.floor(Math.random() * 100) + 1,
      category: 'demo',
      isActive: true,
    });
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    
    createTaskMutation.mutate({
      title: newTaskTitle,
      description: 'Demo task created via tRPC',
      status: 'pending',
      priority: 'medium',
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">tRPC Integration Demo</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates the full-stack tRPC integration with type-safe API calls.
        </p>

        {/* Items Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Items API</h3>
          
          {/* Create Item Form */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter item name"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCreateItem}
                disabled={createItemMutation.isPending || !newItemName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {createItemMutation.isPending ? 'Creating...' : 'Create Item'}
              </button>
            </div>
          </div>

          {/* Items List */}
          <div>
            <h4 className="font-medium mb-2">Items List:</h4>
            {itemsLoading && <p className="text-gray-500">Loading items...</p>}
            {itemsError && <p className="text-red-500">Error: {itemsError.message}</p>}
            {itemsData && (
              <div className="space-y-2">
                {itemsData.data.length === 0 ? (
                  <p className="text-gray-500">No items found. Create one above!</p>
                ) : (
                  itemsData.data.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-3 rounded border">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        ${item.price} • {item.category} • {item.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  ))
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Showing {itemsData.data.length} of {itemsData.pagination.total} items
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Tasks API</h3>
          
          {/* Create Task Form */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCreateTask}
                disabled={createTaskMutation.isPending || !newTaskTitle.trim()}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                {createTaskMutation.isPending ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div>
            <h4 className="font-medium mb-2">Tasks List:</h4>
            {tasksLoading && <p className="text-gray-500">Loading tasks...</p>}
            {tasksError && <p className="text-red-500">Error: {tasksError.message}</p>}
            {tasksData && (
              <div className="space-y-2">
                {tasksData.data.length === 0 ? (
                  <p className="text-gray-500">No tasks found. Create one above!</p>
                ) : (
                  tasksData.data.map((task) => (
                    <div key={task.id} className="bg-gray-50 p-3 rounded border">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-600">
                        {task.status} • {task.priority} priority
                      </div>
                    </div>
                  ))
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Showing {tasksData.data.length} of {tasksData.pagination.total} tasks
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};