// src/components/FormItem.tsx
import React, { ReactElement } from 'react';

interface FormItemProps {
    name: string;
    label: string;
    children: ReactElement;
}

export function FormItem({ name, label, children }: FormItemProps) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}
