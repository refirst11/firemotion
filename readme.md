# firemotion

This is a CSS animation hook for small use on single elements.  
If you want to animate the entire page please use ViewTransition API.

A build advanced Animation using Hooks.  
This hook is used to process page transitions by appropriately merging three CSS classes in order.

### Parameters

1 - First argument(string): Base style  
2 - Second argument(object): options object.

- entry?: string a className of entry animation
- exit?: string a className of exit animation
- delay? number a time to wait until transitioning

```tsx
import { useMotion } from firemotion

function MyComponent() {
  const animate = useMotion("base", {
    entry: "entry",
    exit: "exit",
    delay: 0.2,
  })

  return <div className={animate}>Motion content</div>
}
```

### Animate Sampler

```css
.base {
  filter: blur(0px);
  opacity: 1;
  transition: all 0.2s;
}
.entry {
  filter: blur(4px);
  opacity: 0;
}
.exit: {
  filter: blur(4px);
  opacity: 0;
  transition: all 0.3s;
}
```

## Best Practices

\- Assure your CSS transitions are smooth for the best user experience.  
\- Asynchronous animations have a better visual experience.  
\- Use short motion durations to keep your UI responsive.
