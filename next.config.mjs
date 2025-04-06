/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        // port: '', // Opcional
        // pathname: '/**', // Opcional, puedes ser más específico
      },
      // Add pattern for images.unsplash.com
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add pattern for ui-avatars.com
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      // Puedes añadir más patrones aquí si usas otras fuentes de imágenes
    ],
  },
};

export default nextConfig;
