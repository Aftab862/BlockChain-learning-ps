
import AuthWrapper from './Auth/AuthWrapper';
import Providers from './Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <Providers >
        <AuthWrapper>{children}</AuthWrapper>
     </Providers >
      </body>
    </html>
  );
}
