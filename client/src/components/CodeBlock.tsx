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
      const plainText = stripHtml(code);
      let currentIndex = 0;
      let currentHtml = "";
      
      const typewriter = () => {
        if (currentIndex < plainText.length) {
          // Find the next character position in the original HTML
          let htmlIndex = 0;
          let textCount = 0;
          let insideTag = false;
          
          while (htmlIndex < code.length && textCount <= currentIndex) {
            if (code[htmlIndex] === '<') {
              insideTag = true;
            } else if (code[htmlIndex] === '>') {
              insideTag = false;
            } else if (!insideTag) {
              textCount++;
            }
            
            if (textCount <= currentIndex + 1) {
              currentHtml += code[htmlIndex];
            }
            htmlIndex++;
          }
          
          setDisplayedCode(currentHtml);
          currentIndex++;
          
          // Variable typing speed for more realistic effect
          const delay = Math.random() * 30 + 10;
          setTimeout(typewriter, delay);
        } else {
          setIsTyping(false);
        }
      };
      
      // Start typing after a brief delay
      setTimeout(typewriter, 300);
    }
  }, [isInView, code, isTyping]);

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
