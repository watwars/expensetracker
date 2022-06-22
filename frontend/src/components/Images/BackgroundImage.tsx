import React from 'react';

interface BackgroundImageProps {
  src: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  backgroundImageStyles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    margin: 0,
    padding: 0,
  },
};

const BackgroundImage = ({ src }: BackgroundImageProps) => {
  return (
    <img
      src={src}
      alt="background-image"
      style={styles.backgroundImageStyles}
    />
  );
};

export default BackgroundImage;
