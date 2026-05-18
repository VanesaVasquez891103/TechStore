import { Request, Response, NextFunction } from 'express';

export type ValidationType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface ValidationRule {
    field: string;
    type: ValidationType;
    required?: boolean;
}

export function validateBody(rules: ValidationRule[]) {
    return (req: Request, res: Response, next: NextFunction): Response | void => {
        const errors: string[] = [];

        for (const rule of rules) {
            const value = req.body[rule.field];
            const required = rule.required !== false;

            if (value === undefined || value === null) {
                if (required) {
                    errors.push(`El campo '${rule.field}' es obligatorio.`);
                }
                continue;
            }

            const validType = (() => {
                if (rule.type === 'array') return Array.isArray(value);
                if (rule.type === 'object') return typeof value === 'object' && value !== null && !Array.isArray(value);
                return typeof value === rule.type;
            })();

            if (!validType) {
                errors.push(`El campo '${rule.field}' debe ser de tipo ${rule.type}.`);
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        return next();
    };
}
