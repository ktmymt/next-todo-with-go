import React from "react"
import { GetServerSideProps, NextPage } from "next"
import { signIn, useSession, getSession } from "next-auth/client"
import { css } from "@emotion/css"
import { Colors } from "../styles/colors"

const loginPageStyle = css`
  background-color: ${Colors.mainColor};
  width: 100%;
  height: 100vh;
`

const containerStyle = css`
  width: 300px;
  padding: 80px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #191919;
  text-align: center;
  color: white;
  text-transform: uppercase;
  font-weight: 500;

  button {
    cursor: pointer;
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 18px 10px;
    width: 200px;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
  }

  button:hover {
    background: ${Colors.red};
  }
`

const Login: NextPage = () => {
  const [session, loading] = useSession()

  return (
    <div css={loginPageStyle}>
      {loading && <p>Loading..</p>}
      {!session && (
        <div css={containerStyle}>
          <h1>Login</h1>
          <button onClick={() => signIn("google", { callbackUrl: process.env.CALLBACK_URL })}>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
  return {
    props: {
      session: session,
    },
  }
}

export default Login
