export default function SplitPane({
  left,
  right,
  layout = "standard",
}) {
  const layouts = {
    standard: { left: "md:w-1/3", right: "md:w-2/3" },
    reverse: { left: "md:w-2/3", right: "md:w-1/3" },
    equal: { left: "md:w-1/2", right: "md:w-1/2" },
  }

  const classes = layouts[layout] || layouts.standard;

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className={`w-full ${classes.left}`}>
        {left}
      </div>
      <div className={`w-full ${classes.right}`}>
        {right}
      </div>
    </div>
  );
}
