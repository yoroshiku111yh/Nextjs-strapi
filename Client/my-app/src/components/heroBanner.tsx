import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

type TBanner = {
    url : string,
    name : string,
    width : number,
    height : number
}

interface TItemLink {
    text: string;
    url: string;
}

export interface THeroBannerDataComponent {
    banner : TBanner,
    content : string,
    headline : string,
    listBtn : TItemLink[]
}

export default function HeroBanner  (props: THeroBannerDataComponent){
    const {banner, content, headline, listBtn} = props;
    const urlHeroBanner = banner.url;
    const listBtnComponent = listBtn.map((item: TItemLink, index: number) => {
      return (
        <Link href={item.url} key={index} className="min-w-[222px] btn">
          {item.text}
        </Link>
      );
    });
    return (
      <div className="relative">
        <Image
          width={banner.width}
          height={banner.height}
          className="w-full h-auto"
          src={banner.url}
          alt={banner.name}
        />
        <div className="absolute m-auto w-[643px] aspect-[643/443] top-[999px] bottom-[999px] right-[80px] bg-light-yellow-ff px-10 py-6">
          <h4 className="text-light-yellow-b8 text-[52px] font-bold">
            {headline}
          </h4>
          <div className="pt-5 font-medium text-lg leading-snug">
            <Markdown>{content}</Markdown>
          </div>
          <div className="pt-5 flex flex-wrap gap-3">{listBtnComponent}</div>
        </div>
      </div>
    );
  };
  