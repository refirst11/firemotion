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

## usePhotograph

Hook to unblur blurred images outside the viewport.  
Please cut the ref into a component so that it works properly.

### sampler

```tsx
type Images = {
  src: string
  alt: string
  width: number
  height: number
}

type ImgListProps = {
  img: Images[]
}

const ImgItem = ({ img }: { img: Images }) => {
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

const ImgList = ({ images }: ImgListProps) => {
  return (
    <div className={styles.img_list}>
      {images.map(img => (
        <ImgItem key={img.id} img={img} />
      ))}
    </div>
  )
}

export default CatList
```

```css
.img_list {
  display: flex;
  flex-wrap: wrap;
  gap: 20;
  justify-content: center;
}

.img_item {
  object-fit: cover;
  filter: blur(30px);
  opacity: 0.7;
  transition: all 0.8s ease-out;
}

.visible {
  filter: blur(0);
  opacity: 1;
}
```
