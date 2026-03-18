// import * as React from "react";

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   isLoading?: boolean;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, children, isLoading, disabled, ...props }, ref) => {
//     return (
//       <button
//         className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full disabled:bg-gray-400 ${className}`}
//         ref={ref}
//         disabled={isLoading || disabled}
//         {...props}
//       >
//         {isLoading ? "Please wait..." : children}
        
//       </button>
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button };