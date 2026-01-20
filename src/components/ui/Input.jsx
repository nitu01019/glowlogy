/**
 * Input Component
 * Reusable form input with validation states
 */

import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

export const Input = forwardRef(({
  label,
  type = 'text',
  error,
  success,
  helperText,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  const inputClasses = `
    w-full px-4 py-3 bg-white border rounded-lg
    transition-all duration-200
    placeholder:text-gray-400
    focus:outline-none
    ${Icon ? 'pl-11' : ''}
    ${type === 'password' ? 'pr-11' : ''}
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
      : success 
        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
    }
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-gray-400'}`}>
            <Icon size={18} />
          </span>
        )}
        
        <motion.input
          ref={ref}
          type={inputType}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        
        {(error || success) && type !== 'password' && (
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-green-500'}`}>
            {error ? <AlertCircle size={18} /> : <Check size={18} />}
          </span>
        )}
      </div>
      
      <AnimatePresence>
        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}
          >
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

export const TextArea = forwardRef(({
  label,
  error,
  helperText,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  const textareaClasses = `
    w-full px-4 py-3 bg-white border rounded-lg resize-none
    transition-all duration-200
    placeholder:text-gray-400
    focus:outline-none
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
      : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
    }
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <motion.textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      
      <AnimatePresence>
        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}
          >
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default Input;
