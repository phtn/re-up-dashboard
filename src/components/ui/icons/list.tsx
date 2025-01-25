import type { SVGProps } from "react";

function Apple(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.438 31.401a7 7 0 0 1-1.656-1.536a20 20 0 0 1-1.422-1.938a18.9 18.9 0 0 1-2.375-4.849c-.667-2-.99-3.917-.99-5.792c0-2.094.453-3.922 1.339-5.458a7.7 7.7 0 0 1 2.797-2.906a7.45 7.45 0 0 1 3.786-1.12q.705.002 1.51.198c.385.109.854.281 1.427.495c.729.281 1.13.453 1.266.495c.427.156.786.224 1.068.224c.214 0 .516-.068.859-.172c.193-.068.557-.188 1.078-.411c.516-.188.922-.349 1.245-.469c.495-.146.974-.281 1.401-.349a6.7 6.7 0 0 1 1.531-.063a9 9 0 0 1 2.589.557c1.359.547 2.458 1.401 3.276 2.615a6.4 6.4 0 0 0-.969.734a8.2 8.2 0 0 0-1.641 2.005a6.8 6.8 0 0 0-.859 3.359c.021 1.443.391 2.714 1.12 3.813a7.2 7.2 0 0 0 2.047 2.047c.417.281.776.474 1.12.604c-.161.5-.333.984-.536 1.464a19 19 0 0 1-1.667 3.083c-.578.839-1.031 1.464-1.375 1.88c-.536.635-1.052 1.12-1.573 1.458c-.573.38-1.25.583-1.938.583a4.4 4.4 0 0 1-1.38-.167c-.385-.13-.766-.271-1.141-.432a9 9 0 0 0-1.203-.453a6.3 6.3 0 0 0-3.099-.005c-.417.12-.818.26-1.214.432c-.557.234-.927.391-1.141.458c-.427.125-.87.203-1.318.229c-.693 0-1.339-.198-1.979-.599zm9.14-24.615c-.906.453-1.771.646-2.63.583c-.135-.865 0-1.75.359-2.719a7.3 7.3 0 0 1 1.333-2.24A7.1 7.1 0 0 1 19.812.733q1.319-.68 2.521-.734c.104.906 0 1.797-.333 2.76a8 8 0 0 1-1.333 2.344a6.8 6.8 0 0 1-2.115 1.682z"
      ></path>
    </svg>
  );
}

function ArrowEnter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.75 5.623V9.52a4 4 0 0 1-4 4H3.871m4.236 4.857L4.31 14.58a1.5 1.5 0 0 1-.44-1.061m4.236-4.857L4.31 12.46c-.293.293-.44.677-.44 1.061"
      ></path>
    </svg>
  );
}

function ArrowForward(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.25 18.219c0-2.352 0-3.527.383-4.455a5.06 5.06 0 0 1 2.743-2.743c.928-.383 2.103-.383 4.455-.383h8.298m-4.236-4.857l3.796 3.796c.293.293.44.677.44 1.061m-4.236 4.857l3.796-3.796c.293-.293.44-.677.44-1.061"
      ></path>
    </svg>
  );
}

function Apps(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <rect width="6.5" height="6.5" x="3.75" y="3.75" rx="2"></rect>
        <path d="M15.586 3.818a2 2 0 0 1 2.828 0l1.768 1.768a2 2 0 0 1 0 2.828l-1.768 1.768a2 2 0 0 1-2.828 0l-1.768-1.768a2 2 0 0 1 0-2.828z"></path>
        <rect width="6.5" height="6.5" x="3.75" y="13.75" rx="1.5"></rect>
        <rect width="6.5" height="6.5" x="13.75" y="13.75" rx="2"></rect>
      </g>
    </svg>
  );
}
function ArrowUpDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7 16.25l3.94 3.94c.292.292.676.439 1.06.439m5-4.379l-3.94 3.94a1.5 1.5 0 0 1-1.06.439M7 7.75l3.94-3.94A1.5 1.5 0 0 1 12 3.371m5 4.379l-3.94-3.94A1.5 1.5 0 0 0 12 3.372m0 0V20.63"
      ></path>
    </svg>
  );
}

function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4 12h15.879m-6.129 6.75l5.69-5.69c.292-.292.439-.676.439-1.06M13.75 5.25l5.69 5.69c.292.292.439.676.439 1.06"
      ></path>
    </svg>
  );
}

