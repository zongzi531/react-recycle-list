import * as React from 'react';

type ReactNodes = React.ReactNode[] | undefined;

interface ICalcChildsParams {
  children: ReactNodes;
  childrenHeight: (child?: React.ReactNode) => number;
};

export default class CalcChilds {

  public size: number = 0;
  public height: number = 0;

  constructor(public options: ICalcChildsParams) {
    this.setChildSize(options);
  };

  private setChildSize(options: ICalcChildsParams) {
    const { children, childrenHeight } = options;
    if (!children) {
      return;
    };
    for (const child of children) {
      if (Array.isArray(child)) {
        this.setChildSize({
          children: child,
          childrenHeight,
        });
      };
      if (React.isValidElement(child)) {
        this.size++;
        this.height += childrenHeight(child);
      }
    }
  };
};
