import classnames from 'classnames';
import { HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../utils/type';

type CardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  body?: ReactNode;
  actions?: ReactNode[] | ReactNode;
  dense?: boolean;
  shadow?: boolean;
  border?: boolean;
  divider?: boolean;
} & BaseProps & HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  title,
  subtitle,
  body,
  actions,
  children,
  dense,
  divider,
  shadow,
  border = true,
  ...other
}: CardProps) {
  const cardClass = classnames(
    'r-card',
    {
      'divide-y': divider,
      'r-card-dense': dense,
      'r-card-shadow': shadow,
      'r-card-border': border,
    },
    className,
  );
  if (children) {
    return <div className={cardClass}>{children}</div>;
  }
  return (
    <div className={cardClass} {...other}>
      {title && (
        <div className="r-card-title">
          <div className="title-line">{title}</div>
          <div className="subtitle-line">{subtitle}</div>
        </div>
      )}
      {body && <div className="r-card-body">{body}</div>}
      {actions && <div className="r-card-actions">{actions}</div>}
    </div>
  );
}
