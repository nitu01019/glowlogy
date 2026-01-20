/**
 * Button Component
 * Reusable button with variants and animations
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg focus:ring-primary',
  secondary: 'bg-secondary text-primary border-2 border-primary/20 hover:bg-primary hover:text-white hover:border-primary',
  outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-primary hover:bg-primary/10',
  white: 'bg-white text-primary hover:bg-gray-50 shadow-md hover:shadow-lg',
};

const sizes = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  to,
  href,
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    transition-all duration-300 ease-smooth
    hover:-translate-y-0.5 active:translate-y-0
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
  `;
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const content = (
    <>
      {loading ? (
        <motion.span
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'small' ? 16 : 20} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'small' ? 16 : 20} />}
        </>
      )}
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
        <Link to={to} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
