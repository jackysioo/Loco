import React from 'react';
import { Text } from 'react-native';

export function ParagraphText1(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'montserrat-medium' }]} />
  );
}
export function ParagraphText2(props) {
    return (
      <Text {...props} style={[props.style, { fontFamily: 'montserrat-regular' }]} />
    );
  }

export function HeadingText1(props) {
    return (
      <Text {...props} style={[props.style, { fontFamily: 'montserrat-bold' }]} />
    );
}

export function HeadingText2(props) {
    return (
      <Text {...props} style={[props.style, { fontFamily: 'montserrat-semibold' }]} />
    );
}
