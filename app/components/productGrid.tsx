import React from 'react';

export default function ProductGrid({ children }) {
    return (
        <div className="grid md:grid-cols-3 gap-4">
            {children}
        </div>
    );
}

