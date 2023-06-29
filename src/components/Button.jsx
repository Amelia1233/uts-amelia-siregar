export default function Button({ variant = "filled", className, ...props }) {
    const buttonClass = `button ${variant && `button-${variant}`} ${className}`;
  
    return (
      <button className={buttonClass} {...props} />
    );
  }
  