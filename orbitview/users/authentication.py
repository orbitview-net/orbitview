from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import AuthenticationFailed

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('access_token')

        print(token)

        if not token:
            return None  # No authentication

        try:
            access_token = AccessToken(token)
            user = access_token.user
        except Exception:
            raise AuthenticationFailed("Invalid or expired token.")

        return (user, None)  # DRF expects (user, auth)
