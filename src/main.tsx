import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import schoolLogo from './assets/springbase-logo.png'

// Ensure favicon and apple-touch-icon point to the school logo
function ensureIcon(rel: string, sizes?: string) {
  const selector = sizes ? `link[rel="${rel}"][sizes="${sizes}"]` : `link[rel="${rel}"]`;
  let link = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = rel as HTMLLinkElement['rel'];
    if (sizes) link.sizes = sizes;
    document.head.appendChild(link);
  }
  link.href = schoolLogo;
}

// Set favicon variants commonly used by browsers
ensureIcon('icon');
ensureIcon('shortcut icon');
ensureIcon('apple-touch-icon', '180x180');

// Optionally enforce document title
if (!document.title || document.title.trim().length === 0) {
  document.title = 'Springbase Schools - Knowledge and Greatness'
}

createRoot(document.getElementById("root")!).render(<App />);
