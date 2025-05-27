import classNames from 'classnames';
import { useRef, forwardRef } from 'react';
import { toast } from 'react-hot-toast';

const Preview = forwardRef(function Preview({ html, isResizing, isLoading }, ref) {
  const iframeRef = useRef(null);
  console.log('Preview html: ', html);
  return (
    <>
      {Array.isArray(html) && html.length > 0 && (
        <div
          ref={ref}
          className="bg-white h-[calc(100dvh-49px)] lg:h-[calc(100dvh-53px)] relative overflow-y-auto"
          onClick={(e) => {
            if (isLoading) {
              e.preventDefault();
              e.stopPropagation();
              toast.warn('Please wait for the AI to finish working.');
            }
          }}
        >
          {html.map((htmlString, index) => (
          <iframe
            ref={iframeRef}
            key={index}
            title={`output-${index}`}
            className={classNames('w-full h-[600px] select-none mb-4', {
              'pointer-events-none': isResizing || isLoading,
            })}
            srcDoc={htmlString}
          />
          ))}
        </div>
      )} 
    </>
  );
});

export default Preview;
