import { FC, useEffect } from "react"
import { signIn, useSession } from "next-auth/client"
import { useRouter } from "next/router"
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

const Login: FC = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.replace("/")
    }
  })

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

export default Login
