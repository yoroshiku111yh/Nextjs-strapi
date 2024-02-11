import Image from "next/image";
import Link from "next/link";

export type TListCate = {
  img: {
    width: number;
    height: number;
    url: string;
    name: string;
  };
  name: string;
};

export interface TCateShowListComponent {
  headline: string;
  desc: string;
  listCate: TListCate[];
}

export default function CateShowList(props:TCateShowListComponent) {
  const { listCate, headline, desc } = props;
  const listRoomCate = listCate.map((item: TListCate, index: number) => {
    return (
      <div key={index} className="flex-1 min-w-[30%] max-w-[33%]">
        <Link href="/">
          <div className="w-full aspect-[381/480] rounded-2xl overflow-hidden">
            <Image
              width={item.img.width}
              height={item.img.height}
              className="w-full h-auto object-cover"
              src={item.img.url}
              alt={item.img.name}
            />
          </div>
          <h4 className="font-semibold text-2xl text-center text-light-gray-3 pt-4">
            {item.name}
          </h4>
        </Link>
      </div>
    );
  });
  return (
    <section className="relative mt-10">
      <div className="container mx-auto px-4">
        <h3 className="headline-common">{headline}</h3>
        <p className="headline-common-desc">{desc}</p>
        <div className="flex flex-wrap flex-row gap-6 pt-8 pb-9 justify-center">
          {listRoomCate}
        </div>
      </div>
    </section>
  );
}
