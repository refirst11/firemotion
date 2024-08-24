# firemotion

## React Hooks for CSS Motion

This is for Easy and simple CSS motion.  
A build advanced UI using Hooks.

## useFiremotion

This hook is used to process page transitions by appropriately merging three CSS classes in order.

### Parameters

First argument(string): Base css style  
Second argument(Array<string\>): If you want to use exit only, set entry to undefined.  
Third argument(number): Time to wait before exit (in seconds)

```tsx
import useFiremotion from 'firemotion'

function MyComponent() {
  const animate = useFiremotion(styles.base, [styles.entry, styles.exit], 0.3)

  return <div className={animate}>Motion content</div>
}
```

### Example css

```css
.base {
  opacity: 1;
  transition: all 0.3s;
}
.entry {
  opacity: 0;
  transform: translateY(20px);
}
.exit {
  opacity: 0;
  transition: all 0.3s;
  transform: translateY(-20px);
}
```

## Best Practices

\- Assure your CSS transitions are smooth for the best user experience.  
\- Use short motion durations to keep your UI responsive.  
\- Test your motions on various devices to ensure performance.
