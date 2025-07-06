import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),
    {
      id: "spring-boot",
      name: "Twitter (Legacy)",
      type: "oauth",
      version: "1.0A",
      authorization: "https://api.twitter.com/oauth/authenticate",
      accessTokenUrl: "https://api.twitter.com/oauth/access_token",
      requestTokenUrl: "https://api.twitter.com/oauth/request_token",
      profileUrl:
        "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
      profile(profile) {
        return {
          id: profile.id_str,
          name: profile.name,
          email: profile.email,
          image: profile.profile_image_url_https.replace(
            /_normal\.(jpg|png|gif)$/,
            ".$1"
          ),
        };
      },
      style: { logo: "/twitter.svg", bg: "#1da1f2", text: "#fff" },
    },
  ],
  secret: "1AKYcw7g45oKjICwApR6laRwDH7at1bSoJsvgdvMkMU=" as string,
  session: {},
});

export { handler as GET, handler as POST };
