import React, { useEffect, useState } from 'react';

// import type { BeforeInstallPromptEvent } from '@types/web';

function App() {
  const [installPromptEvent, setInstallPromptEvent] = useState<any | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choice: { outcome: string }) => {
        if (choice.outcome === 'accepted') {
          console.log('PWA installed successfully');
        } else {
          console.log('PWA installation rejected');
        }
        setInstallPromptEvent(null);
      });
    }
  };

  return (
    <div>
      {/* Your app content */}
      {installPromptEvent && <button onClick={handleInstallClick}>Install PWA</button>}
      Hi
    </div>
  );
}

export default App;
