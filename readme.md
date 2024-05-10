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

Set the base class in the first argument.  
Set the initial animation and exit animation in the second argument.  
The third argument is the exit wait time.
