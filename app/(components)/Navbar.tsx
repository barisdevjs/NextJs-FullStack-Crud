import {
  faDashboard,
  faHome,
  faLock,
  faTicket,
  faUnlock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/Ticket/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
        <Link href="/Ticket">
          <FontAwesomeIcon icon={faDashboard} className="icon" />
        </Link>
        <Link href="/Member">
          <FontAwesomeIcon icon={faLock} className="icon" />
        </Link>
        <Link href="/ClientMember">
          <FontAwesomeIcon icon={faUnlock} className="icon" />
        </Link>
        <Link href="/CreateUser">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Link>
        {session ? (
          <Link href="api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="api/auth/signin">Login</Link>
        )}
      </div>
      <div>
        <p className=" text-default-text">jake.lower17@gmail.com</p>
      </div>
    </nav>
  );
}

export default Navbar;
