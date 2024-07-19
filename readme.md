# firemotion

## React Animation hooks mini pack

This is for Easy and simple CSS animation.  
A build advanced UI using Hooks.

## useAnimation

A hook for handling page transition animations.

### Parameters

`baseClass`: Base styles  
`[initialClass, exitClass]`: Array of initial and exit animation classes, use `undefined` for unused animations  
`exitDelay`: Time to wait before exit (in seconds)

```tsx
// Both animation
const animate = useAnimation(styles.base, [styles.initial, styles.exit], 0.5)

// Only initial animation
const animateInitial = useAnimation(styles.base, [styles.initial])

// Only exit animation
const animateExit = useAnimation(styles.base, [undefined, styles.exit], 0.5)

return <div className={animate}>...</div>
```

## usePhotograph

A hook that unblurs images as they enter the viewport.
For proper functionality, apply the ref to a component.

### Parameters

visibleClass: CSS class to apply when the image enters the viewport

### Return Value

ref: A ref to be applied to the image element

```tsx
const ImgItem = ({ img }) => {
  const imageRef = usePhotograph(styles.visible)

  return (
    <img
      ref={imageRef}
      className={styles.img_item}
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
    />
  )
}

const ImgList = ({ images }) => (
  <div className={styles.img_list}>
    {images.map(img => (
      <ImgItem key={img.id} img={img} />
    ))}
  </div>
)
```
