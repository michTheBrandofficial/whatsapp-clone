import { type DataType } from 'csstype';
import { type CSSProperties } from 'nixix';

interface IconOptions {
  stroke?: DataType.NamedColor;
  'stroke:width'?: number;
  size?: number;
  className?: string;
  fill?: DataType.NamedColor;
  style?: CSSProperties;
}

export function UserAvatar(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
    props['stroke:width'] ? props['stroke:width'] : 1
  }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px'fill=${props.fill ? props.fill : 'none'}  >
    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
  </svg>`);
  props.className
    ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
        'class',
        props.className
      )
    : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}


export function ChatIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /> 
  </svg>`);
  props.className
  ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
      'class',
      props.className
    )
  : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}

export function MoreVertIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>`);

  props.className
    ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
        'class',
        props.className
      )
    : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}

export function SearchIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>`);
  props.className
  ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
      'class',
      props.className
    )
  : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}

export function AttachFileIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>`);
  props.className
  ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
      'class',
      props.className
    )
  : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}

export function InsertEmoticonIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>`);
  props.className
  ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
      'class',
      props.className
    )
  : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}

export function MicIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
      <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
      <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
    </svg>`);
  props.className
  ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
      'class',
      props.className
    )
  : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}

export function ChevronRightIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
      <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
    </svg>`);
  props.className
  ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
      'class',
      props.className
    )
  : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}

export function ChevronLeftIcon(props: IconOptions): JSX.Element {
  const fragment = document.createRange().createContextualFragment(/*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width='${
      props['stroke:width'] ? props['stroke:width'] : 1
    }' stroke=${props.stroke ? props.stroke : 'white'} width='${
    props.size
  }px' height='${props.size}px' fill=${props.fill ? props.fill : 'none'}  >
      <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
    </svg>`);
  props.className
  ? (fragment.firstElementChild as SVGSVGElement).setAttribute(
      'class',
      props.className
    )
  : (fragment.firstElementChild as SVGSVGElement).setAttribute('class', 'svgI');
  // @ts-ignore
  return fragment;
}








