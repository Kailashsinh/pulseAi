export function BackgroundDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl float-slow" />
      <div className="absolute -right-24 top-24 h-[24rem] w-[24rem] rounded-full bg-cyan/20 blur-3xl float-slow [animation-delay:1.5s]" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-mint/20 blur-3xl float-slow [animation-delay:3s]" />
    </div>
  );
}
