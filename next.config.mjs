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

export default nextConfig;