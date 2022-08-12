import classNames from 'classnames';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BaseProps } from '../../utils/type';

type DigitalProps = {
    value: number;
    format?: (value: number) => string;
} & BaseProps;
export function Digital({
  className, id, style, value, format = (v) => {
    if (Number.isNaN(v)) return '';
    return v.toFixed();
  },
}: DigitalProps) {
  const motionValue = useSpring(useMotionValue(value));
  useEffect(() => {
    if (Number.isNaN(value)) return;
    motionValue.set(value);
  }, [motionValue, value]);
  const [displayValue, setDisplayValue] = useState(format(value));
  motionValue.onChange((v) => {
    setDisplayValue(format(v));
  });
  return (
    <motion.span id={id} style={style} className={classNames('r-digital', className)}>
      <div>
        {displayValue}
      </div>
    </motion.span>
  );
}
