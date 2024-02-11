import useSWR from "swr";
import { LINK_PAGE_API, TOKEN_READ } from "../api";
import fetcher from "../api/fetch";
import {
  LINK_HERO_BANNER,
  LINK_SECTION_PRODUCTS,
  LINK_SECTION_ROOM,
  THeroBannerData,
  TSectionProductsRepo,
  TSectionRoomData,
  TSectionRoomRepo,
  TheroBannerRepo,
  querySectionProducts,
} from "@/api/pages/homepage";
import Markdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardProduct, { TPropsCardProduct } from "@/components/CardProduct";
import HeroBanner, { THeroBannerDataComponent } from "@/components/heroBanner";
import CateShowList, {
  TCateShowListComponent,
  TListCate,
} from "@/components/CateShowList";

interface TProps {
  banner: THeroBannerData;
  sectionRoom: TSectionRoomData;
}

export default function Index(props: TProps) {
  const { banner, sectionRoom } = props;
  /////////
  const dataBanner: THeroBannerDataComponent = {
    banner: {
      url: LINK_PAGE_API + banner.banner?.data?.attributes.url,
      width: banner.banner?.data?.attributes.width,
      height: banner.banner?.data?.attributes.height,
      name: banner.banner?.data?.attributes.name,
    },
    headline: banner.headline,
    content: banner.content,
    listBtn: banner.links,
  };
  /////////
  const dataRoom: TCateShowListComponent = {
    headline: sectionRoom.headline,
    desc: sectionRoom.desc,
    listCate: [],
  };

  dataRoom.listCate = sectionRoom.categories.data.map(
    (item: keyable<any>, index: number): TListCate => {
      const thumb = sectionRoom.bannerCate.data[index];
      return {
        img: {
          url: LINK_PAGE_API + thumb?.attributes.url,
          width: thumb?.attributes.width,
          height: thumb?.attributes.height,
          name: thumb?.attributes.name,
        },
        name: item.attributes.name,
      };
    }
  );
  return (
    <>
      <HeroBanner {...dataBanner} />
      <CateShowList {...dataRoom} />
      <SectionProducts />
    </>
  );
}

const SectionProducts = () => {
  const [page, setPage] = useState<number>(1);
  const [dataProducts, setDataProducts] = useState<TPropsCardProduct[]>([]);
  const link =
    LINK_SECTION_PRODUCTS +
    "?" +
    querySectionProducts({ page: page, pageSize: 8 });
  const { data, error, isLoading } = useSWR(
    [link, TOKEN_READ],
    ([url, token]) => {
      return fetcher<TSectionProductsRepo[]>({
        url: url,
        token: token,
        throwError: true,
      });
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  useEffect(() => {
    if (error) {
      return;
    }
    if (!data?.isError) {
      const listData = data?.result.map(
        (item: keyable<any>, index: number): TPropsCardProduct => {
          const dataItem = item.attributes;
          return {
            name: dataItem.name,
            thumb: {
              name: dataItem.thumbnail.data.attributes.name,
              width: dataItem.thumbnail.data.attributes.width,
              height: dataItem.thumbnail.data.attributes.height,
              url: LINK_PAGE_API + dataItem.thumbnail.data.attributes.url,
            },
            desc: dataItem.desc,
            cost: dataItem.cost,
            discount: dataItem.discount || null,
            isNew: dataItem.isNew,
            slug: dataItem.slug,
            id: item.id,
          };
        }
      );
      setDataProducts((prevData: TPropsCardProduct[]) => [
        ...prevData,
        ...(listData || []),
      ]);
    }
  }, [data]);
  if (error) {
    console.error(error);
    return <></>;
  }
  const listCardProduct = dataProducts?.map(
    (item: TPropsCardProduct, index: number) => {
      return <CardProduct {...item} key={"_product" + item.id} />;
    }
  );
  return (
    <section>
      <div className="container mx-auto px-4 py-10">
        <h3 className="headline-common pb-10">Our products</h3>
        <div className="grid grid-cols-4 gap-7">{listCardProduct}</div>
        <div className="text-center pt-8">
          {!data?.isError && data?.meta.pagination.pageCount > 1 && (
            <button
              className="btn-border min-w-[245px]"
              disabled={
                !data?.isError && page >= data?.meta.pagination.pageCount
              }
              onClick={() =>
                !data?.isError &&
                page < data?.meta.pagination.pageCount &&
                setPage(page + 1)
              }
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export async function getStaticProps() {
  const resBanner = await fetcher<TheroBannerRepo>({
    url: LINK_HERO_BANNER,
    token: TOKEN_READ,
    throwError: false,
  });
  let dataBanner = null;
  if (resBanner.isError) {
    console.error(resBanner.err);
  }
  if (!resBanner.isError) {
    dataBanner = resBanner.result.attributes;
  }
  const resSecRoom = await fetcher<TSectionRoomRepo>({
    url: LINK_SECTION_ROOM,
    token: TOKEN_READ,
    throwError: false,
  });
  let dataSecRoom = null;
  if (resSecRoom.isError) {
    console.error(resSecRoom.err);
  }
  if (!resSecRoom.isError) {
    dataSecRoom = resSecRoom.result.attributes;
  }
  return {
    props: {
      banner: dataBanner,
      sectionRoom: dataSecRoom,
    },
    revalidate: 60, // seconds
  };
}
