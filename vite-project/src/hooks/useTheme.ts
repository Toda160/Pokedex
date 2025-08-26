import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = isDark ? "/src/styles/dark.css" : "/src/styles/light.css";

    const oldLink = document.querySelector('link[href*="styles/"]');
    if (oldLink) {
      oldLink.remove();
    }

    document.head.appendChild(link);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
}
