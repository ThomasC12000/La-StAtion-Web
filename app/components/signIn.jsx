import { signIn } from "../../auth";

export function SignIn() {
  return (
    <button
      className="btn btn-primary btn-user btn-block rounded-5"
      type="button"
      onClick={() => signIn()}
    >
      Se connecter
    </button>
  );
}

export default SignIn;
