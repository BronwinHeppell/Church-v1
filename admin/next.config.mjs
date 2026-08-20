/** @type {import('next').NextConfig} */
const nextConfig = {
	// Static export, same as the public site, so this can sit on plain hosting
	// at its own subdomain. Everything it does is client side against Firebase.
	output: 'export',
	reactStrictMode: true,
	trailingSlash: true,
	images: { unoptimized: true },
};

export default nextConfig;
