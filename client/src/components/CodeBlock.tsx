interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

export function CodeBlock({ title, code, language = "javascript" }: CodeBlockProps) {
  return (
    <div className="glass-card p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 text-primary">{title}</h3>
      <div className="bg-card border border-primary/30 p-6 rounded-lg font-mono text-sm overflow-x-auto">
        <pre className="text-foreground">
          <code dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      </div>
    </div>
  );
}