function Dashbox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 20.25h4.25a4 4 0 0 0 4-4V12M12 20.25H7.75a4 4 0 0 1-4-4V12M12 20.25V3.75m0 0H7.75a4 4 0 0 0-4 4V12M12 3.75h4.25a4 4 0 0 1 4 4V12m-16.5 0h16.5"
      ></path>
    </svg>
  );
}
function Box(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7.687 9.687l2.66 1.426A3.5 3.5 0 0 0 12 11.53M7.687 9.687L3.884 7.65m3.803 2.038l8.496-4.555l.128-.07M3.884 7.648a3.5 3.5 0 0 0-.51 1.82v5.061a3.5 3.5 0 0 0 1.845 3.085l5.127 2.748A3.5 3.5 0 0 0 12 20.78M3.884 7.649a3.5 3.5 0 0 1 1.335-1.264l5.127-2.748a3.5 3.5 0 0 1 3.308 0L16.31 5.06M12 11.53a3.5 3.5 0 0 0 1.654-.416l6.462-3.464M12 11.529v9.25m0 0a3.5 3.5 0 0 0 1.654-.416l5.127-2.748a3.5 3.5 0 0 0 1.846-3.085V9.47a3.5 3.5 0 0 0-.511-1.821m0 0a3.5 3.5 0 0 0-1.335-1.264l-2.47-1.324"
      ></path>
    </svg>
  );
}

function ChevRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m9.75 4.75l6.19 6.19a1.5 1.5 0 0 1 0 2.12l-6.19 6.19"
      ></path>
    </svg>
  );
}
function DollarCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      >
        <path d="M15.099 9.723s-.377-1.783-3.001-1.977m-2.957 7.108s.761 1.8 2.957 1.912m0-10.766v1.746m0 10.754v-1.734m0-9.02a7 7 0 0 0-.476-.017c-1.14 0-2.622.95-2.622 2.275c0 1.326 1.073 1.846 2.965 2.169s3.23 1.035 3.23 2.497s-1.566 2.101-2.881 2.101a4 4 0 0 1-.216-.005"></path>
        <circle cx="12.25" cy="12.25" r="9.25" strokeLinejoin="round"></circle>
      </g>
    </svg>
  );
}

export function ListSquare(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <circle cx="7.877" cy="8.25" r="1" fill="currentColor"></circle>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M11.062 8.25h5.31"
        ></path>
        <circle cx="7.877" cy="12" r="1" fill="currentColor"></circle>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M11.062 12h5.31"
        ></path>
        <circle cx="7.877" cy="15.75" r="1" fill="currentColor"></circle>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M11.062 15.75h5.31"
        ></path>
        <rect
          width="16.5"
          height="16.5"
          x="3.75"
          y="3.75"
          stroke="currentColor"
          strokeWidth="1.5"
          rx="4"
        ></rect>
      </g>
    </svg>
  );
}

function PlusCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="9.25"></circle>
        <path d="M12 8.5v7M8.5 12h7"></path>
      </g>
    </svg>
  );
}

function Settings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.25 3.75a3.5 3.5 0 0 0-3.5 3.5v9.5a3.5 3.5 0 0 0 3.5 3.5h9.5a3.5 3.5 0 0 0 3.5-3.5v-9.5a3.5 3.5 0 0 0-3.5-3.5zM3.75 12h16.5"
      ></path>
    </svg>
  );
}
function Squircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9"
      ></path>
    </svg>
  );
}

function Tesla(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="m16 7.151l3.302-4.036s5.656.12 11.292 2.74c-1.443 2.182-4.307 3.25-4.307 3.25c-.193-1.917-1.536-2.385-5.807-2.385l-4.479 25.281l-4.51-25.286c-4.24 0-5.583.469-5.776 2.385c0 0-2.865-1.057-4.307-3.24C7.043 3.24 12.7 3.12 12.7 3.12l3.302 4.031h-.005zm0-5.198c4.552-.042 9.766.703 15.104 3.036C31.818 3.697 32 3.13 32 3.13C26.167.817 20.703.021 16 0C11.297.021 5.833.813 0 3.13c0 0 .26.703.896 1.865C6.235 2.651 11.448 1.912 16 1.948z"
      ></path>
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 19.128a9.4 9.4 0 0 0 2.625.372a9.3 9.3 0 0 0 4.121-.952q.004-.086.004-.173a4.125 4.125 0 0 0-7.536-2.32M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.3 12.3 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0m8.25 2.25a2.625 2.625 0 1 1-5.25 0a2.625 2.625 0 0 1 5.25 0"
      ></path>
    </svg>
  );
}

export function UsersIcon2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="8.196" r="4.446"></circle>
        <path d="M19.608 20.25a7.608 7.608 0 0 0-15.216 0"></path>
      </g>
    </svg>
  );
}
function XLogomark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
      ></path>
    </svg>
  );
}

export const icons = {
  Apple,
  Apps,
  ArrowUpDown,
  ArrowEnter,
  ArrowForward,
  ArrowRight,
  Box,
  ChevRight,
  DollarCircle,
  Dashbox,
  ListSquare,
  PlusCircle,
  Settings,
  Squircle,
  Tesla,
  UsersIcon,
  UsersIcon2,
  XLogomark,
};
