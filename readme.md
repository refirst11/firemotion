# firemotion

## React Animation hooks mini pack

This is for Easy and simple CSS animation.  
A build advanced UI using Hooks.

## useAnimation

Animation of screen transition.  
You can set initial and exit (option).

```tsx
const animate = useAnimation(styles.base, [styles.initial, styles.exit], 0.5)
return <div className={animate}>...</div>
```

styles.base is the base styles applied.  
[styles.initial, styles.exit] is an array with the initial animation styles followed by the exit animation styles.  
0.5 is the exit wait time.
