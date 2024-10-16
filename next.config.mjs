import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default MillionLint.next({
  enabled: true,
  production: false,
  rsc: true
})(nextConfig);
