import { z } from 'zod';

// Common entity schemas
export const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const itemSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number().positive(),
	category: z.string(),
	isActive: z.boolean().default(true),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const contactSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	phone: z.string().optional(),
	company: z.string().optional(),
	address: z.string().optional(),
	notes: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const invoiceSchema = z.object({
	id: z.string(),
	invoiceNumber: z.string(),
	contactId: z.string(),
	amount: z.number().positive(),
	status: z.enum(['draft', 'sent', 'paid', 'overdue']),
	dueDate: z.date(),
	items: z.array(z.object({
		itemId: z.string(),
		quantity: z.number().positive(),
		price: z.number().positive(),
	})),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const purchaseSchema = z.object({
	id: z.string(),
	purchaseNumber: z.string(),
	vendorId: z.string(),
	amount: z.number().positive(),
	status: z.enum(['ordered', 'received', 'invoiced', 'paid']),
	orderDate: z.date(),
	items: z.array(z.object({
		itemId: z.string(),
		quantity: z.number().positive(),
		price: z.number().positive(),
	})),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const taskSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
	priority: z.enum(['low', 'medium', 'high']),
	dueDate: z.date().optional(),
	assignedTo: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Type exports
export type User = z.infer<typeof userSchema>;
export type Item = z.infer<typeof itemSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Purchase = z.infer<typeof purchaseSchema>;
export type Task = z.infer<typeof taskSchema>;

// API Response types
export type PaginatedResponse<T> = {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
};