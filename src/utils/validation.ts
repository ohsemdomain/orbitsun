import type { z } from 'zod';

/**
 * Type for form field errors
 */
export type FormErrors = Record<string, string[]>;

/**
 * Format Zod validation errors for form display
 */
export const formatZodErrors = (error: z.ZodError): FormErrors => {
  const formatted: FormErrors = {};
  
  for (const err of error.errors) {
    const path = err.path.join('.');
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(err.message);
  }
  
  return formatted;
};

/**
 * Get first error message for a field
 */
export const getFieldError = (errors: FormErrors, field: string): string | undefined => {
  return errors[field]?.[0];
};

/**
 * Check if form has any errors
 */
export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};