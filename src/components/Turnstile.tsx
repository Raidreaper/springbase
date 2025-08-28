import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: any;
  }
}

type TurnstileProps = {
  sitekey?: string;
  onVerify?: (token: string) => void;
  className?: string;
};

export default function Turnstile({ sitekey = import.meta.env.VITE_TURNSTILE_SITEKEY as string, onVerify, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (!sitekey) return;

    function render() {
      if (!window.turnstile || !containerRef.current) return;
      window.turnstile.render(containerRef.current, {
        sitekey,
        callback: (tk: string) => {
          setToken(tk);
          onVerify?.(tk);
        },
        'error-callback': () => setToken(""),
        'expired-callback': () => setToken(""),
        theme: 'auto'
      });
    }

    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = render;
      document.head.appendChild(script);
      return () => {
        // leave script in place; widget can persist
      };
    } else {
      render();
    }
  }, [sitekey, onVerify]);

  return (
    <div className={className}>
      <div ref={containerRef} />
      <input type="hidden" name="turnstileToken" value={token} />
    </div>
  );
}


