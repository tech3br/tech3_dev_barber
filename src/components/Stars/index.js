import React from 'react';
import StarFull from '../../assets/star.svg';
import StarEmpty from '../../assets/star_empty.svg';
import StarHalf from '../../assets/star_half.svg';
import {StarArea, StarView, StarText} from './styles';

export default ({stars, showNumber}) => {
  let s = [0, 0, 0, 0, 0];
  let floor = Math.floor(stars);
  let left = stars - floor;

  for (var i = 0; i < floor; i++) {
    s[i] = 2;
  }
  if (left > 0) {
    s[i] = 1;
  }

  return (
    <StarArea>
      {s.map((item, key) => (
        <StarView key={key}>
          {item === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />}
          {item === 1 && <StarHalf width="18" height="18" fill="#ff9200" />}
          {item === 2 && <StarFull width="18" height="18" fill="#ff9200" />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  );
};
