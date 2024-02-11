import Image from "next/image";
import Link from "next/link";

const logo = "/logo.png";

interface TDataMenu {
  text: string;
  link: string;
}

const dataHelp: TDataMenu[] = [
  {
    text: "Payment Options",
    link: "/",
  },
  {
    text: "Returns",
    link: "/",
  },
  {
    text: "Privacy Policies",
    link: "/",
  },
];

const dataMenu: TDataMenu[] = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Shop",
    link: "/",
  },
  {
    text: "About",
    link: "/",
  },
  {
    text: "Contact",
    link: "/",
  },
];

export default function Footer() {
  const listMenu = dataMenu.map((item, index) => {
    return (
      <Link href="/" className="tex-base font-medium" key={index}>
        {item.text}
      </Link>
    );
  });
  const listHelp = dataHelp.map((item, index) => {
    return (
      <Link href="/" className="tex-base font-medium" key={index}>
        {item.text}
      </Link>
    );
  });
  return (
    <footer>
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-start gap-8">
          <div className="flex flex-col gap-5">
            <Link href="/" className="w-[100px] pb-4">
              <Image src={logo} width="185" height="0" alt="logo" className="w-full h-auto" />
            </Link>
            <div className="text-base text-light-gray-9f leading-relaxed max-w-[300px]">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </div>
          </div>
          <div className="flex flex-col gap-5 min-w-[170px]">
            <h4 className="text-light-gray-9f text-base font-medium pb-4">
              Links
            </h4>
            {listMenu}
          </div>
          <div className="flex flex-col gap-5 min-w-[170px]">
            <h4 className="text-light-gray-9f text-base font-medium pb-4">
              Help
            </h4>
            {listHelp}
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-light-gray-9f text-base font-medium pb-4">
              Newsletter
            </h4>
            <div className="flex flex-row gap-3">
              <input
                type="email"
                className="pb-1 w-[200px] border-b-[1px] text-sm outline-none border-light-black-0 text-light-black-0"
                placeholder="Enter Your Email Address"
              />
              <button className=" pb-1 border-b-[1px] uppercase text-center outline-none border-light-black-0 text-light-black-0 text-sm">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <hr className="bg-light-gray-b0 h-[1px] mt-10 mb-7 w-full" />
        <div className="text-base">2023 furino. All rights reverved</div>
      </div>
    </footer>
  );
}
