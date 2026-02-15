interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-3">
      <h1 className="text-display font-serif text-foreground">{title}</h1>
      <p className="text-body text-muted-foreground mt-2">
        This section will be built in the next step.
      </p>
    </div>
  );
};

export default PlaceholderPage;
