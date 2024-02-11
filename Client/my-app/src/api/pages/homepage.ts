const qs = require('qs');

import { LINK } from "../index";


const queryHeroBanner = qs.stringify(
    {
        fields: ['headline', 'content', 'links'],
        populate: '*',
    },
    {
        encodeValuesOnly: true, // prettify URL
    }
)

export interface THeroBannerData {
    headline : string,
    content : string,
    links : [],
    banner : keyable<any>
}

export interface TheroBannerRepo{
    id : number,
    attributes : THeroBannerData
}

export const LINK_HERO_BANNER = LINK + 'hero-banners/2?' + queryHeroBanner


////////SECTION ROOM CATEGORY



const querySectionRoom = qs.stringify(
    {
        fields: ['headline', 'desc'],
        populate: '*',
    },
    {
        encodeValuesOnly: true, // prettify URL
    }
)

export interface TSectionRoomData {
    headline : string,
    desc : string,
    categories : keyable<any>,
    bannerCate : keyable<any>
}

export interface TSectionRoomRepo {
    id : number,
    attributes : TSectionRoomData
}

export const LINK_SECTION_ROOM = LINK + 'categories-banners/1?' + querySectionRoom

/////////// SECTION PRODUCTS


export const querySectionProducts = ({page = 1, pageSize = 8}) => {
    return qs.stringify(
        {
            fields: ['name', 'desc', 'content', 'cost', 'discount','slug', 'isNew'],
            populate: '*',
            pagination : {
                page : page,
                pageSize : pageSize
            }
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )
}

export interface TSectionProductsData {
    name : string,
    desc : string,
    content : string,
    cost : number,
    discount : number,
    slug : string,
    thumbnail : keyable<any>,
    productImages : keyable<any>,
    categories : keyable<any>
}

export interface TSectionProductsRepo {
    data : keyable<any>[]
}

export const LINK_SECTION_PRODUCTS = LINK + 'products';