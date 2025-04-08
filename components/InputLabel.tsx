import { Text, TextProps } from 'react-native';

type InputLabelProps = TextProps;

const InputLabel = ({ label, ...props }: { label: string; props?: InputLabelProps }) => {
  return (
    <Text {...props}>{label}</Text>
  );
};

export default InputLabel;