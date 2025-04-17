/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsHmrCache: false
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "njtlodolvryjlvekhhil.supabase.co",
            }
        ]
    }
};

export default nextConfig;
