import NRsp from "@/common/namespace/NRsp";
import NBook from "./NBook";
import request from "@/utils/request";

namespace SBook {
  export async function getList(): Promise<NRsp<NBook>> {
    return request({
      url: "/book/getBookList",
    });
  }
  export async function addBook(title: string): Promise<NRsp> {
    return request({
      url: "/book/createBook",
      method: "post",
      data: {
        title,
      },
    });
  }
  export async function updateBookContent(data: NBook.IContent): Promise<NRsp> {
    return request({
      url: "/book/updateBookContent",
      method: "post",
      data,
    });
  }
  export async function getBook(
    data: NBook.IBasicQueryParams
  ): Promise<NRsp<NBook>> {
    return request({
      url: "/book/getBook",
      method: "post",
      data,
    });
  }
  export async function creatBookPiece(
    data: NBook.IPieceAddParams
  ): Promise<NRsp<string>> {
    return request({
      url: "/book/creatBookPiece",
      method: "post",
      data,
    });
  }
  export async function getBookPiece(
    data: NBook.IPieceQueryParams
  ): Promise<NRsp<NBook.IPiece>> {
    return request({
      url: "/book/getBookPiece",
      method: "post",
      data,
    });
  }
}
export default SBook;
