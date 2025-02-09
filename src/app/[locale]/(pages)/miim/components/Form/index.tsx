"use client"

import React from 'react';
import { Form, FormItem, Input } from '@/components';

export default function App() {
    const handleSubmit = (values: any) => {
        console.log('Form submitted:', values);
    };
    const [username, setUsername] = React.useState('');



    return (
        <div className="p-6">
            <Form defaultValues={{ username: '' }} onSubmit={handleSubmit}>
                <FormItem name="username" label="Username">
                    <Input name='123' type="text" /> {/* 直接传递控件 */}
                </FormItem>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Submit
                </button>
            </Form>
        </div>
    );
}
