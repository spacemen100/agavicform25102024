declare module 'react-circular-progressbar' {
    import * as React from 'react';
  
    export interface CircularProgressbarProps {
      value: number;
      text?: string;
      strokeWidth?: number;
      background?: boolean;
      backgroundPadding?: number;
      classes?: {
        root?: string;
        path?: string;
        trail?: string;
        text?: string;
        background?: string;
      };
      circleRatio?: number;
      styles?: {
        root?: React.CSSProperties;
        path?: React.CSSProperties;
        trail?: React.CSSProperties;
        text?: React.CSSProperties;
        background?: React.CSSProperties;
      };
    }
  
    export const CircularProgressbar: React.FC<CircularProgressbarProps>;
  
    export interface CircularProgressbarWithChildrenProps {
      value: number;
      strokeWidth?: number;
      className?: string;
      counterClockwise?: boolean;
      styles?: {
        root?: React.CSSProperties;
        path?: React.CSSProperties;
        trail?: React.CSSProperties;
        text?: React.CSSProperties;
        background?: React.CSSProperties;
      };
    }
  
    export const CircularProgressbarWithChildren: React.FC<CircularProgressbarWithChildrenProps>;
  
    export function buildStyles(styles: any): any;
  }
  