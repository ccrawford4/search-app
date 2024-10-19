import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/((?!api|login|logout|register|_next/static|_next/image|favicon.ico).*)', // Exclude paths that don't need protection
          destination: '/login',
        },
      ],
    };
  },
};

export default MillionLint.next({
  enabled: true,
  production: false,
  rsc: true,
})(nextConfig);