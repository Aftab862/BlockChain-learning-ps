
import AuthWrapper from './Auth/AuthWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
