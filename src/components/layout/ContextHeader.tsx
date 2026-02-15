interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-3 pt-4 pb-3 border-b border-border">
      <h1 className="text-display font-serif text-foreground">{headline}</h1>
      <p className="mt-1 text-body text-muted-foreground">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
