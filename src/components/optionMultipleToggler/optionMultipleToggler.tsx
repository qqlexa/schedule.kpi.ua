import { ListOption } from '../../types/ListOption';
import { TogglerOption, TogglerWrapper } from './optionMultipleToggler.style';

interface Props<T> {
  options: ListOption<T>[];
  onChange: (value: T) => void;
  currentValue: T;
}

const OptionMultipleToggler = <T extends string | number>({ options, onChange, currentValue }: Props<T>) => {
  const optionChangeHandler = (value: T) => () => {
    onChange(value);
  };

  return (
    <TogglerWrapper>
      {options.map(item => (
        <TogglerOption
          key={item.value}
          active={currentValue === item.value}
          onClick={optionChangeHandler(item.value)}
        >
          {item.label}
        </TogglerOption>
      ))}
    </TogglerWrapper>
  );
};

export default OptionMultipleToggler;