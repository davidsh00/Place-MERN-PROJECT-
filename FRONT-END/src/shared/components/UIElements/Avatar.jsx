import styles from "./Avatar.module.css"
const Avatar = ({ image, alt, className }) => {
  return (
    <img
      src={image}
      className={`${styles.avatar} ${className}`}
      alt={alt ? alt : "avatar"}
    />
  );
};
export default Avatar;
