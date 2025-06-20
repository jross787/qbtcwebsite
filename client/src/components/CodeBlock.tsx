import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

export function CodeBlock({ title, code, language = "javascript" }: CodeBlockProps) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Strip HTML tags for character counting
  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true);
      setDisplayedCode("");
      const plainText = stripHtml(code);
      let currentIndex = 0;
      
      const typewriter = () => {
        if (currentIndex <= plainText.length) {
          // Build HTML progressively by matching visible characters
          let htmlResult = "";
          let textCount = 0;
          let i = 0;
          
          while (i < code.length && textCount < currentIndex) {
            if (code[i] === '<') {
              // Include entire HTML tag
              const tagEnd = code.indexOf('>', i);
              if (tagEnd !== -1) {
                htmlResult += code.substring(i, tagEnd + 1);
                i = tagEnd + 1;
              } else {
                i++;
              }
            } else {
              htmlResult += code[i];
              textCount++;
              i++;
            }
          }
          
          setDisplayedCode(htmlResult);
          
          if (currentIndex >= plainText.length) {
            setIsTyping(false);
            setDisplayedCode(code); // Ensure final state shows complete code
            return;
          }
          
          currentIndex++;
          
          // Variable typing speed for more realistic effect
          const delay = Math.random() * 50 + 20;
          setTimeout(typewriter, delay);
        }
      };
      
      // Start typing after a brief delay
      setTimeout(typewriter, 500);
    }
  }, [isInView, code]);

  return (
    <div ref={ref} className="glass-card p-8 rounded-2xl h-full flex flex-col">
      <motion.h3 
        className="text-2xl font-bold mb-4 text-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h3>
      <motion.div 
        className="bg-card border border-primary/30 p-6 rounded-lg font-mono text-sm overflow-x-auto flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <pre className="text-foreground h-full">
          <code dangerouslySetInnerHTML={{ __html: displayedCode }} />
          {isTyping && <span className="animate-pulse text-primary">|</span>}
        </pre>
      </motion.div>
    </div>
  );
}
