declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initData: string;
          initDataUnsafe: string;
          ready: boolean;
          expand: () => void;
          close: () => void;
        };
      };
    }
  }