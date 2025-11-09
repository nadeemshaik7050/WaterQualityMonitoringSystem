import { Toaster } from 'react-hot-toast';

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"  // 🔹 stays in top-left
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: '1.1rem',
          padding: '16px 24px',
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
          transform: 'translateX(-20px)', // subtle entrance offset
          transition: 'all 0.4s ease-in-out',
        },
        success: {
          style: {
            background: '#22c55e',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#22c55e',
          },
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
      }}
      containerStyle={{
        top: '1.5rem',
        left: '1.5rem',
      }}
    />
  );
};

export default CustomToaster;
