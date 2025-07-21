
import React, { forwardRef } from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ children, ...props }, ref) => {
  return (
    <select
      {...props}
      ref={ref}
      className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
export default Select;
