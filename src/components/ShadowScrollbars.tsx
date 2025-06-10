import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface ShadowScrollbarsProps {
  style?: CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

interface ScrollValues {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

const ShadowScrollbars: React.FC<ShadowScrollbarsProps> = ({ 
  style, 
  children, 
  className,
  ...props 
}) => {
  const shadowTopRef = useRef<HTMLDivElement>(null);
  const shadowBottomRef = useRef<HTMLDivElement>(null);

  const handleUpdate = (values: ScrollValues) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    
    if (shadowTopRef.current) {
      shadowTopRef.current.style.opacity = shadowTopOpacity.toString();
    }
    
    if (shadowBottomRef.current) {
      shadowBottomRef.current.style.opacity = shadowBottomOpacity.toString();
    }
  };

  const containerStyle: CSSProperties = {
    position: 'relative',
    height: '100%',
    width: '100%',
    ...style,
  };

  const shadowTopStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%)', // Changed from 0.1 to 0.05
    pointerEvents: 'none',
    opacity: 0,
    zIndex: 1
  };
  
  const shadowBottomStyle: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%)', // Changed from 0.1 to 0.05
    pointerEvents: 'none',
    opacity: 0,
    zIndex: 1
  };

  return (
    <div style={containerStyle} className={className}>
      <Scrollbars 
        onUpdate={handleUpdate} 
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgb(235, 235, 235)',
              borderRadius: '4px',
              width: '8px',
              cursor: 'pointer'
            }}
          />
        )}
        {...props}
      >
        {children}
      </Scrollbars>
      <div ref={shadowTopRef} style={shadowTopStyle} />
      <div ref={shadowBottomRef} style={shadowBottomStyle} />
    </div>
  );
};

export default ShadowScrollbars;