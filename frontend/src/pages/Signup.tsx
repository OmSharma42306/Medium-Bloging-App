import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
export default function Signup() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <Auth type="signup"></Auth>
      </div>
      <div className="hidden lg:block">
        <Quote></Quote>
      </div>
    </div>
  );
}
